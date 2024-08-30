import { logger } from './server/logger'

export interface FilterState {
  host: string
  name: string
  state: string
}

export const EMPTY_HOST = 'EMPTY_HOST'

export const initialState = {
  host: EMPTY_HOST,
  name: '',
  state: ''
}

export enum FilterActions {
  setFilter,
  resetFilter,
  toggleFilter,
  setFilters
}

interface Action {
  type: FilterActions
  payload: any
}

export const reducer = (state: FilterState, action: Action): FilterState => {
  const { type, payload } = action

  let derivedState

  switch (type) {
    case FilterActions.setFilter:
      derivedState = {
        ...state,
        [payload.field]: payload.value
      }

      break
    case FilterActions.resetFilter:
      derivedState = {
        ...state,
        [payload.field]: ''
      }
      break
    case FilterActions.toggleFilter:
      derivedState = {
        ...state,
        [payload.field]:
          state[payload.field as keyof FilterState] === payload.value
            ? ''
            : payload.value
      }
      break
    case FilterActions.setFilters:
      derivedState = payload as FilterState
      break
    default:
      throw new Error(`Unknown action ${type as string}`)
  }

  try {
    localStorage.setItem('adminFilter', JSON.stringify(derivedState))
  } catch {
    logger.error('Failed to serialize filter state')
  }

  return derivedState
}
