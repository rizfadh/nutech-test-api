import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import response from '../utils/response.js';
import {
    getUserProfile,
    login,
    registration,
    updateUserImage,
    updateUserProfile,
} from '../services/membershipService.js';

const registrationPost: RequestHandler = async (req, res) => {
    await registration(req.body);
    res.status(StatusCodes.OK).json(response.success('Registrasi berhasil silahkan login', null));
};

const loginPost: RequestHandler = async (req, res) => {
    const serviceResult = await login(req.body);
    res.status(StatusCodes.OK).json(response.success('Login Sukses', serviceResult));
};

const profileGet: RequestHandler = async (req, res) => {
    const serviceResult = await getUserProfile(req.user.email);
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const userData = {
        email: serviceResult?.email,
        first_name: serviceResult?.first_name,
        last_name: serviceResult?.last_name,
        profile_image: serviceResult?.image_path ? `${baseUrl}/${serviceResult.image_path}` : null,
    };
    res.status(StatusCodes.OK).json(response.success('Sukses', userData));
};

const profileUpdatePut: RequestHandler = async (req, res) => {
    const serviceResult = await updateUserProfile({ email: req.user.email, ...req.body });
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const userData = {
        email: serviceResult?.email,
        first_name: serviceResult?.first_name,
        last_name: serviceResult?.last_name,
        profile_image: serviceResult?.image_path ? `${baseUrl}/${serviceResult.image_path}` : null,
    };
    res.status(StatusCodes.OK).json(response.success('Update Pofile berhasil', userData));
};

const profileImagePut: RequestHandler = async (req, res) => {
    const serviceResult = await updateUserImage({
        email: req.user.email,
        file: req.file as Express.Multer.File,
    });
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const userData = {
        email: serviceResult?.email,
        first_name: serviceResult?.first_name,
        last_name: serviceResult?.last_name,
        profile_image: serviceResult?.image_path ? `${baseUrl}/${serviceResult.image_path}` : null,
    };
    res.status(StatusCodes.OK).json(response.success('Update Profile Image berhasil', userData));
};

export { registrationPost, loginPost, profileGet, profileUpdatePut, profileImagePut };
