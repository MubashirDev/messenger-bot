const User = require('../models/user');

const isFirstMessage =async (userId) => {
    return User.findOne({
        where: {
            id: userId
        }
    }).then((user) => {
        if (user) {
            return true;
        }
        return false;
    });
}

const createUser =async (userId) => {
    await userModel.create({ id: userId })
}

module.exports = {
    isFirstMessage,
    createUser
}