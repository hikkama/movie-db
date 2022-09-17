import React from 'react'
import PropTypes from 'prop-types'
import { Alert } from 'antd'

import Movie from '../Movie'

import styles from './MovieList.module.css'

function MovieList({ movies, guestSessionId = '' }) {
  return movies.length ? (
    <div className={styles.movieList}>
      {movies.map((movie) => {
        const {
          title,
          release_date: releaseDate,
          genre_ids: genreIds,
          overview,
          poster_path: posterPath,
          id,
          vote_average: voteAverage,
          rating,
        } = movie
        return (
          <Movie
            title={title}
            date={releaseDate}
            tags={genreIds}
            overview={overview}
            poster={posterPath}
            key={id}
            id={id}
            vote={voteAverage}
            guestSessionId={guestSessionId}
            userRating={rating}
          />
        )
      })}
    </div>
  ) : (
    <div className={styles.alertWrapper}>
      <Alert message="Warning" description="There is no result on this query" type="warning" showIcon />
    </div>
  )
}

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      adult: PropTypes.bool,
      backdrop_path: PropTypes.string,
      genre_ids: PropTypes.arrayOf(PropTypes.number),
      id: PropTypes.number,
      original_language: PropTypes.string,
      original_title: PropTypes.string,
      overview: PropTypes.string,
      popularity: PropTypes.number,
      poster_path: PropTypes.string,
      release_date: PropTypes.string,
      title: PropTypes.string,
      video: PropTypes.bool,
      vote_average: PropTypes.number,
      vote_count: PropTypes.number,
    }).isRequired
  ).isRequired,
  guestSessionId: PropTypes.string,
}

export default MovieList
