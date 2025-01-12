import clsx from "clsx"

type SubmitButtonProps = {
  children: React.ReactNode
  disabled?: boolean
}

export default function SubmitButton({
  children,
  disabled = false,
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={clsx(disabled ? "btn-disabled" : "", "btn btn-primary w-full")}
    >
      {children}
    </button>
  )
}
