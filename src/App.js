import { useEffect, useState } from 'react'
import { Spin, Alert, Tabs } from 'antd'

import { getMovies, getPage, getGenres, createGuestSession, getRatedMovies } from './services/movie-api'
import MovieList from './components/MovieList'
import SearchMovie from './components/SearchMovie'
import PaginationBlock from './components/PaginationBlock'
import Context from './components/MovieDbContext'

import 'antd/dist/antd.min.css'
import './App.css'

function App() {
  const [movies, setMovies] = useState([])
  const [ratedMovies, setRatedMovies] = useState([])
  const [ratedMoviesResults, setRatedMoviesResults] = useState(0)
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [results, setResults] = useState(0)
  const [search, setSearch] = useState('return')
  const [genres, setGenres] = useState([])
  const [guestSession, setGuestSession] = useState(null)
  const [ratedPage, setRatedPage] = useState(1)

  useEffect(() => {
    getMovies(search)
      .then((movies) => {
        setMovies(movies.results)
        setResults(movies.total_results)
        setLoading(false)
      })
      .catch((error) => setError(error))
  }, [])

  useEffect(() => {
    createGuestSession().then((res) => setGuestSession(res.guest_session_id))
    getGenres().then(({ genres }) => setGenres(genres))
  }, [])

  const changePagesHandler = (search, page) => {
    setLoading(true)
    getPage(search, page)
      .then((movies) => {
        setMovies(movies.results)
        setLoading(false)
      })
      .catch((error) => setError(error))
  }

  const changeRatedPagesHandler = (page) => {
    setLoading(true)
    getRatedMovies(guestSession, page)
      .then((movies) => {
        setRatedMovies(movies.results)
        setLoading(false)
        setRatedPage(page)
      })
      .catch((error) => setError(error))
  }

  const searchMoviesHandler = (query) => {
    setSearch(query)

    if (!query) {
      return
    }

    setLoading(true)

    getMovies(query)
      .then((movies) => {
        setMovies(movies.results)
        setResults(movies.total_results)
        setLoading(false)
      })
      .catch((error) => setError(error))
  }

  if (error) {
    return <Alert message={error.message} description="Description" type="error" showIcon />
  }

  const tabsOnChangeHandler = (activeKey) => {
    if (activeKey === 'rated') {
      if (!guestSession) {
        return
      }
      getRatedMovies(guestSession, ratedPage)
        .then((movies) => {
          setRatedMovies(movies.results)
          setRatedMoviesResults(movies.total_results)
          setLoading(false)
        })
        .catch((error) => setError(error))
    }
  }

  const searchComponent = (
    <>
      <SearchMovie searchMovies={searchMoviesHandler} />
      {isLoading ? <Spin size="large" /> : <MovieList movies={movies} guestSessionId={guestSession} />}
      <PaginationBlock changePages={changePagesHandler} search={search} results={results} />
    </>
  )

  const ratedComponent = (
    <>
      {!ratedMovies.length ? <h1>Rate films</h1> : <MovieList movies={ratedMovies} />}
      {ratedMoviesResults > 19 && (
        <PaginationBlock changePages={changeRatedPagesHandler} results={ratedMoviesResults} />
      )}
    </>
  )

  const items = [
    { label: 'Search', key: 'search', children: searchComponent },
    { label: 'Rated', key: 'rated', children: ratedComponent },
  ]

  return (
    <Context.Provider value={{ genres }}>
      <div className="container">
        <Tabs onChange={tabsOnChangeHandler} centered defaultActiveKey="1" items={items} />
      </div>
    </Context.Provider>
  )
}

export default App
