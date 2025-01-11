class V1::ReportsController < ApplicationController
  before_action :authenticate_v1_user!
  before_action :set_report, only: [ :show, :update, :destroy ]

  def index
    reports = current_v1_user.reports
    render json: reports
  end

  def show
    render json: @report
  end

  def create
    report = current_v1_user.reports.build(report_params)

    if report.save
      render json: report, status: :created
    else
      render json: {}, status: :unprocessable_entity
    end
  end

  def update
    if @report.update(report_params)
      render json: @report
    else
      render json: {}, status: :unprocessable_entity
    end
  end

  def destroy
    @report.destroy
    head :no_content
  end

  private

  def set_report
    @report = current_v1_user.reports.find(params[:id])
  end

  def report_params
    params.permit(:reported_at, :content)
  end
end
