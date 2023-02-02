import React from 'react'
import { useGlobalContext } from './context'

function Buttons() {
  const { page, isLoading, nbPages, handlePage } = useGlobalContext();
  return (
    <div className='btn-container'>
      <button className='btn'
        disabled={isLoading}
        onClick={() => handlePage('dec')}>
        prev
      </button>
      <span>{page + 1} of {nbPages}</span>
      <button className='btn'
        disabled={isLoading}
        onClick={() => handlePage('inc')}>
        next
      </button>
    </div>
  )
}

export default Buttons