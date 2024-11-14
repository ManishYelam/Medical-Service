const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const models = require('../../Config/Database/centralModelLoader');

const User = models.MAIN.User;
const Role = models.MAIN.Role;
const Permission = models.MAIN.Permission;

class TotpService {
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
