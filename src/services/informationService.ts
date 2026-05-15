import sequelize from '../configurations/sequelize.js';
import { QueryTypes } from 'sequelize';

type BannerData = {
    name: string;
    image_path: string;
    description: string;
};

const getBanners = async () => {
    const query = `
        select
            name,
            image_path,
            description
        from banners
        where deleted_on is null
    `;

    const bannersResult = await sequelize.query<BannerData>(query, { type: QueryTypes.SELECT });
    return bannersResult;
};

type ServiceData = {
    code: string;
    name: string;
    icon_path: string;
    tariff: string;
};

const getServices = async () => {
    const query = `
        select
            code,
            name,
            icon_path,
            tariff
        from services
        where deleted_on is null
    `;

    const servicesResult = await sequelize.query<ServiceData>(query, { type: QueryTypes.SELECT });
    return servicesResult;
};

export { getBanners, getServices };
