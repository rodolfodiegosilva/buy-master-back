const User = require('../model/User.model');
const UserData = require('../model/UserData.model');

const getAllUsers = async (req, res) => {
    const users = await User.find();
    if (!users) return res.status(204).json({'message': 'No users found'});
    res.json(users);
}

const deleteUser = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({"message": 'User ID required'});
    const user = await User.findOne({_id: req.body.id}).exec();
    if (!user) {
        return res.status(204).json({'message': `User ID ${req.body.id} not found`});
    }
    const result = await user.deleteOne({_id: req.body.id});
    res.json(result);
}

const getUser = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({"message": 'User ID required'});
    const user = await User.findOne({_id: req.params.id}).exec();
    if (!user) {
        return res.status(204).json({'message': `User ID ${req.params.id} not found`});
    }
    res.json(user);
}

const getMe = async (req, res) => {
    const username = req.user;
    if (!username) return res.status(400).json({"message": 'Username required'});
    const user = await User.findOne({username: username}).exec();
    const userData = await UserData.findOne({user: user._id}).exec();
    if (!user) {
        return res.status(204).json({'message': `Username ${req.params.username} not found`});
    }
    res.json({'user': user, 'userData': userData});
}

module.exports = {
    getAllUsers,
    deleteUser,
    getUser,
    getMe
}