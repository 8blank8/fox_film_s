import { Module } from '@nestjs/common';
import { FilmService } from './application/film.service';
import { FilmController } from './api/film.controller';
import { CreateFilmUseCase } from './application/use-cases/create-film.use-case';
import { FilmRepository } from './infrastructure/film.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from './domain/film';

const useCases = [
  CreateFilmUseCase
]

@Module({
  imports: [
    TypeOrmModule.forFeature([Film])
  ],
  controllers: [FilmController],
  providers: [
    FilmService,
    FilmRepository,
    ...useCases
  ],
})
export class FilmModule { }
