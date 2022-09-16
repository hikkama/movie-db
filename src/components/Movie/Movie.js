import React, { useEffect, useState } from 'react'
import { Image, Rate } from 'antd'

import shortenText from '../../utils/shortenText'
import formatDate from '../../utils/formatDate'
import Genre from '../Genre'
import coverImg from '../../img/AvgrHw6YEehlNxVZNVDoVz2Huht.jpg'
import { rateMovie } from '../../services/movie-api'

import styles from './Movie.module.css'

function Movie({ title, date, tags, overview, poster, vote, id, guestSessionId, userRating }) {
  const [rating, setRating] = useState(null)

  let voteClass = styles.vote

  if (vote <= 3) voteClass += ` ${styles.red}`
  if (vote > 3 && vote <= 5) voteClass += ` ${styles.orange}`
  if (vote > 5 && vote <= 7) voteClass += ` ${styles.yellow}`
  if (vote > 7) voteClass += ` ${styles.green}`

  useEffect(() => {
    if (rating) {
      rateMovie(id, rating, guestSessionId)
        .then((res) => res)
        .catch((error) => console.error(error))
    }
  }, [rating])

  return (
    <div className={styles.card}>
      <Image
        className={styles.cardImg}
        src={poster ? `https://image.tmdb.org/t/p/w500${poster}` : coverImg}
        alt={title}
        width={183}
      />
      <div className={styles.cardInfo}>
        <h2 className={styles.cardTitle}>{title}</h2>
        <h3 className={styles.cardDate}>{formatDate(date)}</h3>
        <div>
          <Genre genreIds={tags} />
        </div>
        <p className={styles.cardText}>{shortenText(overview)}</p>
        <Rate
          value={userRating || rating}
          onChange={(event) => {
            setRating(event)
          }}
          className={styles.cardRate}
          count={10}
          allowHalf
        />
        <div className={voteClass}>{vote.toString().length === 1 ? `${vote}.0` : vote.toFixed(1)}</div>
      </div>
    </div>
  )
}

export default Movie
