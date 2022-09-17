import React from 'react'

import Movie from '../Movie'

import styles from './MovieList.module.css'

function MovieList({ movies, guestSessionId }) {
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
    <h1>No results</h1>
  )
}

export default MovieList
