import React, { useState, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { message, orderAtom, orderHeader } from './orderAtom'
import { noodlesType } from './orderAtom'
import { doc, addDoc, collection } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../../firebase/firebase.config'

export interface orderType {
  Order_Date: Date
  Product_ID: string
  Status: boolean
  Username: string
  Order_ID?: string
}

const ClickOrder = ({ name }: any) => {
  const [messageState, setMessage] = useRecoilState(message)
  const orderState = useRecoilValue(orderAtom)
  const [Loading, setLoading] = useState<boolean>(false)
  const orderHeaderState = useRecoilValue(orderHeader)

  const handleClick = async () => {
    await setLoading(true)
    // if await orderStateCheck() return false return
    if (!(await orderStateCheck())) {
      setLoading(false)
      return
    }

    let productID = await calProductId()

    await addDoc(collection(db, 'ORDER'), {
      Order_Date: new Date(),
      Product_ID: productID,
      Status: true,
      Username: auth.currentUser?.displayName,
      UID: auth.currentUser?.uid,
      Order_Name: orderHeaderState,
    } as orderType)

    await setLoading(false)
    await setMessage('สั่งอาหารสำเร็จ')
    //wait 2 second and redirect to home page
    setTimeout(() => {
      window.location.href = '/'
    }, 2000)
  }

  const orderStateCheck = (): boolean => {
    //check if orderState.noodlesType is none return false
    if (orderState.noodlesType === 'none') {
      setMessage('กรุณาเลือกให้ครบ')
      return false
    }

    //check if orderState.noodlesSize is none return false
    if (orderState.noodlesSize === 'none') {
      setMessage('กรุณาเลือกให้ครบ')
      return false
    }

    return true
  }

  useEffect(() => {
    //on auth get user
    onAuthStateChanged(auth, (user) => {
      if (user) {
      } else {
        window.location.href = '/login'
      }
    })
  }, [])

  let noodleType: noodlesType[] = [
    'namsai',
    'namtok',
    'tomyam',
    'yentafold',
    'mala',
    'heak',
  ]

  const calProductId = async () => {
    // if noodlestyle and noodlesize is none return
    if (
      orderState.noodlesType === 'none' ||
      orderState.noodlesSize === 'none'
    ) {
      setMessage('กรุณาเลือกให้ครบ!')
      return
    }

    const oddlist = [1, 3, 5, 7, 9, 11]
    const HeadID = name
    // find index in noodleType use orderState.noodlesType
    const index = noodleType.findIndex(
      (item) => item === orderState.noodlesType
    )

    // if noodlesize is special add 1 to subID
    let subID: any = oddlist[index]
    if (orderState.noodlesSize === 'special') {
      subID += 1
    }

    subID = String(oddlist[index])
    // if subID is have one digit add 00 to subID if have two digit add 0 to subID
    if (subID.length === 1) {
      subID = '00' + subID
    } else if (subID.length === 2) {
      subID = '0' + subID
    }

    const productID = HeadID + subID

    return productID
  }

  return (
    <div>
      {Loading ? (
        <div className="mt-6 animate-spin">ประมวลผล!</div>
      ) : (
        <div className="flex flex-col gap-2">
          <button
            onClick={handleClick}
            className="mx-10 mt-6 bg-red-600 p-2 px-4 text-xl text-white hover:drop-shadow-xl"
          >
            สั่งอาหาร!
          </button>
          <button
            className="mt-6 rounded-l border border-gray-500 bg-white p-2 px-4 text-xl text-red-600 hover:shadow-xl"
            onClick={() => {
              window.location.href = '/'
            }}
          >
            กลับไปที่รายการอาหาร
          </button>
        </div>
      )}
    </div>
  )
}

export default ClickOrder
