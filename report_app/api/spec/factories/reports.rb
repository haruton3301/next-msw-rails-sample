FactoryBot.define do
  factory :report do
    reported_at { Faker::Date.backward(days: 30) }
    content { Faker::Lorem.paragraph }
    association :user
  end
end
