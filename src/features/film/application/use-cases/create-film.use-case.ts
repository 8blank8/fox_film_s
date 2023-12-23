import { CommandHandler } from "@nestjs/cqrs";
import { CreateFilmCommand, Film } from "../../domain/film";
import { FilmRepository } from "../../infrastructure/film.repository";
import { KinopoiskAdapter } from "../../../../adapter/kinopoisk.adapter";


@CommandHandler(CreateFilmCommand)
export class CreateFilmUseCase {
    constructor(
        private filmRepo: FilmRepository,
    ) { }

    async execute(dto: CreateFilmCommand): Promise<string> {
        const film = Film.create(dto)
        this.filmRepo.save(film)

        return film.kinopoinskId
    }
}