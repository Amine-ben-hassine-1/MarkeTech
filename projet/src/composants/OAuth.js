import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { db } from '../firebase'
import { toast } from 'react-toastify'
import { FcGoogle } from 'react-icons/fc'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'

const OAuth = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const onGoogleAuthHandler = async () => {
    try {
      const auth = getAuth()
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      // Check if the user already exists in the database
      const docRef = doc(db, 'users', user.uid)
      const docSnap = await getDoc(docRef)

      // If user doesn't exist, create a new document in the users collection
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        })
      }

      navigate('/')
    } catch (error) {
      toast.error('Could not authorize with Google')
    }
  }

  return (
    <div>
      <h4>Sign {location.pathname === "/SignUp" ? 'Up' : 'In'} With
      <button onClick={onGoogleAuthHandler}>
        <FcGoogle />
      </button></h4>
    </div>
  )
}

export default OAuth
