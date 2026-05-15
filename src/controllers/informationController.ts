import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import response from '../utils/response.js';
import { getBanners, getServices } from '../services/informationService.js';

const bannersGet: RequestHandler = async (req, res) => {
    const serviceResult = await getBanners();
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const bannersData = serviceResult.map((banner) => {
        return {
            banner_name: banner.name,
            banner_image: `${baseUrl}/${banner.image_path}`,
            description: banner.description,
        };
    });
    res.status(StatusCodes.OK).json(response.success('Sukses', bannersData));
};

const servicesGet: RequestHandler = async (req, res) => {
    const serviceResult = await getServices();
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const servicesData = serviceResult.map((service) => {
        return {
            service_code: service.code,
            service_name: service.name,
            service_icon: `${baseUrl}/${service.icon_path}`,
            service_tariff: service.tariff,
        };
    });
    res.status(StatusCodes.OK).json(response.success('Sukses', servicesData));
};

export { bannersGet, servicesGet };
