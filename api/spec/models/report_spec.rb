require 'rails_helper'

RSpec.describe Report, type: :model do
  let(:user) { create(:user) }
  let(:report) { build(:report, user: user) }

  subject { report }

  describe "validations" do
    context "when report is valid" do
      it { is_expected.to be_valid }
    end

    context "when the user is missing" do
      before { report.user = nil }
      it { is_expected.to be_invalid }
    end

    context "when the reported_at is missing" do
      before { report.reported_at = nil }
      it { is_expected.to be_invalid }
    end

    context "when the content is missing" do
      before { report.content = nil }
      it { is_expected.to be_invalid }
    end
  end

  describe "associations" do
    it { is_expected.to belong_to(:user) }
  end
end
