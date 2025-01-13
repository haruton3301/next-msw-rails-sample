import { Session } from "next-auth"
import { CommonError } from "../errors/base"
import { ReportNotFoundError } from "../errors/report"
import { Report, ReportParams } from "../types/report"
import { sessionToAuthHeaders } from "../utils/auth"
import ApiClient from "./apiClient"

class ReportService {
  private apiClient: ApiClient

  constructor() {
    this.apiClient = new ApiClient()
  }

  public async getReports(session: Session): Promise<Report[]> {
    try {
      const headers = sessionToAuthHeaders(session)
      const response = await this.apiClient.get("/v1/reports", headers)

      if (!response.ok) {
        throw new CommonError()
      }

      return await response.json()
    } catch {
      throw new CommonError()
    }
  }

  public async getReportDetails(
    session: Session,
    reportId: string,
  ): Promise<Report> {
    try {
      const headers = sessionToAuthHeaders(session)
      const response = await this.apiClient.get(
        `/v1/reports/${reportId}`,
        headers,
      )

      if (response.status === 404) {
        throw new ReportNotFoundError()
      }

      if (!response.ok) {
        throw new CommonError()
      }

      return await response.json()
    } catch {
      throw new CommonError()
    }
  }

  public async createReport(
    session: Session,
    params: ReportParams,
  ): Promise<Report> {
    try {
      const headers = sessionToAuthHeaders(session)
      const response = await this.apiClient.post("/v1/reports", params, headers)

      if (!response.ok) {
        throw new CommonError()
      }

      const createdReport: Report = await response.json()
      return createdReport
    } catch {
      throw new CommonError()
    }
  }

  public async updateReport(
    session: Session,
    reportId: string,
    params: ReportParams,
  ): Promise<Report> {
    try {
      const headers = sessionToAuthHeaders(session)
      const response = await this.apiClient.patch(
        `/v1/reports/${reportId}`,
        params,
        headers,
      )

      if (response.status === 404) {
        throw new ReportNotFoundError()
      }

      if (!response.ok) {
        throw new CommonError()
      }

      const updatedReport: Report = await response.json()
      return updatedReport
    } catch {
      throw new CommonError()
    }
  }

  public async deleteReport(session: Session, reportId: string): Promise<void> {
    try {
      const headers = sessionToAuthHeaders(session)
      const response = await this.apiClient.delete(
        `/v1/reports/${reportId}`,
        headers,
      )

      if (!response.ok) {
        throw new CommonError()
      }
    } catch {
      throw new CommonError()
    }
  }
}

export default ReportService
