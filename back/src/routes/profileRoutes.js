const { Router } = require('express');
const ProfileController = require('../controllers/ProfileController');

const profileRoutes = Router();

profileRoutes.post('/', ProfileController.newProfile);
profileRoutes.get('/select', ProfileController.selectProfile);
profileRoutes.get('/:id?', ProfileController.getProfilles);
profileRoutes.put('/:id', ProfileController.updateProfile);
profileRoutes.delete('/:id', ProfileController.deleteProfile);

module.exports = profileRoutes;