const express = require('express');
const router = express.Router();

//? Added Contacts here:
const Template = require('../../models').Template;
//?---------------------


// TEMPLATE ROUTES

// GET ALL TEMPLATES BY USER
// e.g. API address: localhost:3000/api/templates/getallbyuser/1
router.get('/getallbyuser/:userid', async (req, res) => {
    // let templates = empty object
  let templates = {};
    // find the current user...
  templates = await Template.findAll({
    // based on the user id in the params of the api
    where: {
      users: req.params.userid,
    }
  })
  // if the user id in the params exists...
  if (templates) {
    // return them as a JSON object
    res.json({ templates });
    return;
    // or if none are returned, return a 404 error
   } else {
      console.log ('No user matches the requested uid in the api');
      res.status(404).json({ status: 'error', message: err.message });
  }
});

// GET ALL TEMPLATES BY USER AND CONTACT
// e.g. API address: localhost:3000/api/templates/getallbycontact/1/2
router.get('/getallbycontact/:userid/:contactid', async (req, res) => {
    // let templates = empty object
  let templates = {};
    // find the current user...
  templates = await Template.findAll({
    // based on the user id in the params of the api
    where: {
      contacts: req.params.contactid,
      users: req.params.userid
    }
  })
  // if the user id in the params exists...
  if (templates) {
    // return them as a JSON object
    res.json({ templates });
    return;
    // or if none are returned, return a 404 error
   } else {
      console.log ('No user matches the requested uid in the api');
      res.status(404).json({ status: 'error', message: err.message });
  }
});

// GET ALL TEMPLATES BY USER AND GROUP
// e.g. API address: localhost:3000/api/templates/getallbygroup/1/2
router.get('/getallbygroup/:userid/:groupid', async (req, res) => {
    // let templates = empty object
  let templates = {};
    // find the current user...
  templates = await Template.findAll({
    // based on the user id in the params of the api
    where: {
      groups: req.params.groupid,
      users: req.params.userid
    }
  })
  // if the user id in the params exists...
  if (templates) {
    // return them as a JSON object
    res.json({ templates });
    return;
    // or if none are returned, return a 404 error
   } else {
      console.log ('No user matches the requested uid in the api');
      res.status(404).json({ status: 'error', message: err.message });
  }
});

// GET ALL TEMPLATES BY USER AND PLAN
// e.g. API address: localhost:3000/api/templates/getallbyplan/1/2
router.get('/getallbyplan/:userid/:planid', async (req, res) => {
    // let templates = empty object
  let templates = {};
    // find the current user...
  templates = await Template.findAll({
    // based on the user id in the params of the api
    where: {
      users: req.params.userid,
      plans: req.params.planid
    }
  })
  // if the user id in the params exists...
  if (templates) {
    // return them as a JSON object
    res.json({ templates });
    return;
    // or if none are returned, return a 404 error
   } else {
      console.log ('No user matches the requested uid in the api');
      res.status(404).json({ status: 'error', message: err.message });
  }
});

// GET TEMPLATE BY TEMPLATE NICKNAME AND USER ID
// e.g. API address: localhost:3000/api/templates/getone/1/basetemplate
router.get('/getone/:userid/:nickname', async (req, res) => {
    // let template = empty object
  let template = {};
    // find the template...
  template = await Template.findOne({
    // based on the contact nickname in the params of the api
    where: {
      users: req.params.userid,
      nickname: req.params.nickname
    }
  })
  // if the user id in the params exists...
  if (template) {
    // return them as a JSON object
    res.json({ template });
    return;
    // or if none are returned, return a 404 error
   } else {
      console.log ('No user matches the requested uid in the api');
      res.status(404).json({ status: 'error', message: err.message });
  }
});


// CREATE NEW TEMPLATE
// e.g. API address: localhost:3000/api/templates/add/1
router.post('/add/:userid', async function (req, res) {
  let template = {};
  console.log(req.params.template);
  template = await Template.findOrCreate({
      where: {
          users: req.params.userid,
          nickname: req.body.nickname
      },
      defaults: {
        nickname: req.body.nickname,
        val: req.body.val,
        users: req.body.users,
        contacts: req.body.contacts,
        groups: req.body.groups,
        plans: req.body.plans
      }
  })
  if(template) {
    res.json({ template })
    } else {
        res.status(400).json({ status: 'error', message: err.message });
        return;
    }
});

// UPDATE TEMPLATE
// e.g. API address: localhost:3000/api/templates/update/1/3
router.put('/update/:userid/:templateid', async function (req, res) {
    let template = {};
    template = await Template.findOne({
        where: {
            users: req.params.userid,
            id: req.params.templateid
        }
    });
    if (template) {
        try {
        template = await Template.update({
            id: req.params.templateid,
            nickname: req.body.nickname,
            val: req.body.val,
            users: req.params.userid,
            contacts: req.body.contacts,
            groups: req.body.groups,
            plans: req.body.plans
        }, 
        { where: {
            users: req.params.userid,
            id: req.params.templateid
            }
        });
        return res.send(contact);
        } catch (err) {
            return res.status(400).json({ status: 'error', message: err.message });
        }
    } else {
        return res.status(400).json({ status: 'error', message: err.message });
    }
});

// DELETE TEMPLATE
// e.g. API address: localhost:3000/api/templates/delete/1/3
router.delete('/delete/:userid/:templateid', async function (req, res) {
    let template = {}
    template = await Template.findOne({
        where: {
            users: req.params.userid,
            id: req.params.templateid
        }
    });
    if (template) {
        try {
        await Template.destroy({ 
            where: {
                users: req.params.userid,
                id: req.params.templateid
            }
        });
        return res.json({ status: 'ok' });
        } catch (err) {
            return res.status(400).json({ status: 'error', message: err.message });
        }
    } else {
        return res.status(400).json({ status: 'error', message: err.message });
    }
});


//* MODULE EXPORTS ********************************
//! Do not change module exports command. Required and functioning as expected.
module.exports = router