import { useEffect, useState } from 'react'
import { Spin, Alert } from 'antd'

import { getMovies, getPage, getGenres, createGuestSession } from './services/movie-api'
import MovieList from './components/MovieList'
import 'antd/dist/antd.min.css'
import './App.css'
import SearchMovie from './components/SearchMovie'
import TabPanel from './components/TabPanel'
import PaginationBlock from './components/PaginationBlock'
import { MovieDBProvider } from './components/MovieDbContext'

function App() {
  const [movies, setMovies] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [pages, setPages] = useState(0)
  const [results, setResults] = useState(0)
  const [search, setSearch] = useState('')
  const [genres, setGenres] = useState([])
  const [, setGuestSession] = useState(null)

  useEffect(() => {
    getMovies('return')
      .then((movies) => {
        setMovies(movies.results)
        setPages(movies.total_pages)
        setResults(movies.total_results)
        setLoading(false)
      })
      .catch((error) => setError(error))
  }, [])

  useEffect(() => {
    createGuestSession().then((res) => setGuestSession(res.guest_session_id))
    getGenres().then(({ genres }) => setGenres(genres))
  }, [])

  if (error) {
    return <Alert message={error.message} description="Description" type="error" showIcon />
  }

  const changePagesHandler = (search, page) => {
    setLoading(true)
    getPage(search, page)
      .then((movies) => {
        setMovies(movies.results)
        setLoading(false)
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
        setPages(movies.total_pages)
        setResults(movies.total_results)

        setLoading(false)
      })
      .catch((error) => setError(error))
  }
  return (
    <MovieDBProvider value={genres}>
      <div className="container">
        <TabPanel />
        <SearchMovie searchMovies={searchMoviesHandler} />
        {isLoading ? <Spin size="large" /> : <MovieList movies={movies} />}
        <PaginationBlock changePages={changePagesHandler} search={search} pages={pages} results={results} />
      </div>
    </MovieDBProvider>
  )
}

export default App
