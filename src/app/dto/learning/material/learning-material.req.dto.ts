import { FileDto } from "../../file/file.dto"

export interface LearningMaterialReqDto {

	learningMaterialTitle: string
	learningMaterialBody: string
	learnId: number
	files: FileDto[]
}
