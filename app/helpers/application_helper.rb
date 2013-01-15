module ApplicationHelper

  def default_image(name)
    (%w{<img src=""
      alt="" class="super_edit"
      super_name="} +
    [ name, '" />']).join
  end

  def cms_img(name)
    page.source[name] || default_image(name)
  end

  def cms_box(name)
    page.source[name] || 'Lorem Ipsum'
  end

  def cms_loop(name, &blk)
    array = page.source[name]
    array ||= ['Lorem One', 'Lorem Two']
    array.map{ |x| yield x }.join
  end

  def editable(only_class=false)
    only_class &&= ' class="super_edit" '
    only_class ||= ' super_edit '
  end

  def node_name(name)
    " super_name=\"#{name}\""
  end

end
