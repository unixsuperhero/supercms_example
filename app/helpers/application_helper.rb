module ApplicationHelper

  def cms_img(name, from=page_hash)
    out = from.present?
    out &&= from[name]
    raw out ||= yield if block_given?
  end

  def cms_box(name, from=page_hash)
    out = from.present?
    out &&= from[name]
    out ||= yield if block_given?
    raw out ||= 'Lorem Ipsum'
  end

  def cms_loop(name, from=page_hash, &blk)
    array = from.present?
    array &&= from[name]
    array ||= [{},{}]
    raw array &&= array.map{ |i,h| yield h }.join
  end

  def html_classes(classes=[])
    raw 'class="' + [classes].flatten.compact.join(' ') + '"'
  end

  def edit_loop(name, classes=[])
    kls = ['superitem', classes]
    raw [super_name(name), html_classes(kls)].join(' ')
  end

  def editable(name, classes=[])
    kls = ['super_edit', classes]
    raw [super_name(name), html_classes(kls)].join(' ')
  end

  def super_name(name)
    raw "super_name=\"#{name}\""
  end

end
