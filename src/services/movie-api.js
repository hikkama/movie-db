import axios from 'axios'

const apiBase = 'https://api.themoviedb.org/3/'
const apiKey = '8760b047c11ca2728369a82a322e1944'

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

export async function rateMovie(movieId, rate, guestSessionId) {
  try {
    const response = await axios.post(
      `${apiBase}movie/${movieId}/rating?api_key=${apiKey}&guest_session_id=${guestSessionId}`,
      {
        value: rate,
      }
    )
    return response
  } catch (error) {
    throw new Error(error)
  }
}

export async function getRatedMovies(guestSessionId, page = 1) {
  try {
    const response = await axios.get(
      `${apiBase}guest_session/${guestSessionId}/rated/movies?api_key=${apiKey}&language=en-US&page=${page}`
    )
    return response.data
  } catch (error) {
    throw new Error(error)
  }
}
