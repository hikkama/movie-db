import axios from 'axios'

const apiBase = 'https://api.themoviedb.org/3/'
const apiKey = '8760b047c11ca2728369a82a322e1944'
// https://api.themoviedb.org/3/search/movie
// ?api_key=8760b047c11ca2728369a82a322e1944&language=en-US&query=return&page=1&include_adult=false
// const client = axios.create({
//   baseURL: 'https://api.themoviedb.org/3/search/movie?api_key=8760b047c11ca2728369a82a322e1944&language=en-US&query=',
// })

export async function getMovies(query) {
  try {
    const response = await axios.get(`${apiBase}search/movie?api_key=${apiKey}&language=en-US&query=${query}`)
    return response.data
  } catch (error) {
    throw new Error(error)
  }
}

export async function getPage(query, page) {
  try {
    const response = await axios.get(
      `${apiBase}search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=${page}`
    )
    return response.data
  } catch (error) {
    throw new Error(error)
  }
}

export async function getGenres() {
  try {
    const response = await axios.get(`${apiBase}genre/movie/list?api_key=${apiKey}&language=en-US`)
    return response.data
  } catch (error) {
    throw new Error(error)
  }
}

export async function createGuestSession() {
  try {
    const response = await axios.get(`${apiBase}authentication/guest_session/new?api_key=${apiKey}`)
    return response.data
  } catch (error) {
    throw new Error(error)
  }
}
