import React, { useCallback, useState } from 'react'
import { Input } from 'antd'
import { debounce } from 'lodash'

function SearchMovie({ searchMovies }) {
  const [inputValue, setInputValue] = useState('')

  const debounceFn = useCallback(debounce(searchMovies, 1000), [])

  function handleChange(event) {
    setInputValue(event.target.value)
    debounceFn(event.target.value)
  }

  return <Input placeholder="Type to search..." value={inputValue} onChange={handleChange} />
}

export default SearchMovie
