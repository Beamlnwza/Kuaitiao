import React, { useEffect, useState } from 'react'
import Logo from './Logo'
import '../style/backgrounds.css'

import { auth } from '../firebase/firebase.config'
import { signOut, onAuthStateChanged } from 'firebase/auth'

const Navbar = () => {
  const [signoutMessage, setSignoutMessage] = useState<string>('Login')
  const [isAdmin, setIsAdmin] = useState<boolean>(false)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setSignoutMessage('Logout')
      } else {
        setSignoutMessage('Login')
      }

      if (user?.email === 'admin@kuaitiao.com') {
        setIsAdmin(true)
      }
    })
  }, [])

  const authHandle = () => {
    if (signoutMessage === 'Logout') {
      signOut(auth)
    } else {
      window.location.href = '/login'
    }
  }

  return (
    <div className="absolute flex h-20 w-screen items-center justify-center gap-6 overflow-hidden px-4 text-xl tracking-wide">
      <div className="absolute z-50 flex h-20 w-screen items-center justify-center gap-12">
        <div className="hover:cursor-pointer">Menus</div>
        <div>KUAITIAO</div>
        <div className="rotate-6 transform cursor-pointer bg-yellow-300 py-5 font-bold">
          ORDER NOW
        </div>
        <button onClick={authHandle}>{signoutMessage}</button>
        {isAdmin && (
          <button
            className="bg-red-600 p-2 text-white"
            onClick={() => {
              window.location.href = '/admin'
            }}
          >
            สำหรับพนักงาน
          </button>
        )}
      </div>
      <div className="main-bg2 absolute z-40 h-20 w-screen"></div>
    </div>
  )
}

export default Navbar
