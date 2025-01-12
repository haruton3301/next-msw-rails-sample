type FormTitleProps = {
  children: React.ReactNode
}

export default function FormTitle({ children }: FormTitleProps) {
  return <h1 className="mb-2 text-center text-xl font-semibold">{children}</h1>
}
