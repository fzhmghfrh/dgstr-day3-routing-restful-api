let users = [];

const addUser = (user) => {
    users.push(user);
};

const getUserById = (id) => {
    return users.find(u => u.id === id);
};

const getAllUsers = () => {
    return users;
};

const deleteUserById = (id) => {
    users = users.filter(u => u.id !== id);
};

module.exports = {
    addUser,
    getUserById,
    getAllUsers,
    deleteUserById
};
