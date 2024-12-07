import React from 'react'
import H from './H'
import F from './F'
const L = (   {children}) => {
  return (
    <>
    <H/>
    <main style={{minHeight:"80vh"}}> 
   {children}
      </main>
      <F/>
    </>
  )
}

export default L
