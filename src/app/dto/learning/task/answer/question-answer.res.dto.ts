import { FileDto } from "src/app/dto/file/file.dto"

export interface QuestionAnswerResDto {
	id: number
	studentName: string
	questionAnswer: string
	questionOptions: string
	fileIds: number[]
}
