import { Injectable } from "@nestjs/common";
import axios from "axios";
import { CreateFilmCommand } from "../features/film/domain/film";

export class SearchFilmModel {
    kinopoiskId: string
    title: string
    posterUrl: string
}

@Injectable()
export class KinopoiskAdapter {
    private apiV1: string = 'https://kinopoiskapiunofficial.tech/api/v2.1/films'
    private apiV2: string = 'https://kinopoiskapiunofficial.tech/api/v2.2/films'

    private config = {
        headers: {
            'X-API-KEY': String(process.env.KINOPISK_API_KEY),
            'Content-Type': 'application/json',
        },
    }

    constructor() { }

    async searchFilm(name: string): Promise<SearchFilmModel[] | []> {
        const res = await axios.get(`${this.apiV1}/search-by-keyword?keyword=${name}`, this.config)

        const films = res.data.films

        if (!films.length) return []

        return films.map(film => this._mapSearchFilm(film))
    }

    async findByFilmId(filmId: string): Promise<CreateFilmCommand | null> {
        console.log(filmId)
        const res = await axios.get(`${this.apiV2}/${filmId}`, this.config)
        const film = res.data

        if (!film) return null
        return this._mapFilm(film)
    }

    private _mapFilm(film): CreateFilmCommand {
        return {
            title: film.nameRu ?? film.nameEn,
            posterUrl: film.posterUrl,
            rating: film.ratingKinopoisk,
            genre: film.genres.map(genre => genre.genre),
            year: film.year,
            description: film.description,
            type: film.type,
            kinopoiskId: film.kinopoiskId
        }
    }

    private _mapSearchFilm(film): SearchFilmModel {
        return {
            kinopoiskId: film.filmId,
            title: film.nameRu ?? film.nameEn,
            posterUrl: film.posterUrlPreview
        }
    }
}