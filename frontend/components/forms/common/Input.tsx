import clsx from "clsx"
import { forwardRef } from "react"

type TextInputProps = {
  id: string
  type?: string
  placeholder?: string
  className?: string
  error?: string
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    { id, type = "text", placeholder = "", className = "", error, ...rest },
    ref,
  ) => {
    return (
      <div className="space-y-1">
        <input
          id={id}
          ref={ref}
          type={type}
          placeholder={placeholder}
          className={clsx(
            "input input-bordered w-full",
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

TextInput.displayName = "TextInput"

export default TextInput
