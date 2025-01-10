class Api::V1::ReportsController < ApplicationController
  before_action :set_report, only: %i[show update destroy]

  def index
    @reports = Report.all

    render json: @reports
  end

  def show
    render json: @report
  rescue ActiveRecord::RecordNotFound
    render json: {}, status: :not_found
  end

  def create
    @report = Report.new(report_params)

    if @report.save
      render json: @report, status: :created, location: api_v1_report_path(@report)
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
  end

  private
  def set_report
    @report = Report.find(params[:id])
  end

  def report_params
    params.require(:report).permit(:date, :content)
  end
end
