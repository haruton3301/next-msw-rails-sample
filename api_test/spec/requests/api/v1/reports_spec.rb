require 'rails_helper'

RSpec.describe "Api::V1::Reports", type: :request do
  let(:attributes) { { date: Date.today, content: "Sample content" } }
  let(:existing_report) { create(:report) }
  let(:non_exsiting_report_id) { 99999 }

  describe "GET /index" do
    subject { get api_v1_reports_path }

    it "returns all reports" do
      create_list(:report, 3)
      subject

      expect(response).to have_http_status(:success)
      expect(json.size).to eq(3)
    end
  end

  describe "GET /show" do
    let(:report_id) { existing_report.id }
    subject { get api_v1_report_path(report_id) }

    context "when the report exists" do
      it "returns the correct report with status 200 (OK)" do
        subject
        expect(response).to have_http_status(:success)
        expect(json['id']).to eq(existing_report.id)
      end
    end

    context "when the report does not exist" do
      let(:report_id) { non_exsiting_report_id }

      it "returns a 404 status code" do
        subject
        expect(response).to have_http_status(:not_found)
      end
    end
  end

  describe "POST /create" do
    subject { post api_v1_reports_path, params: { report: attributes } }

    context "when parameters are valid" do
      it "creates a new report" do
        expect { subject }.to change(Report, :count).by(1)
        expect(Report.last).to have_attributes(date: attributes[:date], content: attributes[:content])
        expect(response).to have_http_status(:created)
        expect(json['id']).to eq(Report.last.id)
      end
    end

    context "when parameters are invalid" do
      context "when required fields are missing" do
        let(:attributes) { { date: '', content: '' } }

        it "does not create a new report and returns an unprocessable entity status" do
          expect { subject }.not_to change(Report, :count)
          expect(response).to have_http_status(:unprocessable_entity)
        end
      end

      context "when the date is duplicated" do
        before { existing_report }
        let(:attributes) { { date: existing_report.date, content: "Sample content" } }

        it "does not create a new report and returns an unprocessable entity status" do
          expect { subject }.not_to change(Report, :count)
          expect(response).to have_http_status(:unprocessable_entity)
        end
      end
    end
  end

  describe "PATCH /update" do
    subject { patch api_v1_report_path(report_id), params: { report: attributes } }

    let(:report_id) { existing_report.id }

    context "when parameters are valid" do
      let(:attributes) { { date: Date.new(2025, 1, 10), content: 'Updated content' } }

      it "updates the existing report" do
        subject
        expect(existing_report.reload).to have_attributes(attributes)
        expect(response).to have_http_status(:success)
      end
    end

    context "when parameters are invalid" do
      context "when required fields are missing" do
        let(:attributes) { { date: '', content: '' } }

        it "does not update the report and returns an unprocessable entity status" do
          subject
          expect(existing_report.reload).not_to have_attributes(attributes)
          expect(response).to have_http_status(:unprocessable_entity)
        end
      end

      context "when the date is duplicated" do
        let(:duplicate_report) { create(:report) }
        let(:attributes) { { date: duplicate_report.date, content: "New content" } }

        it "does not update the report and returns an unprocessable entity status" do
          subject
          expect(existing_report.reload).not_to have_attributes(attributes)
          expect(response).to have_http_status(:unprocessable_entity)
        end
      end

      context "when the report does not exist" do
        let(:report_id) { non_exsiting_report_id }

        it "returns a 404 status code" do
          subject
          expect(response).to have_http_status(:not_found)
        end
      end
    end
  end

  describe "DELETE /destroy" do
    before { existing_report }
    subject { delete api_v1_report_path(existing_report) }

    it "destroys the requested report" do
      expect { subject }.to change(Report, :count).by(-1)
      expect(response).to have_http_status(:no_content)
    end
  end
end
