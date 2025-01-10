FactoryBot.define do
  factory :report do
    sequence(:date) { |n| Date.today + n.days }
    sequence(:content) { |n| "Sample report content ##{n}" }
  end
end
