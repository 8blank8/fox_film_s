import { Controller } from '@nestjs/common';
import { FilmService } from '../application/film.service';

@Controller('film')
export class FilmController {
  constructor(private readonly filmService: FilmService) {

  }
}
