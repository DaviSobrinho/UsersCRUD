export class JWTDTO {
    constructor(
        readonly id: number,
        readonly email: string,
        readonly permission: number
    ) {}
}