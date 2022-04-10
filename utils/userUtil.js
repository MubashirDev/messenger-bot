const User = require('../models/user');

const isFirstMessage =async (userId) => {
    const user = await User.findOne({ where: { id: userId }});
    if(!user){
        return true;
    }
    return false;
}

const createUser =async (userId) => {
    await userModel.create({ id: userId })
}

module.exports = {
    isFirstMessage,
    createUser
}