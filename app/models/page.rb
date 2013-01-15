class Page < ActiveRecord::Base
  attr_accessible :slug, :title, :source

  serialize :source, HashWithIndifferentAccess
end
