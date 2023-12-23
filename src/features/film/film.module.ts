import { Module } from '@nestjs/common';
import { FilmService } from './application/film.service';
import { FilmController } from './api/film.controller';
import { CreateFilmUseCase } from './application/use-cases/create-film.use-case';
import { FilmRepository } from './infrastructure/film.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from './domain/film';
import { FilmQueryRepository } from './infrastructure/film.query.repository';
import { CqrsModule } from '@nestjs/cqrs';
import { KinopoiskAdapter } from '../../adapter/kinopoisk.adapter';

const useCases = [
  CreateFilmUseCase
]

@Module({
  imports: [
    TypeOrmModule.forFeature([Film]),
    CqrsModule
  ],
  controllers: [FilmController],
  providers: [
    FilmService,
    FilmRepository,
    FilmQueryRepository,
    KinopoiskAdapter,
    ...useCases
  ],
})
export class FilmModule { }
