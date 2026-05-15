import { z } from 'zod';
import sequelize from '../configurations/sequelize.js';
import { QueryTypes } from 'sequelize';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';
import error from '../utils/error.js';
import jwt from 'jsonwebtoken';
import { env } from '../configurations/envConfig.js';
import type {
    loginSchema,
    profileImageSchema,
    profileUpdateSchema,
    registrationSchema,
} from '../validations/membershipValidation.js';

const registration = async ({
    email,
    first_name,
    last_name,
    password,
}: z.infer<typeof registrationSchema>['body']) => {
    let query = `
        select id
        from users
        where
            email = ?
            and deleted_on is null
    `;

    const userResult = await sequelize.query(query, {
        replacements: [email],
        type: QueryTypes.SELECT,
    });

    if (userResult.length > 0) {
        throw error(StatusCodes.BAD_REQUEST, 103, 'Email sudah terpakai');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    query = `
        insert into users(email, password, first_name, last_name)
        values (?, ?, ?, ?)
    `;

    await sequelize.query(query, {
        replacements: [email, hashedPassword, first_name, last_name],
        type: QueryTypes.INSERT,
    });
};

type LoginData = {
    email: string;
    password: string;
};

const login = async ({ email, password }: z.infer<typeof loginSchema>['body']) => {
    const query = `
        select email, password
        from users
        where
            email = ?
            and deleted_on is null
    `;

    const userResult = await sequelize.query<LoginData>(query, {
        replacements: [email],
        type: QueryTypes.SELECT,
    });

    const userData = userResult[0];

    if (!userData) {
        throw error(StatusCodes.UNAUTHORIZED, 103, 'Email atau password salah');
    }

    const isPasswordMatch = await bcrypt.compare(password, userData.password);

    if (!isPasswordMatch) {
        throw error(StatusCodes.UNAUTHORIZED, 103, 'Email atau password salah');
    }

    const jwtPayload = {
        email: userData.email,
    };

    const token = jwt.sign(jwtPayload, env.APP_JWT_SECRET, {
        expiresIn: env.APP_JWT_EXPIRES_IN_SECONDS,
    });

    return { token };
};

type UserData = {
    email: string;
    first_name: string;
    last_name: string;
    image_path: string | null;
};

const getUserProfile = async (email: string) => {
    const query = `
        select
            email,
            first_name,
            last_name,
            image_path
        from users
        where
            email = ?
            and deleted_on is null
    `;

    const userResult = await sequelize.query<UserData>(query, {
        replacements: [email],
        type: QueryTypes.SELECT,
    });

    return userResult[0];
};

const updateUserProfile = async ({
    email,
    first_name,
    last_name,
}: z.infer<typeof profileUpdateSchema>['body'] & { email: string }) => {
    let query = `
        update users
        set
            first_name = ?,
            last_name = ?,
            updated_on = now()
        where email = ?
    `;

    await sequelize.query(query, {
        replacements: [first_name, last_name, email],
        type: QueryTypes.UPDATE,
    });

    query = `
        select
            email,
            first_name,
            last_name,
            image_path
        from users
        where
            email = ?
            and deleted_on is null
    `;

    const userResult = await sequelize.query<UserData>(query, {
        replacements: [email],
        type: QueryTypes.SELECT,
    });

    return userResult[0];
};

const updateUserImage = async ({
    email,
    file,
}: z.infer<typeof profileImageSchema> & { email: string }) => {
    let query = `
        update users
        set
            image_path = ?,
            updated_on = now()
        where email = ?
    `;

    await sequelize.query(query, {
        replacements: [file.filename, email],
        type: QueryTypes.UPDATE,
    });

    query = `
        select
            email,
            first_name,
            last_name,
            image_path
        from users
        where
            email = ?
            and deleted_on is null
    `;

    const userResult = await sequelize.query<UserData>(query, {
        replacements: [email],
        type: QueryTypes.SELECT,
    });

    return userResult[0];
};

export { registration, login, getUserProfile, updateUserProfile, updateUserImage };
