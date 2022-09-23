import { useEffect, useMemo, useState } from 'react'
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
  const [results, setResults] = useState(0)
  const [ratedMovies, setRatedMovies] = useState([])
  const [ratedMoviesResults, setRatedMoviesResults] = useState(0)
  const [ratedPage, setRatedPage] = useState(1)

  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [guestSession, setGuestSession] = useState(null)

  const [search, setSearch] = useState('return')
  const [genres, setGenres] = useState([])

  // Search with return query, create guest session & get genres from api at the mounting of app
  useEffect(() => {
    getMovies(search)
      .then((res) => {
        setMovies(res.results)
        setResults(res.total_results)
        setLoading(false)
      })
      .catch((err) => setError(err))

    createGuestSession()
      .then((res) => setGuestSession(res.guest_session_id))
      .catch((err) => setError(err))
    getGenres()
      .then((res) => setGenres(res.genres))
      .catch((err) => setError(err))
  }, [])

  const errorHandler = (e) => {
    setError(e)
  }

  const changePagesHandler = async (searchQuery, page) => {
    setLoading(true)
    try {
      const res = await getPage(search, page)
      setMovies(res.results)
    } catch (e) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }

  const changeRatedPagesHandler = async (page) => {
    setLoading(true)
    try {
      const res = await getRatedMovies(guestSession, page)
      setRatedMovies(res.results)
      setRatedPage(page)
    } catch (e) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }

  const searchMoviesHandler = async (query) => {
    setSearch(query)
    if (!query) return
    setLoading(true)

    try {
      const res = await getMovies(query)
      setMovies(res.results)
      setResults(res.total_results)
    } catch (e) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }

  const changeTabsHandler = async (activeKey) => {
    if (activeKey !== 'rated' || !guestSession) return
    setLoading(true)

    try {
      const res = await getRatedMovies(guestSession, ratedPage)
      setRatedMovies(res.results)
      setRatedMoviesResults(res.total_results)
    } catch (e) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }

  const searchComponent = (
    <>
      <SearchMovie searchMovies={searchMoviesHandler} />
      {isLoading ? (
        <div className="spin-wrapper">
          <Spin size="large" />
        </div>
      ) : (
        <MovieList movies={movies} guestSessionId={guestSession} />
      )}
      {results > 19 && <PaginationBlock changePages={changePagesHandler} search={search} results={results} />}
    </>
  )

  const ratedMovieListHandler = !ratedMovies.length ? (
    <Alert description="Here will be your rated films" type="info" showIcon />
  ) : (
    <MovieList movies={ratedMovies} guestSessionId={guestSession} />
  )

  const ratedComponent = (
    <>
      {isLoading ? (
        <div className="spin-wrapper">
          <Spin size="large" />
        </div>
      ) : (
        ratedMovieListHandler
      )}
      {ratedMoviesResults > 19 && (
        <PaginationBlock changePages={changeRatedPagesHandler} results={ratedMoviesResults} />
      )}
    </>
  )

  const tabsItems = [
    { label: 'Search', key: 'search', children: searchComponent },
    { label: 'Rated', key: 'rated', children: ratedComponent },
  ]

  const contextProviderValue = useMemo(() => ({ genres, errorHandler }), [genres])

  if (error) {
    return (
      <div className="container">
        <Alert
          message="Please refresh the page and try again later"
          description={error.message}
          type="error"
          showIcon
        />
      </div>
    )
  }

  return (
    <Context.Provider value={contextProviderValue}>
      <div className="container">
        <Tabs onChange={changeTabsHandler} centered defaultActiveKey="1" items={tabsItems} />
      </div>
    </Context.Provider>
  )
}

export default App
