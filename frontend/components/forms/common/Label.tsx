import { ReactNode } from "react"

type FormLabelProps = {
  children: ReactNode
  htmlFor?: string
}

export default function FormLabel({ children, htmlFor }: FormLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="block font-medium text-sm text-gray-700"
    >
      {children}
    </label>
  )
}
