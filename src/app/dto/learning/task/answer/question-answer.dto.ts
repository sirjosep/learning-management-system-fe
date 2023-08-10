import { FileDto } from "src/app/dto/file/file.dto"

export interface QuestionAnswerDto {

	questionId: number
	questionOptions: number
	questionAnswer: string
	answerFiles: FileDto[]
}
