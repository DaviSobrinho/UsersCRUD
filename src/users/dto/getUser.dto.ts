export class GetUserDTO {
    constructor(
        readonly id?: number,
        readonly name?: string,
        readonly email?: string,
        readonly cpf?: string,
        readonly password?: string,
        readonly createdAt?: string,
        readonly updatedAt?: string,
        readonly id_permission?: number,
        readonly flg_active?: boolean){
    }
}