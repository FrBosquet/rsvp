'use client'

import { useGuest } from '@/components/hooks/use-guest'
import { Wrapper } from './wrapper'

interface Props {
  visible: boolean
}

export const Commuting = ({ visible }: Props) => {
  const { guest } = useGuest()

  if (!guest) return null

  return (<Wrapper visible={visible}>
    <h1 className='w-full border-b-2 border-zinc-400 pb-3 text-center font-serif text-xl uppercase'>Contacto</h1>
    <p className='text-base'>La finca se encuentra en Almazora, a apenas 15 minutos de Castellón. Hemos dispuesto autobuses para facilitar el traslado desde la ciudad de Castellón de la Plana hasta la finca Mas dels Doblons.</p>
    <p className='text-base'>Horarios de ida:</p>
    <table className='text-xs'>
      <tr>
        <th>Origen</th>
        <th>Hora</th>
      </tr>
      <tr>
        <td>Hotel Center</td>
        <td>12:30</td>
      </tr>
      <tr>
        <td>Plz. María Agustina</td>
        <td>12:20</td>
      </tr>
    </table>
    <p className='text-base'>Horarios de vuelta:</p>

    <table className='text-xs'>
      <tr>
        <th>Destino</th>
        <th>Hora</th>
      </tr>
      <tr>
        <td>Hotel Center</td>
        <td>19:30</td>
      </tr>
      <tr>
        <td>Hotel Center</td>
        <td>23:00</td>
      </tr>
    </table>
  </Wrapper>)
}
