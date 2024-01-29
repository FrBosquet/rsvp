'use client'

import { useGuest } from '@/components/hooks/use-guest'
import { Wrapper } from './wrapper'

interface Props {
  visible: boolean
}

export const Housing = ({ visible }: Props) => {
  const { guest } = useGuest()

  if (!guest) return null

  return (<Wrapper visible={visible}>
    <h1 className='w-full border-b-2 border-zinc-400 pb-3 text-center font-serif text-xl uppercase'>Hotel</h1>
    <p className='text-base'>Hemos negociado con el Hotel X precios para nuestros invitados. Haz click en más información para consultar las tarifas y contratar.</p>
    <a href="a">Link al hotel X</a>
    <table className='text-xs' >
      <tr className='text-left font-semibold'>
        <th>Habitación</th>
        <th>SA*</th>
        <th>AD*</th>
      </tr>
      <tr>
        <td>Doble, 1 persona</td>
        <td>58€</td>
        <td>68€</td>
      </tr>
      <tr>
        <td>Doble</td>
        <td>58€</td>
        <td>78€</td>
      </tr>
      <tr>
        <td>triple</td>
        <td>78€</td>
        <td>108€</td>
      </tr>
      <tr>
        <td>Familiar**</td>
        <td>85€</td>
        <td>115€</td>
      </tr>
      <tr>
        <td>Premium</td>
        <td>78€</td>
        <td>98€</td>
      </tr>
      <tr>
        <td>Suplemento niño</td>
        <td>12€</td>
        <td>17€</td>
      </tr>
    </table>
    <p className='text-base'>Para beneficiarte de estas tarifas, debes ponerte en contacto con el hotel por medio de Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium quae quisquam odio inventore sint! Ex provident itaque rerum deserunt neque exercitationem magni sed. Eveniet, fugiat distinctio dolores libero sunt qui. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias impedit quaerat quod blanditiis dolorum voluptates, numquam perspiciatis beatae quo recusandae molestias? Quaerat illo aut iste mollitia fuga, magni nulla harum.</p>
  </Wrapper>)
}
