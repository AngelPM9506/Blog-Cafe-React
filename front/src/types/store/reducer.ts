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

export interface Proyect {
    id?: string,
    name?: string,
    description?: string,
    image?: string,
    date?: string | Date,
    gitrepo?: string,
    deployurl?: string | null,
    createdAt?: string | Date,
    updatedAt?: string | Date
}

export interface ProjetsState {
    project?: Proyect,
    projects?: Proyect[],
    status?: 'success' | 'error' | 'loading'
}