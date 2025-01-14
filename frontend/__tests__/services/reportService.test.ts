import { CommonError } from "@/lib/errors/base"
import { ReportNotFoundError } from "@/lib/errors/report"
import ReportService from "@/lib/services/reportService"
import { validDummySession } from "@/mocks/data/auth"
import { mockReports } from "@/mocks/data/report"
import { server } from "@/mocks/setup/server"

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe("ReportService", () => {
  let reportService: ReportService

  beforeEach(() => {
    reportService = new ReportService()
  })

  describe("getReports", () => {
    it("should fetch all reports successfully", async () => {
      const reports = await reportService.getReports(validDummySession)

      expect(reports).toEqual(mockReports)
    })
  })

  describe("getReportDetails", () => {
    it("should fetch a report's details successfully", async () => {
      const reportId = mockReports[0].id
      const report = await reportService.getReportDetails(
        validDummySession,
        reportId,
      )

      expect(report).toEqual(mockReports[0])
    })

    it("should throw ReportNotFoundError when report is not found", async () => {
      const invalidReportId = "9999"
      await expect(
        reportService.getReportDetails(validDummySession, invalidReportId),
      ).rejects.toThrow(ReportNotFoundError)
    })
  })

  describe("createReport", () => {
    it("should create a report successfully", async () => {
      const newReport = await reportService.createReport(validDummySession, {
        content: mockReports[0].content,
        reported_at: mockReports[0].reported_at,
      })

      expect(newReport).toHaveProperty("id")
      expect(newReport.content).toBe(mockReports[0].content)
    })
  })

  describe("updateReport", () => {
    it("should update a report successfully", async () => {
      const reportId = mockReports[0].id
      const updatedReport = await reportService.updateReport(
        validDummySession,
        reportId,
        {
          content: mockReports[1].content,
          reported_at: mockReports[1].reported_at,
        },
      )

      expect(updatedReport.content).toBe(mockReports[1].content)
      expect(updatedReport.reported_at).toBe(mockReports[1].reported_at)
    })

    it("should throw ReportNotFoundError when report is not found", async () => {
      const invalidReportId = "9999"
      await expect(
        reportService.updateReport(validDummySession, invalidReportId, {
          content: mockReports[1].content,
          reported_at: mockReports[1].reported_at,
        }),
      ).rejects.toThrow(ReportNotFoundError)
    })
  })

  describe("deleteReport", () => {
    it("should delete a report successfully", async () => {
      const reportId = mockReports[0].id
      await reportService.deleteReport(validDummySession, reportId)
    })

    it("should throw ReportNotFoundError when report is not found", async () => {
      const invalidReportId = "9999"
      await expect(
        reportService.deleteReport(validDummySession, invalidReportId),
      ).rejects.toThrow(CommonError)
    })
  })
})
