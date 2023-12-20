import { PrimaryColumn } from "typeorm";


export class DefaultEntity {
    @PrimaryColumn('uuid')
    id: string
}