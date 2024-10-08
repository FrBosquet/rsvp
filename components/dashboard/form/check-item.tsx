import { cn } from '@/lib/utils'

type Props = {
  children?: React.ReactNode
  className?: string
  name: string
  value: string
  style?: Record<`--${string}`, string>
}

export const CheckItem = ({
  children,
  name,
  value,
  style,
  className
}: Props) => {
  const id = `${name}-${value}`

  return (
    <div className="contents" style={style}>
      <input
        hidden
        className="peer"
        id={id}
        name={name}
        type="radio"
        value={value}
      />
      <label
        className={cn(
          'aspect-square rounded-lg shadow-sm size-full cursor-pointer peer-checked:border-2 peer-checked:shadow-inner border-gray-800 overflow-hidden relative',
          className
        )}
        htmlFor={id}
      >
        {children}
      </label>
    </div>
  )
}
