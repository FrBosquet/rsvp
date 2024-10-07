import {
  type Event,
  type Guest as PrismaGuest,
  type Note,
  type User,
  type UserOnEvent
} from '@prisma/client'

import { LangKey } from './lib/translator'

export enum States {
  pending = 'pending',
  accepted = 'accepted',
  declined = 'declined'
}

export interface Guest {
  event: number
  name: string[]
  slug: string
  isFamily: boolean
  state: States
  amount: number
  maxAmount: number
  host: {
    name: string
  }
  contacted: boolean
}

export enum GuestType {
  single,
  couple,
  family
}

export type GuestWithHost = GuestWithNotes & {
  host: User
}

export enum STATE {
  pending = 'pending',
  accepted = 'accepted',
  rejected = 'rejected',
  accepting = 'accepting'
}

export enum TABS {
  assistance = 'assistance',
  contact = 'contact',
  housing = 'housing',
  commuting = 'commuting',
  gift = 'gift'
}

export enum NOTES {
  allergies = 'allergies',
  bus = 'bus'
}

export type GuestWithNotes = PrismaGuest & { notes: Note[] }
export type GuestWithEvent = GuestWithNotes & {
  event: { settings: Array<{ type: SETTING; value: string }> }
}

export enum SETTING {
  ogTitle = 'og:title',
  ogDescription = 'og:description',
  ogDescriptionSingle = 'og:description_single',
  ogImage = 'og:image'
}

export type SettingMap = Partial<Record<SETTING, string>>

export type UserOnEventWithUser = UserOnEvent & {
  user: User | null
}

export type EventWithUsers = Event & {
  users: Array<UserOnEventWithUser>
}

export type UserPrefs = {
  language?: LangKey
}

export type UserWithPrefs = User & {
  prefs: UserPrefs
}

export type InvitationConfig = {
  containerWidth?: string
  containerHeight?: string
}
