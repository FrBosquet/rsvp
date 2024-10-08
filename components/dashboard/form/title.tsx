type Props = {
  children: React.ReactNode
}

export const FormTitle = ({ children }: Props) => {
  return (
    <h2 className="mb-3 flex items-center gap-2 border-b-2 font-sans text-xl uppercase">
      {children}
    </h2>
  )
}
