import { useEffect, useMemo, useState } from 'react'
import { Spin, Alert, Tabs } from 'antd'

import { getMovies, getPage, getGenres, createGuestSession, getRatedMovies } from './services/movie-api'
import MovieList from './components/MovieList'
import SearchMovie from './components/SearchMovie'
import PaginationBlock from './components/PaginationBlock'
import Context from './components/MovieDbContext'

import 'antd/dist/antd.min.css'
import './App.css'
/*
 * Todo: - Add better design when no rated films /\ DONE
 *       - Add better design when no result in search /\ DONE
 *       - Поправить спинер при загрузке /\ DONE
 *       - Убирать pagination когда нет страниц /\ DONE
 *       - Проверить все файлы
 *       - Проверить дизайн и ТЗ
 *       - Сделать адаптацию
 */
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

    createGuestSession().then((res) => setGuestSession(res.guest_session_id))
    getGenres().then((res) => setGenres(res.genres))
  }, [])

  const errorHandler = (e) => {
    setError(e)
  }

  const changePagesHandler = (searchQuery, page) => {
    setLoading(true)
    getPage(search, page)
      .then((res) => {
        setMovies(res.results)
        setLoading(false)
      })
      .catch((err) => setError(err))
  }

  const changeRatedPagesHandler = (page) => {
    setLoading(true)
    getRatedMovies(guestSession, page)
      .then((res) => {
        setRatedMovies(res.results)
        setLoading(false)
        setRatedPage(page)
      })
      .catch((err) => setError(err))
  }

  const searchMoviesHandler = (query) => {
    setSearch(query)

    if (!query) {
      return
    }

    setLoading(true)
    getMovies(query)
      .then((res) => {
        setMovies(res.results)
        setResults(res.total_results)
        setLoading(false)
      })
      .catch((err) => setError(err))
  }

  const tabsOnChangeHandler = (activeKey) => {
    if (activeKey === 'rated') {
      if (!guestSession) {
        return
      }

      getRatedMovies(guestSession, ratedPage)
        .then((res) => {
          setRatedMovies(res.results)
          setRatedMoviesResults(res.total_results)
          setLoading(false)
        })
        .catch((err) => setError(err))
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

  const ratedComponent = (
    <>
      {!ratedMovies.length ? (
        <Alert description="Here will be your rated films" type="info" showIcon />
      ) : (
        <MovieList movies={ratedMovies} />
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
        <Tabs onChange={tabsOnChangeHandler} centered defaultActiveKey="1" items={tabsItems} />
      </div>
    </Context.Provider>
  )
}

export default App
