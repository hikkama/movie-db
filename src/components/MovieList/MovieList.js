import React from 'react'

import Movie from '../Movie'

import styles from './MovieList.module.css'

function MovieList({ movies, guestSessionId }) {
  return movies.length ? (
    <div className={styles.movieList}>
      {movies.map((movie) => {
        const { title, release_date, genre_ids, overview, poster_path, id, vote_average, rating } = movie
        return (
          <Movie
            title={title}
            date={release_date}
            tags={genre_ids}
            overview={overview}
            poster={poster_path}
            key={id}
            id={id}
            vote={vote_average}
            guestSessionId={guestSessionId}
            userRating={rating}
          />
        )
      })}
    </div>
  ) : (
    <h1>No results</h1>
  )
}

export default MovieList
