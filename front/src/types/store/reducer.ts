export interface LoginState {
    token: string;
    dataUser: {
        Id: string;
        Email: string;
        Rolle: 'Admin' | 'User' | '';
    },
    status?: 'success' | 'error' | 'loading';
    errors?: any;
}

export interface prueba {
    count: number,
    status: 'sucess' | 'loading' | 'error'
}