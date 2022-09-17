import React, { useCallback, useState } from 'react'
import { Input } from 'antd'
import { debounce } from 'lodash'
import PropTypes from 'prop-types'

function SearchMovie({ searchMovies }) {
  const [inputValue, setInputValue] = useState('')

  const debounceFn = useCallback(debounce(searchMovies, 1000), [])

  const handleChange = (event) => {
    setInputValue(event.target.value)
    debounceFn(event.target.value)
  }

  return <Input placeholder="Type to search..." value={inputValue} onChange={handleChange} />
}

SearchMovie.propTypes = {
  searchMovies: PropTypes.func.isRequired,
}

export default SearchMovie
