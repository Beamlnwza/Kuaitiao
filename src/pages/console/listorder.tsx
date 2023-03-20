import React, { ReactNode } from 'react'
import { useQuery } from '@tanstack/react-query'
import { db, auth } from '../../firebase/firebase.config'
import {
  collection,
  query,
  getDocs,
  where,
  DocumentData,
  setDoc,
  doc,
  orderBy,
} from 'firebase/firestore'
import { signOut } from 'firebase/auth'
import { orderType } from '../order/order'
import { useState } from 'react'

const ListOrder = () => {
  const { data, isLoading, error } = useQuery(['listOrder'], () => {
    return getOrder()
  })

  const [DocumentID, setDocumentIDState] = useState<string[]>([])

  const getOrder = async () => {
    const q = query(collection(db, 'ORDER'), where('Status', '==', true))
    const qSnapshot = await getDocs(q)
    let documentID = qSnapshot.docs.map((doc) => doc.id)
    let data = await qSnapshot.docs.map((doc) => doc.data())
    setDocumentIDState(documentID)
    return data
  }

  const getDate = (date: any) => {
    const d = new Date(date)
    return d.toLocaleDateString()
  }

  const SignOutHandle = () => {
    signOut(auth)
    window.location.href = '/'
  }

  const renderDate = (date: any) => {
    let d = date.toDate().toString()
    d = d.split(' ')
    d = d[0] + ' ' + d[1] + ' ' + d[2] + ' ' + d[3] + ' ' + d[4]
    return <div>{d}</div>
  }

  const orderSubmitHandle = async (
    e: React.MouseEvent,
    item: DocumentData[string]
  ) => {
    await e.preventDefault()
    let data = item
    await setDoc(doc(db, 'ORDER', item), {
      Status: false,
    } as orderType)
  }

  const renderHeader = (): ReactNode => {
    const HeaderList = ['Product ID', 'Order Date', 'UserName', 'Action']
    //make array of 1-4
    const colIndex = Array.from(Array(4).keys())
    return (
      <div className="grid grid-cols-4 py-5">
        {HeaderList.map((item, index) => (
          <div
            key={index}
            className={
              'col-start-' +
              colIndex[index + 1] +
              ' mx-10 flex justify-center border border-gray-500 p-2 text-xl'
            }
          >
            {item}
          </div>
        ))}
      </div>
    )
  }

  const noodleDict = {
    A: 'เส้นเล็ก',
    B: 'หมี่เหลือง',
    C: 'วุ้นเส้น',
    D: 'มาม่า',
    E: 'เส้นใหญ่',
    F: 'หมี่ขาว',
  }

  const renderProductHeader = (
    Product_ID: string,
    Order_Header: string
  ): ReactNode => {
    // @ts-ignore
    let product = noodleDict[Product_ID[0]]

    return <div>{product + ' ' + Order_Header + ' ' + Product_ID}</div>
  }

  return (
    <div className="">
      <div className="flex h-16 w-screen items-center justify-end gap-2 px-5">
        <button
          className="rounded-lg bg-yellow-500 p-2"
          onClick={() => {
            window.location.href = '/'
          }}
        >
          กลับไปที่หน้าหลัก
        </button>
        <button
          className="rounded-lg bg-red-600 p-2 text-white"
          onClick={SignOutHandle}
        >
          ออกจากระบบ
        </button>
      </div>
      <div className="">
        <div className="flex h-12 w-screen justify-center text-3xl font-bold">
          รายการสั่งอาหาร
        </div>
        {renderHeader()}
        {data?.map((item, index) => (
          <div
            key={index}
            className="my-4 grid grid-cols-4 border border-x-0 border-t-0 border-b-gray-500 text-lg"
          >
            <div className="col-start-1 flex justify-center">
              {renderProductHeader(item.Product_ID, item.Order_Name)}
            </div>
            <div className="col-start-2 flex justify-center">
              {renderDate(item.Order_Date)}
            </div>
            <div className="col-start-3 flex justify-center">
              {item.Username}
            </div>
            <button
              onClick={(e) => {
                orderSubmitHandle(e, DocumentID[index])
              }}
              className="col-start-4 mx-28 border bg-red-600 text-white"
            >
              Submit Order
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListOrder
