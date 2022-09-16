import React, { useContext } from 'react'
import { Tag } from 'antd'

import Context from '../MovieDbContext'

import styles from './Genre.module.css'

function Genre({ genreIds }) {
  const { genres } = useContext(Context)

  return genreIds.map((id) => {
    const genre = genres.find((item) => item.id === id)
    if (!genre) {
      return null
    }
    return (
      <Tag className={styles.cardTag} key={id}>
        {genre.name}
      </Tag>
    )
  })
}

export default Genre
