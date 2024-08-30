import axios from "axios"

import { genreArray } from "../helpers/genre.helper.js"

export class SearchService {
  async getAllInformation (films) {
    const filmInfomation = []
    for (const film of films.results) {
      const getInfoConfig = {
        method: 'GET',
        url: `${process.env.TMDB_API}movie/${film.id}?language=es-CO`,
        headers: {
          'Authorization': `Bearer ${process.env.TMDB_API_TOKEN}`
        }
      }
      try {
        const { data } = await axios.request(getInfoConfig)
        const genre = {
          nombre: data.genres[0].name,
          description: '',
          status: 'activo'
        }
      } catch (error) {
        console.log(error.message)
        continue
      }
    }
  }

  async search (query) {
    const dataConfig = {
      method: 'GET',
      url: `${process.env.TMDB_API}search/movie?query=${encodeURI(query)}&language=es-CO`,
      headers: {
        'Authorization': `Bearer ${process.env.TMDB_API_TOKEN}`
      }
    }
    console.log(dataConfig)
    try {
      const { data } = await axios.request(dataConfig)
      if(data) return data
      return []
    } catch (error) {
      throw new Error(error.message)
    }
  }
}