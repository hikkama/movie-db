import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Tag } from 'antd'

import Context from '../MovieDbContext'

import styles from './Genre.module.css'

function Genre({ genreIds }) {
  const { genres } = useContext(Context)
  const filtered = genreIds.map((id) => genres.find((item) => item.id === id))

  return filtered.map(
    (tag) =>
      tag && (
        <li>
          <Tag className={styles.cardTag} key={tag.id}>
            {tag.name}
          </Tag>
        </li>
      )
  )
}

Genre.propTypes = {
  genreIds: PropTypes.arrayOf(PropTypes.number).isRequired,
}

export default Genre
