import React, { useCallback, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Input } from 'antd'
import { debounce } from 'lodash'

function SearchMovie({ searchMovies }) {
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef()

  useEffect(() => inputRef.current.focus(), [])

  const debounceFn = useCallback(debounce(searchMovies, 1000), [])

  const handleChange = (event) => {
    setInputValue(event.target.value)
    debounceFn(event.target.value)
  }

  return <Input placeholder="Type to search..." ref={inputRef} value={inputValue} onChange={handleChange} />
}

SearchMovie.propTypes = {
  searchMovies: PropTypes.func.isRequired,
}

export default SearchMovie
