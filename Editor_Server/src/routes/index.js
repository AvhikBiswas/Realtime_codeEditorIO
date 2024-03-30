const express = require('express');
const Api_V1 = require('./V1');

const Router=express.Router();
Router.use('/v1',Api_V1);

module.exports=Router;