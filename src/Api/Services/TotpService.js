const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const { UserLogModel, RoleModel, PermissionModel, UserModel } = require('../Models/ModelOperator/DataModel');
// const models = require('../../Config/Database/centralModelLoader');

// const User = models.MAIN.User;
// const Role = models.MAIN.Role;
// const Permission = models.MAIN.Permission;

// const User = UserModel();
// const Role = RoleModel();
// const Permission = PermissionModel();

class TotpService {
    // function to get the User model
    async getUserModel() {
        const user = await UserModel('MEDSRV718079');
        if (!user) {
            throw new Error('UserLogModel is undefined or returned an invalid object.');
        }
        return user;
    }
    // function to get the Role model
    async getRoleModel() {
        const Role = await UserModel('MEDSRV718079');
        if (!Role) {
            throw new Error('getRoleModel is undefined or returned an invalid object.');
        }
        return Role;
    }
    // function to get the Permission model
    async getPermissionModel() {
        const Permission = await UserModel('MEDSRV718079');
        if (!Permission) {
            throw new Error('getPermissionModel is undefined or returned an invalid object.');
        }
        return Permission;
    }

    async generateTotp(userEmail) {
        const user = await User.findOne({
            where: { email: userEmail },
            include: [{
                model: Role,
                include:
                    [{
                        model: Permission
                    }]
            }]
        });

        const secret = speakeasy.generateSecret({ length: 50 });
        const otpauth = `otpauth://totp/${user}?secret=${secret.base32}&issuer=@ManishYelam$..!`;

        const qrCodeUrl = await qrcode.toDataURL(otpauth);

        return { secret: secret.base32, qrCodeUrl, };
    }

    verifyTotp(userToken, secret) {
        return speakeasy.totp.verify({
            secret,
            encoding: 'base32',
            token: userToken,
            window: 1,
        });
    }
}

module.exports = new TotpService();
