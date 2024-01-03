const express = require('express');
const Api_V1 = require('../routes/v1/index');

const Router=express.Router();
Router.use('/v1',Api_V1);

module.exports=Router;