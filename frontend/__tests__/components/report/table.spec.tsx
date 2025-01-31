import ReportTable from "@/components/tables/report"
import { mockReports } from "@/mocks/data/report"
import { render, screen, within } from "@testing-library/react"

describe("ReportTable", () => {
  it("should render reports in the table", () => {
    render(<ReportTable reports={mockReports} />)

    const headerRow = screen.getAllByRole("row")[0]
    expect(within(headerRow).getByText("日付")).toBeInTheDocument()
    expect(within(headerRow).getByText("内容")).toBeInTheDocument()
    expect(within(headerRow).getByText("編集")).toBeInTheDocument()

    mockReports.forEach((report, index) => {
      const row = screen.getAllByRole("row")[index + 1]
      expect(within(row).getByText(report.reported_at)).toBeInTheDocument()
      expect(within(row).getByText(report.content)).toBeInTheDocument()

      const editButton = within(row).getByRole("button", { name: /編集/i })
      expect(editButton).toBeInTheDocument()
    })
  })
})
