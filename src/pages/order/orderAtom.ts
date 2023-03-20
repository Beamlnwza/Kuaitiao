import { atom } from 'recoil'

export type noodlesType =
  | 'namsai'
  | 'namtok'
  | 'tomyam'
  | 'yentafold'
  | 'mala'
  | 'heak'
  | 'none'
export type noodlesSize = 'regular' | 'special' | 'none'

export interface OrderType {
  noodlesType: noodlesType
  noodlesSize: noodlesSize
}

export const orderAtom = atom({
  key: 'orderAtom',
  default: {
    noodlesType: 'none',
    noodlesSize: 'none',
  } as OrderType,
})

export const message = atom({
  key: 'message',
  default: '',
})

export const orderHeader = atom({
  key: 'orderHeader',
  default: '',
})
