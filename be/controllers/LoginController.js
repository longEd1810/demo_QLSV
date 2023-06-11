const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { comparePassword } = require('../services/hash');
const { findUser } = require('../services/CRUD');

dotenv.config();

const LoginController = async (req, res) => {
    const body = req.body;
    const user = await findUser(body);
    if (user) {
        const validPassword = await comparePassword(body.password, user.password);
        if (validPassword) {
            const access_token = jwt.sign(
                {
                    id: user.id,
                    role_symbol: user.role_symbol,
                },
                process.env.JWT_ACCESS_KEY,
                { expiresIn: '1d' },
            );
            const { password, ...others } = user;
            res.status(200).send({
                code: 200,

                ...others,
                access_token,
            });
        } else {
            res.status(200).send({
                code: 404,
                message: 'Invalid password',
            });
        }
    } else {
        return res.status(200).send({ code: 404, message: "User doesn't exist" });
    }
};

module.exports = LoginController;
