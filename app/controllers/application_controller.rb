class ApplicationController < ActionController::Base
  protect_from_forgery

  expose(:lookup_page) { Page.find_by_slug params[:slug] }
  expose(:page)

  def show
    render html: lookup_page.source
  end

  def save
    page.save
  end
end
