import { randomUUID } from "crypto"
import { DefaultEntity } from "../../../core/default.entity"
import { Column, Entity } from "typeorm"
import { FilmTypeEnum } from "./enum/film-type.enum"
import { FilmViewModel } from "../infrastructure/models/film-view.model"

export class CreateFilmCommand {
    constructor(
        public title: string,
        public posterUrl: string,
        public rating: string,
        public genre: string[],
        public year: string,
        public description: string,
        public type: "FILM" | "TV_SERIES",
        public kinopoiskId: string
    ) { }
}

@Entity()
export class Film extends DefaultEntity {

    @Column()
    kinopoinskId: string

    @Column()
    title: string

    @Column()
    posterUrl: string

    @Column()
    rating: string

    @Column('simple-array')
    genre: string[]

    @Column()
    year: string

    @Column()
    description: string

    @Column()
    type: "FILM" | "TV_SERIES"

    static create(command: CreateFilmCommand) {
        // TODO: пофиксить тип, возможно придется передать команду 
        const { title, description, genre, posterUrl, rating, type, year, kinopoiskId } = command
        const film = new Film()
        film.title = title
        film.description = description
        film.genre = genre
        film.id = randomUUID()
        film.posterUrl = posterUrl
        film.rating = rating
        film.type = type
        film.year = year
        film.kinopoinskId = kinopoiskId

        return film
    }
}

