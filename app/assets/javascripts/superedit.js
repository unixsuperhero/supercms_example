SUPER_ELEMENT = null
SUPER_ITEM_ELEMENT = null
SUPER_IMAGE_TIMER = null
super_old_border = null
var fetch = true
$(document).ready( function(){
  USE_SUPER_POWERS = function() {
    $('a').click(function(){return false;});

    $('.superimg').click(function(ev){
      SUPER_ELEMENT = this
      if($('#super_settings:hidden')) $('#super_settings').show();
      $('#super_image_source').focus();
      return false;
    });

    $('.superedit').attr('contentEditable', 'true');
    $('.superedit').click(function(ev){
      SUPER_ELEMENT = this
    });

    update_image_preview_timer = function() {
      if(super_image_source = $('#super_image_source').val()) {
        $('#super_image_preview').show();
        $('#super_image_preview').attr('src', super_image_source);
      } else {
        $('#super_image_preview').hide();
      }
    }

    if(fetch == true) {
      $.get('/editor/super_editor').complete(function(x,d,other) {
        $('body').prepend(x.responseText);
      });

      $.get('/editor/image_modal').complete(function(x,d,other) {
        append_return_value = $('body').append(x.responseText);
        $('#super_image_source').keyup(function(ev) {
          if(SUPER_IMAGE_TIMER != null) {
            clearTimeout(SUPER_IMAGE_TIMER)
            SUPER_IMAGE_TIMER = null;
          }
          SUPER_IMAGE_TIMER = setTimeout(update_image_preview_timer, 500);
        });
      });
      fetch = false
    }

    //settings_container = '<div id="super_settings">&nbsp;</div>';
    //append_return_value = $('body').append(settings_container);

    setTimeout(function(){
      collection_add_event = function(){
        console.log('CLICK: add btn');
        SUPER_ITEM_ELEMENT.clone(true,true).insertAfter(SUPER_ITEM_ELEMENT);
      };
      collection_remove_event = function(){
        console.log('clicked the remove button');
        SUPER_ITEM_ELEMENT.remove();
      };

      $('.superitem').on('focusin', function (){
        $(this).css({border: 'dotted 2px lightblue'});
      });

      $('.superitem').on('focusout', function (ev){
        $(this).css({border: 'none'});
      });

      $('#super_collection_add_button').on('click', collection_add_event);
      $('#super_collection_remove_button').on('click', collection_remove_event);

    }, 1000);

    $('.superitem').click(function(){ //$('.superitem').click(function(){
      /************************************************************
       * SHOW COLLECTION EDIT OPTIONS IN BOX AT THE TOP
       * ----------------------------------------------
       * The buttons that say:
       *   "Add New Item" or "Remove This Item"
       ************************************************************/
      SUPER_ITEM_ELEMENT = SUPER_ITEM_ELEMENT || $(this);
      SUPER_ITEM_ELEMENT = $(this);
      //super_old_border = super_old_border || $(this).css('border');

      //SUPER_ITEM_ELEMENT.css({border: super_old_border});
      //super_old_border = $(this).css('border');
      //SUPER_ITEM_ELEMENT.css({border: 'dotted 2px lightblue'});
      console.log('superitem clicked');
      console.log('SUPER_ITEM_ELEMENT', SUPER_ITEM_ELEMENT);
      //$('#super_collection_buttons button').removeAttr('disabled')

      //disable_button_event = function() {
      //  $('html').one('click',function(ev) {
      //    console.log(ev);
      //    skip = $(ev.target).hasClass('superitem');
      //    skip = skip || $(ev.target).parents('.superitem').length > 0;
      //    if(skip) {
      //      console.log('skipping: keep buttons enabled');
      //      console.log(SUPER_ITEM_ELEMENT);
      //      return true;
      //    }
      //    $('#super_collection_buttons button').attr('disabled', 'disabled');
      //  })
      //};
      //setTimeout(disable_button_event, 500);

  /************************************************************************************************
    before adding the event...
    loop through all of the events on the element...
    if any of them match this function...
    abort
   ************************************************************************************************/
      //$('#super_collection_add_button').on('click', collection_add_event);

      //$('#super_collection_remove_button').on('click', collection_remove_event);
    });

    /*
    $('.superitem').blur(function(){ //$('.superitem').click(function(){
      $('.super_collection_buttons button').disable();
    });
    */
  };

  // MAYBE $(.superitem) should be in _POWERS ^
  // because it is a part of the init super setup
  // then, we should have a function for saving?
  // that differentiates between partials and
  // standalone items.
  // or, serverside, we can inject a list of
  // all the super-type attributes we accept
  // for this particular template

    /******************************************************************
     * MIGHT NOT NEED THIS $('.supergroup') GROUPING
     *   .superitem can have an attr that says:
     *   item_type (basically, partial name)
     *   so classes would work as usual (.super{edit,img})
     *   but the ones that match: ".superitem .super{edit,img}"
     *   will be grouped into an array, with a key of the
     *   specified type
     ******************************************************************/

  USE_SUPER_POWERS();
});

/***********************
 ***********************
 ** SAVE DYNAMIC DATA **
 ***********************
 ***********************/

post_data = {};
setup_post_data = function(i,e){
  st = $(e).attr('super-type')
  post_data[st] = post_data[st] || $([])
};
$('.superitem[super-type]').each(setup_post_data);


/**** new save ****/

/*
 * loop thru superitems
 * add them and their children to post_data
 *   flag the superedit and imgs to skip later
 *
 * then loop thru independent elements,
 *   skipping the ones flagged
 */

SAVE_EVERYTHING = function() {
flag_element = function(e) {
  $(e).attr('skip-save', true);
}
var post_data = {};
$('.superitem').each(function(i,e) {
  var super_type = $(e).attr('super-type');
  post_data[super_type] = post_data[super_type] || []

  flag_element(e);
  if($(e).hasClass('superimg')) {
    post_data[super_type].push({super_type: $(e).attr('src')});
  } else if($(e).hasClass('superedit')) {
    post_data[super_type].push({super_type: $(e).html()});
  } else if($(e).find('.superedit,.superimg').length > 0) {
    temp_elem = {};
    $(e).find('.superedit,.superimg').each(function(ii,ee) {
      flag_element(ee);
      temp_type = $(ee).attr('super-type')
      if($(ee).hasClass('superimg'))
        temp_elem[temp_type] = $(ee).attr('src');
      else
        temp_elem[temp_type] = $(ee).html();
    });
    post_data[super_type].push(temp_elem)
  }
  console.log(super_type, post_data[super_type]);
});

$('.superedit, .superimg').each(function(i,e) {
  if($(e).attr('skip-save') || false) return;
  super_type = $(e).attr('super-type');
  if( $(e).hasClass('superimg') )
    post_data[super_type] = $(e).attr('src');
  else
    post_data[super_type] = $(e).html();
});
$('[skip-save]').removeAttr('skip-save');
console.log(post_data);
$.post('/', post_data);
return post_data;
};

SAVE_EVERYTHING = function() {
  page = $('html').clone(true);
  page = $(page).find('#super_editor_settings').remove();
  page = $(page).find('#super_settings').remove();
  $.post('/save', {
    page: {
      source: ['<!DOCTYPE html><html>',$('html').html(),'</html>'].join(''),
      title: $('#supertitle').val(),
      slug: $('#superslug').val()
    }
  });
};

setTimeout(function() {
  $('#super_save').click(SAVE_EVERYTHING);
}, 1000);

