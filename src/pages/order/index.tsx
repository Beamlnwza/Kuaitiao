import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Checkbox1 from './checkbox1'
import { noodlesSize, noodlesType } from './orderAtom'
import ClickOrder from './order'
import { useRecoilState } from 'recoil'
import { message } from './orderAtom'

const Order = () => {
  const { id } = useParams<{ id: string }>()
  const [name, setName] = useState<string | null>(null)
  const [surname, setSurname] = useState<string | null>(null)
  const [messageState, setmessageState] = useRecoilState(message)

  useEffect(() => {
    checkifavilabke()

    function checkifavilabke() {
      if (id) {
        let list = ['A', 'B', 'C', 'D', 'E', 'F']
        //if id not in list, redirect to 404 page
        if (!list.includes(id)) {
          window.location.href = '/404'
        }
      }
    }
  }, [id])

  const noodleDict = {
    A: 'เส้นเล็ก',
    B: 'หมี่เหลือง',
    C: 'วุ้นเส้น',
    D: 'มาม่า',
    E: 'เส้นใหญ่',
    F: 'หมี่ขาว',
  }

  useEffect(() => {
    if (localStorage.getItem('name') && localStorage.getItem('surname')) {
      setName(localStorage.getItem('name'))
      setSurname(localStorage.getItem('surname'))
    }
    return () => {}
  }, [])

  return (
    <div className="grid grid-cols-3">
      <div className="col-start-1 flex h-screen w-screen flex-col items-center justify-center border border-gray-500">
        <div className="my-2 text-3xl">{messageState}</div>
        {/* @ts-ignore */}
        <div className="text-2xl">{noodleDict[id]}</div>
        <Checkbox1 name={id} />
        <ClickOrder name={id} />
      </div>
    </div>
  )
}

export default Order
