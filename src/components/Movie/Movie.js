/* eslint-disable no-unused-vars */
import React from 'react'
import { Card, Image, Typography, Rate } from 'antd'

import shortenText from '../../utils/shortenText'
import formatDate from '../../utils/formatDate'
import Genre from '../Genre'
import coverImg from '../../img/AvgrHw6YEehlNxVZNVDoVz2Huht.jpg'

import styles from './Movie.module.css'

const { Title, Paragraph } = Typography

function Movie({ title, date, tags, overview, poster, vote }) {
  let voteClass = styles.vote

  if (vote <= 3) voteClass += ` ${styles.red}`
  if (vote > 3 && vote <= 5) voteClass += ` ${styles.orange}`
  if (vote > 5 && vote <= 7) voteClass += ` ${styles.yellow}`
  if (vote > 7) voteClass += ` ${styles.green}`

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
        <Rate className={styles.cardRate} count={10} allowHalf />
        <div className={voteClass}>{vote.toString().length === 1 ? `${vote}.0` : vote}</div>
      </div>
    </div>
  )
}

function Movie2({ title, date, tags, overview, poster, vote }) {
  let voteClass = 'vote'

  if (vote <= 3) voteClass += ' red'
  if (vote > 3 && vote <= 5) voteClass += ' orange'
  if (vote > 5 && vote <= 7) voteClass += ' yellow'
  if (vote > 7) voteClass += ' green'

  return (
    <Card bordered={false}>
      <Image
        src={poster ? `https://image.tmdb.org/t/p/w500${poster}` : coverImg}
        alt={title}
        width={183}
        height={281}
      />
      <Title className="card-title" level={3}>
        {title}
      </Title>
      <h3 className="card-date">{formatDate(date)}</h3>
      <div className="card-tags">
        <Genre genreIds={tags} />
      </div>
      <Paragraph className="card-text">{shortenText(overview)}</Paragraph>
      <Rate className="card-rate" count={10} allowHalf />
      <div className={voteClass}>{vote.toString().length === 1 ? `${vote}.0` : vote}</div>
    </Card>
  )
}

export default Movie
