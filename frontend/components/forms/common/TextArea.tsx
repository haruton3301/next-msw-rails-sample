import clsx from "clsx"
import { forwardRef } from "react"

type TextAreaProps = {
  id: string
  placeholder?: string
  className?: string
  error?: string
  rows?: number
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ id, placeholder = "", className = "", error, rows = 3, ...rest }, ref) => {
    return (
      <div className="space-y-1">
        <textarea
          id={id}
          ref={ref}
          placeholder={placeholder}
          rows={rows}
          className={clsx(
            "textarea textarea-bordered w-full",
            error ? "border-red-500" : "",
            className,
          )}
          {...rest}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    )
  },
)

TextArea.displayName = "TextArea"

export default TextArea
