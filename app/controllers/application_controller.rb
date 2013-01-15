class ApplicationController < ActionController::Base
  protect_from_forgery

  expose(:lookup_page) { Page.find_by_slug params[:slug] }
  expose(:page)
  expose(:page_hash) { lookup_page.source if lookup_page.present? }

  expose(:arr) { [1,2,3,4] }

  layout false

  def test
    render and return
  end

  def show
    render :index
  end

  def save
    render text: page.save
  end
end
