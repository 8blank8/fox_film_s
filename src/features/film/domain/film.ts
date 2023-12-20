import { randomUUID } from "crypto"
import { DefaultEntity } from "../../../core/default.entity"
import { Column, Entity } from "typeorm"

export class CreateFilmCommand {
    public title: string
    public posterUrl: string
    public rating: string
    public genre: string[]
    public year: string
    public decsription: string
    public type: FilmType
}

@Entity()
export class Film extends DefaultEntity {

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
    type: FilmType

    static create(command: CreateFilmCommand) {
        const film = new Film()
        film.title = command.title
        film.description = command.decsription
        film.genre = command.genre
        film.id = randomUUID()
        film.posterUrl = command.posterUrl
        film.rating = command.rating
        film.type = command.type
        film.year = command.year

        return film
    }
}

enum FilmType {
    FILM = 0,
    TV_SERIES = 1
}