import { FileDto } from "src/app/dto/file/file.dto";
import { QuestionOptionDto } from "./question-option.dto";

export interface QuestionResDto {
	id: number
	questionCode: string
	questionBody: string
	options: QuestionOptionDto[]
	fileIds: number[]
}
