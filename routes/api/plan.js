const express = require("express");
const router = express.Router();
const cron = require('node-cron'); //TWILIO

const client = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);


//? Added PLANS here:
const Plan = require("../../models").Plan;
const Template = require("../../models").Template;
const Group = require("../../models").Group;
//?---------------------

let cronTask = null;
// PLAN ROUTES

// GET ALL PLANS BY USER
// e.g. API address: localhost:3000/api/plans/getallbyuser/1
router.get("/getallbyuser/:userid", async (req, res) => {
  // let plans = empty object
  let plans = {};
  // find the current user...
  plans = await Plan.findAll({
    // based on the user id in the params of the api
    where: {
      UserId: req.params.userid
    }
  });
  // if the user id in the params exists...
  if (plans) {
    // return them as a JSON object
    res.json({ plans });
    return;
    // or if none are returned, return a 404 error
  } else {
    console.log("No user matches the requested uid in the api");
    res.status(404).json({ status: "error", message: err.message });
  }
});

// GET ALL PLANS BY CONTACT & USER
// e.g. API address: localhost:3000/api/plans/getallbycontact/1/2
router.get("/getallbycontact/:userid/:contactid", async (req, res) => {
  // let plans = empty object
  let plans = {};
  // find the current user...
  plans = await Plan.findAll({
    // based on the user id in the params of the api
    where: {
      UserId: req.params.userid,
      contacts: req.params.contactid
    }
  });
  // if the user id in the params exists...
  if (plans) {
    // return them as a JSON object
    res.json({ plans });
    return;
    // or if none are returned, return a 404 error
  } else {
    console.log("No user matches the requested uid in the api");
    res.status(404).json({ status: "error", message: err.message });
  }
});

// GET ALL PLANS BY GROUP & USER
// e.g. API address: localhost:3000/api/plans/getallbygroup/1/3
router.get("/getallbygroup/:userid/:groupid", async (req, res) => {
  // let contacts = empty object
  let plans = {};
  // find the current user...
  plans = await Plan.findAll({
    // based on the user id in the params of the api
    where: {
      UserId: req.params.userid,
      groups: req.params.groupid
    }
  });
  // if the user id in the params exists...
  if (plans) {
    // return them as a JSON object
    res.json({ plans });
    return;
    // or if none are returned, return a 404 error
  } else {
    console.log("No user matches the requested uid in the api");
    res.status(404).json({ status: "error", message: err.message });
  }
});

// GET A PLAN BASED ON USERID AND PLAN NAME
// e.g. API address: localhost:3000/api/plans/getone/1/neighborhood
router.get("/getone/:userid/:planname", async (req, res) => {
  // let contact = empty object
  let plan = {};
  // find the contact...
  plan = await Plan.findOne({
    // based on the contact nickname in the params of the api
    where: {
      planname: req.params.planname,
      UserId: req.params.userid
    }
  });
  // if the user id in the params exists...
  if (plan) {
    // return them as a JSON object
    return res.json({ plan });
    // or if none are returned, return a 404 error
  } else {
    console.log("No user matches the requested uid in the api");
    res.status(404).json({ status: "error", message: err.message });
  }
});

// GET A PLAN BASED ON USERID AND PLAN NAME
// e.g. API address: localhost:3000/api/plans/getone/1/2
router.get("/getonebyuid/:userid/:planid", async (req, res) => {
  // let contact = empty object
  let plan = {};
  // find the contact...
  plan = await Plan.findOne({
    // based on the contact nickname in the params of the api
    where: {
      id: req.params.planid,
      UserId: req.params.userid
    }
  });
  // if the user id in the params exists...
  if (plan) {
    // return them as a JSON object
    return res.json({ plan });
    // or if none are returned, return a 404 error
  } else {
    console.log("No user matches the requested uid in the api");
    res.status(404).json({ status: "error" });
  }
});

// ADD A NEW PLAN
// e.g. API address: localhost:3000/api/plans/add/1
router.post("/add/:userid", async function (req, res) {
  let plan = {};
  plan = await Plan.findOrCreate({
    where: {
      UserId: req.params.userid,
      planname: req.body.planname
    },
    defaults: {
      planname: req.body.planname,
      UserId: req.params.userid,
      isActive: req.body.isActive,
      isHome: req.body.isHome,
      durationBeforeExecution: req.body.durationBeforeExecution,
      activatestart: req.body.activatestart,
      activateend: req.body.activateend,
      executeplan: req.body.executeplan
    }
  });
  if (plan) {
    res.json({ plan });
  } else {
    res.status(400).json({ status: "error", message: err.message });
    return;
  }
});

// UPDATE AN EXISTING PLAN
// e.g. API address: localhost:3000/api/plans/update/1/3
router.put("/update/:userid/:planid", async function (req, res) {
  let plan = {};
  plan = await Plan.findOne({
    where: {
      UserId: req.params.userid,
      id: req.params.planid
    }
  });
  if (plan) {
    try {
      plan = await Plan.update(
        {
          id: req.params.planid,
          UserId: req.params.userid,
          planname: req.body.planname,
          isActive: req.body.isActive,
          isHome: req.body.isHome,
          durationBeforeExecution: req.body.durationBeforeExecution,
          activatestart: req.body.activatestart,
          activateend: req.body.activateend,
          executeplan: req.body.executeplan,
          contacts: req.body.contacts,
          groups: req.body.groups
        },
        {
          where: {
            UserId: req.params.userid,
            id: req.params.planid
          }
        }
      );
      return res.json(plan);
    } catch (err) {
      return res.status(400).json({ status: "error", message: err.message });
    }
  } else {
    return res.status(400).json({ status: "error", message: err.message });
  }
});

// DELETE A PLAN
// e.g. API address: localhost:3000/api/plans/update/1/3
router.delete("/delete/:userid/:planid", async function (req, res) {
  let plan = {};
  plan = await Plan.findOne({
    where: {
      UserId: req.params.userid,
      id: req.params.planid
    }
  });
  if (plan) {
    try {
      await Plan.destroy({
        where: {
          UserId: req.params.userid,
          id: req.params.planid
        }
      });
      return res.json({ status: "ok" });
    } catch (err) {
      return res.status(400).json({ status: "error", message: err.message });
    }
  } else {
    return res.status(400).json({ status: "error", message: err.message });
  }
});

router.post('/:id/start', async (req, res) => {
  /* STEPS
    1) Make DB request for plan and join with template / group / contact
    2) Start cron job with plan time as we the time to run
    3) Within cron run client.messages with each contact and the template message
  */

  const plan = await Plan.findOne({ where: { id: req.params.id }, include: Group });

  console.log('HERE', plan)
  if (plan) {
    // CRON EXAMPLE - */15 equals at 15 minutes
    cronTask = cron.schedule('15 * * * * *', () => {
      // Loop through contactts and send messages here
      // task.destroy();

      client.messages
        .create({
          from: process.env.TWILIO_PHONE_NUMBER,
          to: req.body.to,
          body: req.body.body
        })
        .then(() => {
          res.send(JSON.stringify({ success: true }));
        })
        .catch(err => {
          console.log(err);
          res.send(JSON.stringify({ success: false }));
        });
    })
  }

  // Task may need to be a global variable so you can destroy it within another endpoint
  //
});

router.put("/:planId/group/:groupId", async (req, res) => {
  const plan = await Plan.findOne({ where: { id: req.params.planId } });
  const group = await Group.findOne({ where: { id: req.params.groupId } });

  if (group && plan) {
    group.addPlan(plan);
    res.json({ status: 'ok' });
  }

  res.status(404).json({ status: 'error', message: "Group or Plan not found" });
});

router.put("/:planId/template/:templateId", async (req, res) => {
  const plan = await Plan.findOne({ where: { id: req.params.planId } });
  const template = await Template.findOne({ where: { id: req.params.templateId } });

  if (template && plan) {
    template.addPlan(plan);
    res.json({ status: 'ok' });
  }

  res.status(404).json({ status: 'error', message: "Template or Plan not found" });
});


//* MODULE EXPORTS ********************************
//! Do not change module exports command. Required and functioning as expected.
module.exports = router;
