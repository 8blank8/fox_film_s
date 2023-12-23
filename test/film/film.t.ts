import { HttpStatus, INestApplication } from "@nestjs/common";
import { FilmTypeEnum } from "../../src/features/film/domain/enum/film-type.enum";
import { CreateFilmCommand } from "../../src/features/film/domain/film";
import { FilmViewModel } from "../../src/features/film/infrastructure/models/film-view.model";
import * as request from 'supertest'
import { getKeyByValue } from "../../src/utils/get-key-by-value";
import { SearchFilmModel } from "../../src/adapter/kinopoisk.adapter";

export class FilmTest {
    constructor(private app: INestApplication) { }

    // async createFilm(dto: CreateFilmCommand): Promise<FilmViewModel> {
    //     const res = await request(this.app.getHttpServer())
    //         .post('/film')
    //         .send(dto)

    //     expect(res.status).toBe(HttpStatus.CREATED)
    //     expect(res.body).toEqual({
    //         ...dto,
    //         type: getKeyByValue(FilmTypeEnum, dto.type),
    //         id: expect.any(String)
    //     })

    //     return res.body
    // }

    async findById(id: string) {
        const res = await request(this.app.getHttpServer())
            .get(`/film/${id}`)

        const dto: FilmViewModel = {
            title: expect.any(String),
            posterUrl: expect.any(String),
            rating: expect.any(String),
            genre: expect.any(Array),
            year: expect.any(String),
            description: expect.any(String),
            type: expect.any(String),
            id: expect.any(String),
            kinopoiskId: expect.any(String)
        }

        expect(res.status).toBe(HttpStatus.OK)
        expect(res.body).toEqual({
            ...dto
        })
    }

    async searchFIlm(name: string): Promise<SearchFilmModel[]> {
        const res = await request(this.app.getHttpServer())
            .get('/film/search')
            .query({ name: name })

        expect(res.status).toBe(HttpStatus.OK)
        expect(res.body).not.toBeNull()
        expect(res.body).not.toBeUndefined()

        return res.body
    }
}