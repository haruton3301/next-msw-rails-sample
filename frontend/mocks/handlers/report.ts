import { http, HttpResponse, RequestHandler } from "msw"
import { mockReports } from "../data/report"

export const createReportHandlers = (
  mockEndPoint: string,
): RequestHandler[] => {
  return [
    http.post(`${mockEndPoint}/v1/reports`, async ({ request }) => {
      const body = await request.json()
      const { content, reported_at } = body as {
        content: string
        reported_at: string
      }

      if (!content || !reported_at) {
        return HttpResponse.json(
          { errors: ["Content and reported_at are required"] },
          { status: 400 },
        )
      }

      const newReport = {
        id: mockReports.length.toString(),
        reported_at: reported_at,
        content: content,
      }

      return HttpResponse.json(newReport, { status: 201 })
    }),

    http.get(`${mockEndPoint}/v1/reports`, async () => {
      return HttpResponse.json(mockReports, { status: 200 })
    }),

    http.get(`${mockEndPoint}/v1/reports/:reportId`, async ({ params }) => {
      const { reportId } = params

      const report = mockReports.find((r) => r.id === reportId)

      if (report) {
        return HttpResponse.json(report, { status: 200 })
      }

      return HttpResponse.json(
        { errors: ["Report not found"] },
        { status: 404 },
      )
    }),

    http.patch(`${mockEndPoint}/v1/reports/:reportId`, async ({ params }) => {
      const { reportId } = params

      const report = mockReports.find((r) => r.id === reportId)

      if (report) {
        return HttpResponse.json(report, { status: 200 })
      }

      return HttpResponse.json(
        { errors: ["Report not found"] },
        { status: 404 },
      )
    }),

    http.delete(`${mockEndPoint}/v1/reports/:reportId`, async ({ params }) => {
      const { reportId } = params

      const report = mockReports.find((r) => r.id === reportId)

      if (report) {
        return HttpResponse.text(null, { status: 204 })
      }

      return HttpResponse.json(
        { errors: ["Report not found"] },
        { status: 404 },
      )
    }),
  ]
}
