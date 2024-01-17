import {
  Avatar,
  Center,
  HStack,
  Icon,
  IconButton,
  Text,
  Tooltip,
  useBoolean,
  VStack
} from '@chakra-ui/react'
import Link from 'next/link'
import {
  BsBack,
  BsCheckCircleFill,
  BsFillXCircleFill,
  BsQuestionCircle,
  BsQuestionCircleFill
} from 'react-icons/bs'
import { TiTick } from 'react-icons/ti'
import { updateGuest } from '../lib/supabase'
import { States, type Guest } from '../types'
import { EditGuest } from './EditGuest'

interface Props {
  guest: Guest
  onEditSuccess: () => void
}

const stateIcons = {
  [States.pending]: BsQuestionCircle,
  [States.accepted]: BsCheckCircleFill,
  [States.declined]: BsFillXCircleFill
}

const stateLabels = {
  [States.pending]: 'Pendiente',
  [States.accepted]: 'Aceptado',
  [States.declined]: 'Rehusado'
}
const stateColors = {
  [States.pending]: 'yellow.300',
  [States.accepted]: 'green.300',
  [States.declined]: 'red.300'
}

export const GuestRow = ({ guest, onEditSuccess }: Props) => {
  const [isLoading, loading] = useBoolean(false)
  const { state, amount, slug, contacted } = guest

  const copy = () => {
    void navigator.clipboard.writeText(`https://${window.location.host}/${slug}`)
  }

  const toggleContacted = async () => {
    loading.on()

    await updateGuest(guest, {
      contacted: !contacted
    })

    onEditSuccess()
    loading.off()
  }

  const visibleAmount =
    state === States.accepted ? amount : state === States.declined ? 0 : '...'
  return (
    <HStack
      p={2}
      w="100%"
      position="relative"
      alignItems="center"
      _hover={{ bg: 'rgba(100, 100, 100, 0.25)' }}
    >
      <Tooltip hasArrow label={stateLabels[state]}>
        <Center>
          <Icon color={stateColors[state]} as={stateIcons[state]} />
        </Center>
      </Tooltip>

      <Tooltip hasArrow label={guest.host.name}>
        <Avatar size="xs" name={guest.host.name} />
      </Tooltip>

      <VStack alignItems="start" flex={1} spacing={0}>
        <EditGuest guest={guest} onSuccess={onEditSuccess}>
          <Tooltip label="editar invitacion">
            <Text noOfLines={1} color="white" textTransform="none">
              {guest.name.join(', ')}
            </Text>
          </Tooltip>
        </EditGuest>
        <HStack>
          <Link href={`/${slug}`} passHref target='_blank'>
            <Text
              flex={1}
              fontSize="xs"
              variant="monospace"
              color="yellow.200"
            >
              /{slug}
            </Text>
          </Link>
        </HStack>
      </VStack>
      <Text color="white">
        {visibleAmount}/{guest.maxAmount}
      </Text>
      <Tooltip hasArrow label={'Copiar'}>
        <IconButton
          variant="admin"
          onClick={copy}
          colorScheme="green"
          aria-label="copiar"
          size="xs"
          icon={<BsBack />}
        />
      </Tooltip>
      <Tooltip hasArrow label={'Marcar contactado'}>
        <IconButton
          isDisabled={isLoading}
          onClick={() => {
            void toggleContacted()
          }}
          colorScheme={contacted ? 'green' : 'gray'}
          aria-label="copiar"
          size="xs"
          icon={contacted ? <TiTick /> : <BsQuestionCircleFill />}
        />
      </Tooltip>
    </HStack>
  )
}
