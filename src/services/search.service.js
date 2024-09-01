import axios from "axios"

import { genreArray, producerRandomDescription, directors } from "../helpers/genre.helper.js"

export class SearchService {
  async getAllInformation(films) {
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
          description: genreArray.find(genre => genre.id === data.genres[0].id).description,
          status: 'activo'
        }
        const randomIndexProducer = Math.floor(Math.random() * producerRandomDescription.length)
        const producer = {
          name: data.production_companies[0].name,
          status: 'activo',
          slogan: producerRandomDescription[randomIndexProducer].slogan,
          description: producerRandomDescription[randomIndexProducer].description
        }
        const randomIndexDirector = Math.floor(Math.random() * directors.length)
        const director = {
          name: directors[randomIndexDirector].name,
          status: 'activo'
        }
        const type = { name: 'pelicula', status: 'activo' }
        const filmData = {
          serial: data.id,
          title: data.title,
          synopsis: data.overview,
          url: `https://film-iudigital.com/info-film/${data.id}`,
          coverImage: `https://image.tmdb.org/t/p/original${data.poster_path}`,
          status: 'activo',
          type,
          genre,
          producer,
          director
        }
        filmInfomation.push(filmData)
      } catch (error) {
        console.log(error.message)
        continue
      }
    }
    return filmInfomation
  }

  async search(query) {
    const dataConfig = {
      method: 'GET',
      url: `${process.env.TMDB_API}search/movie?query=${encodeURI(query)}&language=es-CO`,
      headers: {
        'Authorization': `Bearer ${process.env.TMDB_API_TOKEN}`
      }
    }
    try {
      const { data } = await axios.request(dataConfig)
      if (data) return this.getAllInformation(data)
      return []
    } catch (error) {
      throw new Error(error.message)
    }
  }
}