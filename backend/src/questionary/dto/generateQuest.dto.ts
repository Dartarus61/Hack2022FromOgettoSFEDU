import { EOffice, EQuest } from "src/models/quest.model"

export class CreateQuestDto {
    readonly position: string
    readonly typeOfWork: EQuest
    readonly office: EOffice
    readonly city: string
    readonly fact: string
    userId:number
}