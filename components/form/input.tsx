import { type InputProps, Input as ShadcnInput } from '@/components/ui/input'

export const Input = ({ label, name, type, ...props }: InputProps & { label: string }) => {
  return <label htmlFor={name}
    className='flex flex-col gap-2'>
    <h3 className='font-sans font-semibold uppercase'>{label}</h3>
    <ShadcnInput type={type}
      name={name}
      id={name}
      {...props}
    />
  </label>
}
