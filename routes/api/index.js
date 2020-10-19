const router = require('express').Router();
const userRoutes = require('./user');

//! Addition for Contacts
const contactRoutes = require('./contact');
//! ---------------------

router.use('/users', userRoutes);

//! Addition for Contacts
router.use('/contacts', contactRoutes);
//! ---------------------

module.exports = router;
