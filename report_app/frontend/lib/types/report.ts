export interface Report {
  id: string
  reported_at: string
  content: string
}

export interface ReportParams {
  reported_at: string
  content: string
}
