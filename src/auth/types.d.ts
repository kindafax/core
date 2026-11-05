export interface LoginTokenRequest {
    name: string,
    password: string,
    expiry: TokenDuration
}

export interface ErrorMessage {
    code: number,
    message: string
}

export type TokenDuration = 1 | 7 | 21;