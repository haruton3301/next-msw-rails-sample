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
        id: (mockReports.length + 1).toString(),
        content,
        reported_at,
      }

      mockReports.push(newReport)

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

    http.patch(
      `${mockEndPoint}/v1/reports/:reportId`,
      async ({ params, request }) => {
        const { reportId } = params
        const body = await request.json()
        const { content, reported_at } = body as {
          content: string
          reported_at: string
        }

        const reportIndex = mockReports.findIndex((r) => r.id === reportId)

        if (reportIndex !== -1) {
          mockReports[reportIndex] = {
            ...mockReports[reportIndex],
            content: content ?? mockReports[reportIndex].content,
            reported_at: reported_at ?? mockReports[reportIndex].reported_at,
          }

          return HttpResponse.json(mockReports[reportIndex], { status: 200 })
        }

        return HttpResponse.json(
          { errors: ["Report not found"] },
          { status: 404 },
        )
      },
    ),

    http.delete(`${mockEndPoint}/v1/reports/:reportId`, async ({ params }) => {
      const { reportId } = params

      const reportIndex = mockReports.findIndex((r) => r.id === reportId)

      if (reportIndex !== -1) {
        mockReports.splice(reportIndex, 1)

        return HttpResponse.text(null, { status: 204 })
      }

      return HttpResponse.json(
        { errors: ["Report not found"] },
        { status: 404 },
      )
    }),
  ]
}
