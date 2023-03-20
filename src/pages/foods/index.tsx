import React from 'react'
import Navbar from '../../components/Navbar'
import '../../style/backgrounds.css'
import FoodCard from './foodcard'
import { sudoData } from '../../assets/sudoData'
import { useQuery } from '@tanstack/react-query'
import { foodcardProps } from './foodcard'
import { doc, getDoc, collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase/firebase.config'

const Foods = () => {
  const { isLoading, isError, data, error } = useQuery(['foods'], async () => {
    let data = await getPreviewFood()
    return data
  })

  const getPreviewFood = async () => {
    const displaySnapshot = await getDocs(collection(db, 'DISPLAY'))
    const displayData = displaySnapshot.docs.map((doc) => doc.data())
    return displayData
  }

  const renderFoodCards = () => {
    //if data is loading
    if (isLoading) {
      return <div>Loading...</div>
    }

    //if data is null
    if (!data) {
      return <div>No data</div>
    }

    //if data is work
    if (data) {
      return data.map((food, index) => {
        return <FoodCard data={food} />
      })
    }
  }

  return (
    <div className="">
      <div className="absolute">
        <Navbar />
        <div className="flex w-screen flex-wrap items-center justify-center gap-16 pt-24">
          {renderFoodCards()}
        </div>
      </div>
      <div className="main-bg absolute -z-10"></div>
    </div>
  )
}

export default Foods
