
const UserController = {
    testUser: async (req, res) => {
        res.status(200).json({ msg: 'Todo listo desde userControllers' });
    }
}

module.exports = UserController;