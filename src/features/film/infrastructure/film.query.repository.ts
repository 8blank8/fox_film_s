import { Injectable } from "@nestjs/common";
import { Film } from "../domain/film";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FilmViewModel } from "./models/film-view.model";
import { getKeyByValue } from "../../../utils/get-key-by-value";
import { FilmTypeEnum } from "../domain/enum/film-type.enum";

interface IFilmQueryRepository {
    findByKinopoiskId(id: string): void
}

@Injectable()
export class FilmQueryRepository implements IFilmQueryRepository {
    constructor(@InjectRepository(Film) private filmRepo: Repository<Film>) { }

    async findByKinopoiskId(id: string): Promise<FilmViewModel | null> {
        const film = await this.filmRepo.findOneBy({ kinopoinskId: id })
        if (!film) return null

        return this._mapFilm(film)
    }

    private _mapFilm(film: Film): FilmViewModel {
        return {
            title: film.title,
            posterUrl: film.posterUrl,
            rating: film.rating,
            genre: film.genre,
            year: film.year,
            description: film.description,
            type: film.type,
            id: film.id,
            kinopoiskId: film.kinopoinskId
        }
    }
}