export interface LoginRequest{
    email: string;
    password: string;
}

export interface LoginResponsePayload{
    "accessToken": string;
    "expiresIn": string; // Date
    "refreshToken": string;
}