require 'rails_helper'

RSpec.describe User, type: :model do
  it "destroys associated reports when the user is destroyed" do
    user = create(:user)
    create(:report, user: user)

    expect { user.destroy }.to change(Report, :count).by(-1)
  end
end
