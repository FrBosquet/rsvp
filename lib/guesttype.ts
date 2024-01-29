import { type Guest as PrismaGuest } from '@prisma/client'
import { GuestType, type Guest } from '../types'

export const getGuestType = ({ isFamily, name, amount }: Guest): GuestType => {
  if (isFamily) return GuestType.family
  if (!isFamily && name.length === 1) return GuestType.single
  if (amount === 1) return GuestType.single

  return GuestType.couple
}

export const getGuestTypes = (
  guest: Guest
): {
  isSingle: boolean
  isFamily: boolean
  isCouple: boolean
} => {
  const guestType = getGuestType(guest)

  const isSingle = guestType === GuestType.single
  const isFamily = guestType === GuestType.family
  const isCouple = guestType === GuestType.couple

  return { isSingle, isFamily, isCouple }
}

export const getTypes = (
  guest: PrismaGuest
): {
  isSingle: boolean
  isFamily: boolean
  isCouple: boolean
} => {
  let guestType: GuestType = GuestType.couple

  if (guest.isFamily) guestType = GuestType.family
  if (!guest.isFamily && guest.name.split(',').length === 1) guestType = GuestType.single
  if (guest.maxAmount === 1) guestType = GuestType.single

  const isSingle = guestType === GuestType.single
  const isFamily = guestType === GuestType.family
  const isCouple = guestType === GuestType.couple

  return { isSingle, isFamily, isCouple }
}
