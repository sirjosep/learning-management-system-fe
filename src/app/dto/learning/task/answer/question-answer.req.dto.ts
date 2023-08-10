import { QuestionAnswerDto } from "./question-answer.dto"

export interface QuestionAnswerReqDto {
	taskId: number
	answers: QuestionAnswerDto[]
}
