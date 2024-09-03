const userUsecase = require('../domain/usecase/userUsecase');

// Handler for getting all users
const getAllUsers = (req, res) => {
    try {
        const users = userUsecase.getAllUsers();
        res.status(200).json({
            message: "Successfully retrieved all users",
            data: users
        });
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

// Handler for getting a single user
const getUser = (req, res) => {
    try {
        const { id } = req.params;
        const user = userUsecase.getUser(id);

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        res.status(200).json({
            message: "Successfully retrieved user",
            data: user
        });
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

// Handler for creating a new user
const createUser = (req, res) => {
    try {
        const { name, password } = req.body;

        if (!name || !password) {
            return res.status(400).send({ message: 'Name and password are required' });
        }

        const newUser = userUsecase.createUser({ name, password });

        res.status(201).json({
            message: "Successfully created user",
            data: newUser
        });
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

// Handler for updating a user
const updateUser = (req, res) => {
    try {
        const { id } = req.params;
        const { name, password } = req.body;

        if (!name || !password) {
            return res.status(400).send({ message: 'Name and password are required' });
        }

        const updatedUser = userUsecase.updateUser(id, { name, password });

        if (!updatedUser) {
            return res.status(404).send({ message: 'User not found' });
        }

        res.status(200).json({
            message: "Successfully updated user",
            data: updatedUser
        });
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

// Handler for deleting a user
const deleteUser = (req, res) => {
    try {
        const { id } = req.params;
        userUsecase.deleteUser(id);

        res.status(204).send({ message: 'Successfully deleted user' }).end();
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

// Handler for searching users by name
const searchUser = (req, res) => {
    try {
        const { name } = req.query;
        if (!name) {
            return res.status(400).send({ message: 'Name is required' });
        }
        const users = userUsecase.getAllUsers();
        const filteredUsers = users.filter((u) => u.name.toLowerCase().includes(name.toLowerCase()));

        if (filteredUsers.length === 0) {
            return res.status(404).send({ message: 'No users found matching the provided name' });
        }

        res.status(200).json({
            message: "Successfully retrieved user(s)",
            data: filteredUsers
        });
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    searchUser
};
