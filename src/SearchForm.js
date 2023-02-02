import React from 'react'
import { useGlobalContext } from './context'
function SearchForm() {
  const { query, handleSearch } = useGlobalContext();
  return (
    <form className='search-form' onSubmit={e => e.preventDefault()}>
      <h1>Search hacker news</h1>
      <input type='text' className='form-input' value={query} onChange={e => handleSearch(e.target.value)} />
    </form>
  )
}

export default SearchForm