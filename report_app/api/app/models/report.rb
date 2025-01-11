class Report < ApplicationRecord
  belongs_to :user

  validates :reported_at, presence: true
  validates :content, presence: true
end
