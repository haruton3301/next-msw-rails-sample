import clsx from "clsx"

type CardProps = {
  children: React.ReactNode
  className?: string
}

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={clsx("w-full p-6 rounded-lg bg-white shadow-sm", className)}
    >
      {children}
    </div>
  )
}
