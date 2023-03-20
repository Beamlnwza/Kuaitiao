import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import './foodcard.css'

export interface foodcardProps {
  ID: string
  Name: string
  Price: number
}

const FoodCard = ({ data }: any): JSX.Element => {
  const navigate = useNavigate()

  const redirectOrder = () => {
    navigate(`/order/${data.ID}`)
  }

  return (
    <div
      className={
        'foodcard flex h-32 w-32 cursor-pointer flex-col items-center justify-center bg-yellow-400 text-stone-900 hover:drop-shadow-2xl'
      }
      onClick={redirectOrder}
    >
      <div>{data.Name}</div>
      <div>เริ่มต้น 25</div>
      <div>พิเศษ 30</div>
    </div>
  )
}

export default FoodCard
