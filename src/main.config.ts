import { INestApplication, ValidationPipe } from "@nestjs/common"

export const mainConfig = (app: INestApplication) => {
    app.useGlobalPipes(
        new ValidationPipe({ transform: true })
    )

    return app
}