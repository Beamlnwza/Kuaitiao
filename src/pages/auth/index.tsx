import React, { useState, useEffect } from 'react'
import { auth } from '../../firebase/firebase.config'
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import SignInGoogle from './signInGoogle'

const Auth = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        window.location.href = '/'
      }
    })

    return () => {}
  }, [])

  const LoginHandle = async () => {
    try {
      setError('')
      setLoading(true)
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      //if done reload page
      window.location.reload()
    } catch (e) {}
    setLoading(false)
  }

  const RegisterHandle = async () => {}

  return (
    <>
      <div className="grid h-screen grid-cols-[1fr_2fr_1fr]">
        <div className="col-start-2 col-end-3 flex flex-col items-start justify-center gap-5 px-40">
          <div className=" text-xl">เข้าสู่ระบบ!</div>
          <div>สำหรับลูกค้า</div>
          <div className="rounded-md border border-gray-300 py-2 px-64 hover:shadow-md">
            <SignInGoogle />
          </div>
          <div>สำหรับพนักงาน</div>
          <div className="flex basis-auto flex-col gap-2">
            <div className="">Username</div>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-md border border-gray-300 py-2 hover:shadow-md focus:shadow-md"
            />
            <div>รหัสผ่าน</div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-md border border-gray-300 px-5 py-2 hover:shadow-md focus:shadow-md"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={LoginHandle}
              className="rounded-lg bg-yellow-400 p-2 text-lg"
            >
              Login!
            </button>
            <button
              onClick={() => {
                window.location.href = '/'
              }}
              className="rounded-lg bg-green-400 p-2 text-lg text-white"
            >
              กลับไปหน้าหลัก
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Auth
