export interface UpdateReviewReqDto {
	reviewId: number
	taskId: number
	studentId: number
	essayScore: number
	fileScore: number
	notes: string
}
