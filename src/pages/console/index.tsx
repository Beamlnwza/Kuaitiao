import React, { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../../firebase/firebase.config'
import { collection, query, where, getDocs } from 'firebase/firestore'
import ListOrder from './listorder'

const Console = () => {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const adminCol = collection(db, 'ADMIN')
        const q = query(adminCol, where('UUID', '==', user.uid))
        const qSnapshot = getDocs(q)
        qSnapshot.then((snapshot) => {
          //if snapshot exists, then user is admin
          //else redirect to login
          if (snapshot.empty) {
            window.location.href = '/'
            return
          }
        })
      } else {
        window.location.href = '/login'
      }
    })
  }, [])
  return (
    <div>
      <ListOrder />
    </div>
  )
}

export default Console
