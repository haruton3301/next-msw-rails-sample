type FormCardProps = {
  children: React.ReactNode
}

export default function FormCard({ children }: FormCardProps) {
  return (
    <div className="w-full max-w-sm p-6 rounded-lg bg-white shadow-sm">
      {children}
    </div>
  )
}
