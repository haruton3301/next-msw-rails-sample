FactoryBot.define do
  factory :user do |n|
    sequence(:name) { |n| "user#{n}" }
    sequence(:email) { |n| "user#{n}@example.com" }
    password { "password" }
  end
end
