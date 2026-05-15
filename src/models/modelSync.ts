import Banners from './Banners.js';
import Services from './Services.js';
import UserBalances from './userBalances.js';
import Users from './Users.js';

const modelSync = async () => {
    UserBalances.belongsTo(Users, { foreignKey: 'user_id' });
    UserBalances.belongsTo(Users, { foreignKey: 'created_by' });
    UserBalances.belongsTo(Users, { foreignKey: 'updated_by' });
    UserBalances.belongsTo(Users, { foreignKey: 'deleted_by' });

    Banners.belongsTo(Users, { foreignKey: 'created_by' });
    Banners.belongsTo(Users, { foreignKey: 'updated_by' });
    Banners.belongsTo(Users, { foreignKey: 'deleted_by' });

    Services.belongsTo(Users, { foreignKey: 'created_by' });
    Services.belongsTo(Users, { foreignKey: 'updated_by' });
    Services.belongsTo(Users, { foreignKey: 'deleted_by' });

    await Users.sync({ alter: true });
    await UserBalances.sync({ alter: true });
    await Banners.sync({ alter: true });
    await Services.sync({ alter: true });

    console.log('Model Successfully Synced');
};

export default modelSync;
