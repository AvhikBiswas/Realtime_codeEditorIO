const express = require('express');
const AllActiveUser = require('../../controller/GetAllActiveUser_controller');
const Leave = require('../../controller/UserLeft_controller');
const create_user = require('../../controller/JoinUser_controller');

const Router = express.Router();

Router.get('/AllUser', AllActiveUser); // we 
Router.post('/create',create_user);
Router.delete('/leave',Leave);


module.exports = Router;