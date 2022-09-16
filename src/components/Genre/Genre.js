import React from 'react'
import { Tag } from 'antd'

import { MovieDBConsumer } from '../MovieDbContext'

import styles from './Genre.module.css'

function Genre({ genreIds }) {
  return (
    <MovieDBConsumer>
      {(genres) =>
        genreIds.map((id) => {
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
    </MovieDBConsumer>
  )
}

export default Genre
