import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Image, Rate } from 'antd'

import shortenText from '../../utils/shortenText'
import formatDate from '../../utils/formatDate'
import Genre from '../Genre'
import { rateMovie } from '../../services/movie-api'
import Context from '../MovieDbContext'
import coverImg from '../../img/noposter.jpg'

import styles from './Movie.module.css'

function Movie({
  title,
  date = '',
  tags = [],
  overview = '',
  poster = null,
  vote = 0,
  id,
  guestSessionId = '',
  userRating = 0,
}) {
  const [rating, setRating] = useState(null)
  const { errorHandler } = useContext(Context)

  const voteClassHandler = (rate) => {
    let voteClass = styles.vote

    if (rate <= 3) voteClass += ` ${styles.red}`
    if (rate > 3 && rate <= 5) voteClass += ` ${styles.orange}`
    if (rate > 5 && rate <= 7) voteClass += ` ${styles.yellow}`
    if (rate > 7) voteClass += ` ${styles.green}`

    return voteClass
  }

  useEffect(() => {
    if (!rating) return

    rateMovie(id, rating, guestSessionId).catch((e) => errorHandler(e))

    sessionStorage.setItem(id, rating)
  }, [rating])

  return (
    <div className={styles.card}>
      <Image
        className={styles.cardImg}
        src={poster ? `https://image.tmdb.org/t/p/w500${poster}` : coverImg}
        alt={title}
      />
      <div className={styles.cardInfo}>
        <h2 className={styles.cardTitle}>{title}</h2>
        <time className={styles.cardDate}>{formatDate(date)}</time>
        <ul className={styles.cardTags}>
          <Genre genreIds={tags} />
        </ul>
        <p className={styles.cardText}>{shortenText(overview)}</p>
        <Rate
          value={userRating || rating || +sessionStorage.getItem(id)}
          onChange={setRating}
          className={styles.cardRate}
          count={10}
          allowHalf
        />
        <div className={voteClassHandler(vote)}>{vote.toString().length === 1 ? `${vote}.0` : vote.toFixed(1)}</div>
      </div>
    </div>
  )
}

Movie.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.number),
  overview: PropTypes.string,
  poster: PropTypes.string,
  vote: PropTypes.number,
  id: PropTypes.number.isRequired,
  guestSessionId: PropTypes.string,
  userRating: PropTypes.number,
}

export default Movie
