import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { FilmQueryRepository } from '../infrastructure/film.query.repository';
import { CommandBus } from '@nestjs/cqrs';
import { CreateFilmCommand } from '../domain/film';
import { KinopoiskAdapter } from '../../../adapter/kinopoisk.adapter';

interface IFilmController {
  createFilm(createFilmCommand: CreateFilmCommand): void
  findById(id: string): void
}

@Controller('film')
export class FilmController implements IFilmController {
  constructor(
    private filmQueryRepo: FilmQueryRepository,
    private commandBus: CommandBus,
    private kinoposikAdapter: KinopoiskAdapter
  ) { }

  @Get('search')
  async searchFilm(@Query() queryParam) {
    const films = await this.kinoposikAdapter.searchFilm(queryParam.name)
    return films
  }

  @Get('/:filmId')
  async findById(@Param('filmId') filmId: string) {
    let film = await this.filmQueryRepo.findByKinopoiskId(filmId)
    console.log(filmId, 'in controller')
    if (!film) {
      const kinopoiskFilm = await this.kinoposikAdapter.findByFilmId(filmId)
      if (!kinopoiskFilm) return null

      const { title, description, genre, kinopoiskId, posterUrl, rating, type, year } = kinopoiskFilm
      const createdKinopoiskId = await this.commandBus.execute(
        new CreateFilmCommand(
          title,
          posterUrl,
          rating,
          genre,
          year,
          description,
          type,
          kinopoiskId
        )
      )

      film = await this.filmQueryRepo.findByKinopoiskId(createdKinopoiskId)
    }
    return film
  }

  @Post()
  async createFilm(
    @Body() createFilmCommand: CreateFilmCommand
  ) {
    const filmId = await this.commandBus.execute(createFilmCommand)
    const film = await this.filmQueryRepo.findByKinopoiskId(filmId)
    return film
  }

}
