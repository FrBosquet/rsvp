type Props = {
  children: React.ReactNode
  htmlFor: string
}

export const FormLabel = ({ children, htmlFor }: Props) => {
  return (
    <label
      className="mb-2 mt-3 flex items-center gap-2 font-sans uppercase"
      htmlFor={htmlFor}
    >
      {children}
    </label>
  )
}
