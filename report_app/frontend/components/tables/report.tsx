import { Report } from "@/lib/types/report"
import Link from "next/link"

type ReportTableProps = {
  reports: Array<Report>
}

export default function ReportTable({ reports }: ReportTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>日付</th>
            <th>内容</th>
            <th>編集</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.id}>
              <td>{report.reported_at}</td>
              <td className="whitespace-break-spaces">{report.content}</td>
              <td>
                <Link href={`/reports/${report.id}`}>
                  <button className="btn btn-sm btn-primary">編集</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
