import Banners from './banners.js';
import Services from './services.js';
import Users from './users.js';

const modelSync = async () => {
    Banners.belongsTo(Users, { foreignKey: 'created_by' });
    Banners.belongsTo(Users, { foreignKey: 'updated_by' });
    Banners.belongsTo(Users, { foreignKey: 'deleted_by' });

    Services.belongsTo(Users, { foreignKey: 'created_by' });
    Services.belongsTo(Users, { foreignKey: 'updated_by' });
    Services.belongsTo(Users, { foreignKey: 'deleted_by' });

    await Users.sync({ alter: true });
    await Banners.sync({ alter: true });
    await Services.sync({ alter: true });

    console.log('Model Successfully Synced');
};

export default modelSync;
