const router = require('express').Router();
const userRoutes = require('./user');

//! Addition for Contacts
const contactRoutes = require('./contact');
//! ---------------------
//! Addition for Groups
const groupRoutes = require('./group');
//! ---------------------
//! Addition for Plans
const planRoutes = require('./plan');
//! ---------------------
//! Addition for Templates
const templateRoutes = require('./template');
//! ---------------------

router.use('/users', userRoutes);

//! Addition for Contacts
router.use('/contacts', contactRoutes);
//! ---------------------
//! Addition for Groups
router.use('/groups', groupRoutes);
//! ---------------------
//! Addition for Plans
router.use('/plans', planRoutes);
//! ---------------------
//! Addition for Templates
router.use('/templates', templateRoutes);
//! ---------------------




module.exports = router;
