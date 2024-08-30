import { Input as ShadcnInput, type InputProps } from '@/components/ui/input'

export const Input = ({
  label,
  name,
  type,
  ...props
}: InputProps & { label: string }) => {
  return (
    <label className="flex flex-col gap-2" htmlFor={name}>
      <h3 className="font-sans font-semibold uppercase">{label}</h3>
      <ShadcnInput id={name} name={name} type={type} {...props} />
    </label>
  )
}
