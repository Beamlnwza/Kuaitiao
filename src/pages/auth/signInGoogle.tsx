import React from 'react'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../../firebase/firebase.config'

const SignInGoogle = () => {
  const provider = new GoogleAuthProvider()
  const signInGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      console.log(result.user)
    })
  }
  return <button onClick={signInGoogle}>Google</button>
}

export default SignInGoogle
