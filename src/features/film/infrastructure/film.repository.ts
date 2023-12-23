import { Injectable } from "@nestjs/common";
import { Film } from "../domain/film";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

interface IFilmRepository {
    save(film: Film): void
}

@Injectable()
export class FilmRepository implements IFilmRepository {
    constructor(@InjectRepository(Film) private filmRepo: Repository<Film>) { }

    async save(film: Film) {
        this.filmRepo.save(film)
    }

    async findById(filmId: string): Promise<Film | null> {
        const film = await this.filmRepo.findOneBy({ id: filmId })
        if (!film) return null
        return film
    }

}