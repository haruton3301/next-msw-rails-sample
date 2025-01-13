require 'rails_helper'

RSpec.describe "V1::Reports", type: :request do
  let(:attributes) { { reported_at: Date.today, content: "Sample content" } }
  let(:user) { create(:user) }
  let(:existing_report) { create(:report, user: user) }
  let(:auth_headers) { user.create_new_auth_token }
  let(:non_existing_report_id) { 99999 }

  describe "GET /index" do
    subject { get v1_reports_path, headers: auth_headers }

    it "return all reports" do
      create_list(:report, 3, user: user)
      subject

      expect(response).to have_http_status(:success)
      expect(json.size).to eq(3)
    end
  end

  describe "GET /show" do
    subject { get v1_report_path(report_id), headers: auth_headers }

    let(:report_id) { existing_report.id }

    context "when the report exists" do
      it "returns the correct report with status 200 (OK)" do
        subject
        expect(response).to have_http_status(:success)
        expect(json['id']).to eq(existing_report.id)
      end
    end

    context "when the report does not exist" do
      let(:report_id) { non_existing_report_id }

      it "returns a 404 status code" do
        subject
        expect(response).to have_http_status(:not_found)
      end
    end
  end

  describe "POST /create" do
    subject { post v1_reports_path, params: attributes, headers: auth_headers }

    context "when parameters are valid" do
      it "creates a new report" do
        expect { subject }.to change(Report, :count).by(1)
        expect(Report.last).to have_attributes(attributes)
        expect(Report.last.user).to eq(user)
        expect(response).to have_http_status(:created)
        expect(json['id']).to eq(Report.last.id)
      end
    end

    context "when parameters are invalid" do
      context "when required fields are missing" do
        let (:attributes) { { reported_at: '', content: '' } }

        it "does not create a new report and returns an unprocessable_entity status" do
          expect { subject }.not_to change(Report, :count)
          expect(response).to have_http_status(:unprocessable_entity)
        end
      end
    end
  end

  describe "PATCH /update" do
    subject { patch v1_report_path(report_id), params: attributes, headers: auth_headers }

    let(:report_id) { existing_report.id }

    context "when parameters are valid" do
      let(:attributes) { { reported_at: Date.new(2025, 1, 10), content: 'Update content' } }

      it "updates the existing report" do
        subject
        expect(existing_report.reload).to have_attributes(attributes)
        expect(response).to have_http_status(:success)
      end
    end

    context "when parameters are invalid" do
      context "when required fields are missing" do
        let(:attributes) { { reported_at: '', content: '' } }

        it "does not update the report and returns an unprocessable entity status" do
          subject
          expect(existing_report.reload).not_to have_attributes(attributes)
          expect(response).to have_http_status(:unprocessable_entity)
        end
      end
    end

    context "when the report does not exist" do
      let(:report_id) { non_existing_report_id }

      it "returns a 404 status code" do
        subject
        expect(response).to have_http_status(:not_found)
      end
    end
  end

  describe "DELETE /destroy" do
    before { existing_report }
    subject { delete v1_report_path(existing_report), headers: auth_headers }

    it "destroys the requested report" do
      expect { subject }.to change(Report, :count).by(-1)
      expect(response).to have_http_status(:no_content)
    end
  end
end
