import { FileDto } from "src/app/dto/file/file.dto";
import { QuestionOptionDto } from "./question-option.dto";

export interface QuestionReqDto {
	questionCode: string
	questionBody: string
	taskId: number
	options: QuestionOptionDto[]
	files: FileDto[]
}
