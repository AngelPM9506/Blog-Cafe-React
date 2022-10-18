const { Router } = require('express');
const ProfileController = require('../controllers/ProfileController');

const profileRoutes = Router();

profileRoutes.get('/:id?', ProfileController.getProfilles);
profileRoutes.post('/', ProfileController.newProfile);
profileRoutes.put('/:id', ProfileController.updateProfile);
profileRoutes.delete('/:id', ProfileController.deleteProfile);

module.exports = profileRoutes;