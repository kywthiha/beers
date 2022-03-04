class Wine < ApplicationRecord
  validates_presence_of :brand

  has_one_attached :image
end
