class Report < ApplicationRecord
  validates :date, presence: true, uniqueness: true
  validates :content, presence: true
end
