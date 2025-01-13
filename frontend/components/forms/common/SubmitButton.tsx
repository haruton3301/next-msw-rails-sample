import clsx from "clsx"

type SubmitButtonProps = {
  children: React.ReactNode
  disabled?: boolean
  className?: string
}

export default function SubmitButton({
  children,
  disabled = false,
  className = "",
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={clsx(
        disabled ? "btn-disabled" : "",
        "btn btn-primary w-full",
        className,
      )}
    >
      {children}
    </button>
  )
}
