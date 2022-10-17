import { Optional } from "sequelize";

/**user types */
export interface UserAttributes {
    id: string;
    email: string;
    password: string;
    RolleId?: string;

    createdAt?: Date;
    updatedAt?: Date;
    deteledAt?: Date;
}

export interface UserInput extends Optional<UserAttributes, 'id'> { }
export interface UserOutput extends Required<UserAttributes> { }

/**Role types */
export interface RolleAttributes {
    id: string;
    rolle: string;
    description: string;

    createdAt?: Date;
    updatedAt?: Date;
    deletedAT?: Date;
}

export interface RollInput extends Optional<RolleAttributes, 'id'> { }
export interface RollOutput extends Required<RolleAttributes> { }