require 'rails_helper'

RSpec.describe Report, type: :model do
  describe "validations" do
    let(:date) { Date.today }
    let(:content) { "Sample content" }
    let(:attributes) { { date: date, content: content } }
    subject { build(:report, attributes) }

    context "when valid attributes are provided" do
      it "is valid" do
        expect(subject).to be_valid
      end
    end

    context "when required attributes are missing" do
      context "when date is missing" do
        let(:date) { nil }

        it "is invalid" do
          expect(subject).not_to be_valid
          expect(subject.errors[:date]).to include("can't be blank")
        end
      end

      context "when content is missing" do
        let(:content) { nil }

        it "is invalid" do
          expect(subject).not_to be_valid
          expect(subject.errors[:content]).to include("can't be blank")
        end
      end
    end

    context "when date is not unique" do
      before { create(:report, date: date) }

      it "is invalid with a duplicate date" do
        expect(subject).not_to be_valid
        expect(subject.errors[:date]).to include("has already been taken")
      end
    end
  end
end
