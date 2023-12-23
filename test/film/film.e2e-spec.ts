import { INestApplication } from "@nestjs/common"
import { createApp } from "../create-app"
import { clearDatabase } from "../utils/clear-database"
import { FilmTest } from "./film.t"
import { SearchFilmModel } from "../../src/adapter/kinopoisk.adapter"


describe('film', () => {
    let app: INestApplication
    let film: FilmTest

    beforeAll(async () => {
        app = await createApp()
        film = new FilmTest(app)

        await clearDatabase(app)
    })

    describe('check film', () => {
        let searchFilm: SearchFilmModel[]

        it('search film, should be status 200', async () => {
            const films = await film.searchFIlm('атака титанов')
            searchFilm = films
        })

        it('find search film by id, should be status 200', async () => {
            console.log(searchFilm[0].kinopoiskId, 'in tests')
            await film.findById(searchFilm[0].kinopoiskId)
        })
    })

})