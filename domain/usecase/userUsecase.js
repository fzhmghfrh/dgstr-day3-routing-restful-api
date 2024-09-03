const User = require('../model/userModel');
const userRepository = require('../repository/userRepository');
const { v4: uuidv4 } = require('uuid');

const generateUserId = () => {
    return uuidv4();
};

const createUser = ({ name, password }) => {
    const id = generateUserId();
    const user = new User(id, name, password);
    userRepository.addUser(user);
    return user;
};

const getUser = (id) => {
    return userRepository.getUserById(id);
};

const getAllUsers = () => {
    return userRepository.getAllUsers();
};

const updateUser = (id, { name, password }) => {
    const user = userRepository.getUserById(id);
    if (!user) {
        return null;
    }
    user.name = name;
    user.password = password;
    return user;
};

const deleteUser = (id) => {
    userRepository.deleteUserById(id);
};

module.exports = {
    createUser,
    getUser,
    getAllUsers,
    updateUser,
    deleteUser
};
