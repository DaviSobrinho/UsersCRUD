export class GetPermissionDTO {
    constructor(
        readonly id?: number,
        readonly permission?: string,
        readonly createdAt?: string,
        readonly updatedAt?: string,
        readonly flg_active?: boolean){
    }
}