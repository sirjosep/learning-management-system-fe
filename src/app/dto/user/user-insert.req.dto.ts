export interface UserInsertReqDto {
	email: string
	password: string
	roleId: number
	profileName: string
	profilePhone: string
	profileAddress: string
	file?: string
	fileFormat?: string
}
