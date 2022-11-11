export interface StateLogIn {
    input: {
        email: string;
        password: string;
    },
    errors?: {
        [x: string]: unknown;
    },
    typeInput?: {
        [x: string]: unknown;
    }
}