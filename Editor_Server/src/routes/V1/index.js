const express = require('express');
const AllActiveUser = require('../../controller/GetAllActiveUser_controller.js');
const Leave = require('../../controller/UserLeft_controller.js');
const create_user = require('../../controller/JoinUser_controller.js');
const Router = express.Router();
Router.get('/AllUser', AllActiveUser);
Router.post('/create', create_user);
Router.delete('/leave', Leave);
module.exports = Router;