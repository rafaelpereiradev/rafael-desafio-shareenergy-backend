export class ApiError extends Error {
    public readonly statusCode: number | undefined
    constructor(message: string, statusCode: number) {
        super(message)
        this.statusCode =statusCode
    }

}

export class BadRequestError extends ApiError {
    constructor(message:string){
        super(message, 400)
    }
}
export class NotFoundError extends ApiError {
    constructor(message:string){
        super(message, 404)
    }
}
export class Unauthorized extends ApiError {
    constructor(message:string){
        super(message, 401)
    }
}

export class InternalServerError extends ApiError {
    constructor(message:string){
        super(message, 500)
    }
}
export class ConflictError extends ApiError {
    constructor(message:string){
        super(message, 409)
    }
}