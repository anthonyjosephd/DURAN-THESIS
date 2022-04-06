const expressJwt = require('express-jwt');
const secret = "1QW46ASex6Wda";

module.exports = authorize;

function authorize(roles = []) {

    if (typeof roles === 'string') {
        roles = [roles];
    }

    return [
        expressJwt({ secret, algorithms: ['HS256'] }),
        (req, res, next) => {
            if (roles.length && !roles.includes(req.user.role)) {
                return res.status(401).json({ message: ' Unauthorized'});
            }
            next();
        }
    ];
}