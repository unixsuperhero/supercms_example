class Page < ActiveRecord::Base
  attr_accessible :slug, :source, :title
end
