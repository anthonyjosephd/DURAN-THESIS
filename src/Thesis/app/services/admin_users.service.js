const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const AdminUsers = require('../models/admin_users');
const secret = "1QW46ASex6Wda";
module.exports = {
    authenticate,
    create
}

async function authenticate({ username, password }) {
    const user = await AdminUsers.scope('withHash').findOne({ where : { username } });

    if(!user || !(await bcrypt.compare(password, user.hash)))
        throw 'Username or password is incorrect';

    const token = jwt.sign({ sub: user.id }, secret, {expiresIn: '1h' });
    return { ...omitHash(user.get()), token };
}

async function  create(requestBody) {
    if (await AdminUsers.findOne({ where: { username: requestBody.username } })) {
        throw `Username: ${requestBody.username} is already taken`;
    }

    console.log(requestBody.password);
    if (requestBody.password) {
        requestBody.hash = await bcrypt.hash(requestBody.password, 10);
    }
    console.log(requestBody.hash);

    await AdminUsers.create(requestBody);
}

function omitHash(user) {
    console.log(user);
    const { hash, ...userWithoutHash } = user;
    return userWithoutHash;
}