import { cn } from '@/lib/utils'

type Props = {
  children?: React.ReactNode
  className?: string
  name: string
  value: string
  style?: Record<`--${string}`, string>
  defaultChecked?: boolean
}

export const CheckItem = ({
  children,
  name,
  value,
  style,
  className,
  defaultChecked
}: Props) => {
  const id = `${name}-${value}`

  return (
    <div className="contents" style={style}>
      <input
        hidden
        className="peer"
        defaultChecked={defaultChecked}
        id={id}
        name={name}
        type="radio"
        value={value}
      />
      <label
        className={cn(
          'aspect-square rounded-lg shadow-sm size-full cursor-pointer border-2 peer-checked:shadow-inner peer-checked:border-gray-800 overflow-hidden relative box-border',
          className
        )}
        htmlFor={id}
      >
        {children}
      </label>
    </div>
  )
}
