import React, { useState, useEffect } from 'react'
import { noodlesType, noodlesSize, orderAtom, OrderType } from './orderAtom'
import { useRecoilState } from 'recoil'

export interface checkboxProps {
  name: string | undefined
}

const Checkbox1 = ({ name }: checkboxProps): JSX.Element => {
  const [orderState, setOrderState] = useRecoilState(orderAtom)
  const [CheckboxTrue, setCheckboxTrue] = useState<boolean[]>(
    Array(5).fill(false)
  )
  const [CheckBoxTrue2, setCheckBoxTrue2] = useState<boolean[]>([true, false])

  let noodleType: noodlesType[] = [
    'namsai',
    'namtok',
    'tomyam',
    'yentafold',
    'mala',
    'heak',
  ]

  //translate noodleType to thai
  let noodleTypeThai: string[] = [
    'น้ำใส',
    'น้ำตก',
    'ต้มยำ',
    'เย็นตาโฟล',
    'หมาล่า',
    'แห้ง',
  ]

  let noodleSize: noodlesSize[] = ['regular', 'special']

  let noodleSizeThai: string[] = ['ธรรมดา', 'พิเศษ']

  const handleCheckBoxNoodleTypes = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let newCheckboxTrue = [...CheckboxTrue]
    // make all newcheckboxtrue false
    newCheckboxTrue = newCheckboxTrue.map((item) => false)
    newCheckboxTrue[Number(e.target.id)] = !newCheckboxTrue[Number(e.target.id)]
    setCheckboxTrue(newCheckboxTrue)
  }

  const handleCheckBoxNoodleSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newCheckboxTrue = [...CheckBoxTrue2]
    // make all newcheckboxtrue false
    newCheckboxTrue = newCheckboxTrue.map((item) => false)
    if (e.target.id !== 'undefined') {
      newCheckboxTrue[Number(e.target.id)] =
        !newCheckboxTrue[Number(e.target.id)]
      setCheckBoxTrue2(newCheckboxTrue)
    }
  }

  const [noodleName, setNoodleName] = useState<string>('')

  //if it's true in checkboxtrue1 and checkboxtrue2 set noodlename to index of noodleType and noodleSize
  useEffect(() => {
    if (CheckboxTrue.includes(true) && CheckBoxTrue2.includes(true)) {
      let index1 = CheckboxTrue.findIndex((item) => item === true)
      let index2 = CheckBoxTrue2.findIndex((item) => item === true)
      setNoodleName(noodleTypeThai[index1] + ' ' + noodleSizeThai[index2])
      let noodleOrdered: OrderType = {
        noodlesType: noodleType[index1],
        noodlesSize: noodleSize[index2],
      }

      setOrderState((old) => {
        return {
          noodlesSize: noodleOrdered.noodlesSize,
          noodlesType: noodleOrdered.noodlesType,
        }
      })
    }
  }, [CheckboxTrue, CheckBoxTrue2])

  /* useEffect(() => {
    return () => {}
  }, [])
 */

  return (
    <div className="justify-cente flex flex-col items-center gap-5">
      <div className="text-4xl font-bold">{noodleName}</div>
      <div className="flex flex-row gap-10">
        {noodleTypeThai.map((type, index) => {
          return (
            <div
              key={index}
              className="flex flex-col items-center justify-center gap-2"
            >
              <div>{type}</div>
              <input
                type="checkbox"
                name={noodleType[index]}
                checked={CheckboxTrue[index]}
                id={String(index)}
                onChange={handleCheckBoxNoodleTypes}
                className="h-6 w-6"
              />
            </div>
          )
        })}
      </div>
      <div className="flex flex-row gap-10">
        {noodleSizeThai.map((size, index) => {
          return (
            <div
              key={index}
              className="flex flex-col items-center justify-center gap-2"
            >
              <div>{size}</div>
              <input
                type="checkbox"
                name={noodleSize[index]}
                checked={CheckBoxTrue2[index]}
                id={String(index)}
                onChange={handleCheckBoxNoodleSize}
                className="h-6 w-6"
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Checkbox1
