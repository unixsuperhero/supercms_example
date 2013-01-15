class ApplicationController < ActionController::Base
  protect_from_forgery

  expose(:lookup_page) { Page.find_by_slug params[:slug] }
  expose(:page)

  expose(:arr) { [1,2,3,4] }

  layout false

  def variable_test
    render and return
    erb = ERB.new <<-EOF
    <% x = 11 %>
    <% the_proc = ->() do %>
      Hello world: <%= x %>
      <%= 'End of a' %>
    <% end %>

    the_proc = &quot;<%= the_proc.source_location %>&quot;
    EOF
    render text: '<pre>' + erb.src + '</pre>'
    return
  end

  def show
    render text: lookup_page.source, layout: false
  end

  def save
    render text: page.save
  end
end
