const express = require('express');
const router = express.Router();

//? Added PLANS here:
const Plan = require('../../models').Plan;
//?---------------------


// PLAN ROUTES

// GET ALL PLANS BY USER
// e.g. API address: localhost:3000/api/plans/getallbyuser/1
router.get('/getallbyuser/:userid', async (req, res) => {
    // let plans = empty object
  let plans = {};
    // find the current user...
  plans = await Plan.findAll({
    // based on the user id in the params of the api
    where: {
      users: req.params.userid,
    }
  })
  // if the user id in the params exists...
  if (plans) {
    // return them as a JSON object
    res.json({ plans });
    return;
    // or if none are returned, return a 404 error
   } else {
      console.log ('No user matches the requested uid in the api');
      res.status(404).json({ status: 'error', message: err.message });
  }
});

// GET ALL PLANS BY CONTACT & USER
// e.g. API address: localhost:3000/api/plans/getallbycontact/1/2
router.get('/getallbycontact/:userid/:contactid', async (req, res) => {
    // let plans = empty object
  let plans = {};
    // find the current user...
  plans = await Plan.findAll({
    // based on the user id in the params of the api
    where: {
      users: req.params.userid,
      contacts: req.params.contactid
    }
  })
  // if the user id in the params exists...
  if (plans) {
    // return them as a JSON object
    res.json({ plans });
    return;
    // or if none are returned, return a 404 error
   } else {
      console.log ('No user matches the requested uid in the api');
      res.status(404).json({ status: 'error', message: err.message });
  }
});

// GET ALL PLANS BY GROUP & USER
// e.g. API address: localhost:3000/api/plans/getallbygroup/1/3
router.get('/getallbygroup/:userid/:groupid', async (req, res) => {
    // let contacts = empty object
  let plans = {};
    // find the current user...
  plans = await Plan.findAll({
    // based on the user id in the params of the api
    where: {
      users: req.params.userid,
      groups: req.params.groupid
    }
  })
  // if the user id in the params exists...
  if (plans) {
    // return them as a JSON object
    res.json({ plans });
    return;
    // or if none are returned, return a 404 error
   } else {
      console.log ('No user matches the requested uid in the api');
      res.status(404).json({ status: 'error', message: err.message });
  }
});


// GET A PLAN BASED ON USERID AND PLAN NAME
// e.g. API address: localhost:3000/api/plans/getone/1/neighborhood
router.get('/getone/:userid/:planname', async (req, res) => {
    // let contact = empty object
  let plan = {};
    // find the contact...
  plan = await Plan.findOne({
    // based on the contact nickname in the params of the api
    where: {
      planname: req.params.planname,
      users: req.params.userid
    }
  })
  // if the user id in the params exists...
  if (plan) {
    // return them as a JSON object
    res.json({ plan });
    return;
    // or if none are returned, return a 404 error
   } else {
      console.log ('No user matches the requested uid in the api');
      res.status(404).json({ status: 'error', message: err.message });
  }
});


// ADD A NEW PLAN
// e.g. API address: localhost:3000/api/plans/add/1
router.post('/add/:userid', async function (req, res) {
  let plan = {};
  plan = await Plan.findOrCreate({
      where: {
          users: req.params.userid,
          planname: req.body.planname,
      },
      defaults: {
        planname: req.body.planname,
        users: req.params.userid
      }
  })
  if(plan) {
    res.json({ plan })
    } else {
        res.status(400).json({ status: 'error', message: err.message });
        return;
    }
});

// UPDATE AN EXISTING PLAN
// e.g. API address: localhost:3000/api/plans/update/1/3
router.put('/update/:userid/:planid', async function (req, res) {
    let plan = {}
    plan = await Plan.findOne({
        where: {
            users: req.params.userid,
            id: req.params.planid
        }
    });
    if (plan) {
        try {
        plan = await Plan.update({
            id: req.params.planid,
            users: req.params.userid
        }, 
        { where: {
            users: req.params.userid,
            id: req.params.planid
            }
        });
        return res.send(plan);
        } catch (err) {
            return res.status(400).json({ status: 'error', message: err.message });
        }
    } else {
        return res.status(400).json({ status: 'error', message: err.message });
    }
});

// DELETE A PLAN
// e.g. API address: localhost:3000/api/plans/delete/1/3
router.delete('/delete/:userid/:planid', async function (req, res) {
    let plan = {}
    plan = await Plan.findOne({
        where: {
            users: req.params.userid,
            id: req.params.planid
        }
    });
    if (plan) {
        try {
        await Plan.destroy({ 
            where: {
                users: req.params.userid,
                id: req.params.planid
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