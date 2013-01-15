module ApplicationHelper

  def cms_box(name)
    page.get_element(name)
  end

  def cms_loop(name, &blk)
    (name || []).map{ |x|
      yield x
    }.join
  end

end
