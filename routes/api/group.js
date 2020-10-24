const express = require("express");
// const crypto = require('crypto');
// const User = require('../../models').User;
// const passport = require('../../passport');
// const { isValidEmail, isValidPassword } = require('../../utilities/authUtils');
const router = express.Router();

//? Added Groups here:
const Group = require("../../models").Group;
const Contact = require("../../models").Contact;
//?---------------------

// GROUP ROUTES

// GET ALL GROUPS BY USER
// e.g. API address: localhost:3000/api/groups/getallbyuser/1
router.get("/getallbyuser/:userid", async (req, res) => {
  // let contacts = empty object
  let groups = {};
  // find the current user...
  groups = await Group.findAll({
    // based on the user id in the params of the api
    where: {
      UserId: req.params.userid
    }
  });
  // if the user id in the params exists...
  if (groups) {
    // return them as a JSON object
    res.json({ groups });
    return;
    // or if none are returned, return a 404 error
  } else {
    console.log("No user matches the requested uid in the api");
    res.status(404).json({ status: "error", message: err.message });
  }
});

// GET ALL GROUPS BY CONTACT & USER
// e.g. API address: localhost:3000/api/groups/getallbycontact/1/2
router.get("/getallbycontact/:userid/:contactid", async (req, res) => {
  // let contacts = empty object
  let groups = {};
  // find the current user...
  groups = await Group.findAll({
    // based on the user id in the params of the api
    where: {
      UserId: req.params.userid,
      contacts: req.params.contactid
    }
  });
  // if the user id in the params exists...
  if (groups) {
    // return them as a JSON object
    res.json({ groups });
    return;
    // or if none are returned, return a 404 error
  } else {
    console.log("No user matches the requested uid in the api");
    res.status(404).json({ status: "error", message: err.message });
  }
});

// GET ALL GROUPS BY PLAN & USER
// e.g. API address: localhost:3000/api/groups/getallbyplan/1/3
router.get("/getallbyplan/:userid/:planid", async (req, res) => {
  // let contacts = empty object
  let groups = {};
  // find the current user...
  groups = await Group.findAll({
    // based on the user id in the params of the api
    where: {
      UserId: req.params.userid,
      plans: req.params.planid
    }
  });
  // if the user id in the params exists...
  if (groups) {
    // return them as a JSON object
    res.json({ groups });
    return;
    // or if none are returned, return a 404 error
  } else {
    console.log("No user matches the requested uid in the api");
    res.status(404).json({ status: "error", message: err.message });
  }
});

// GET A GROUP BY USER & GROUP NAME
// e.g. API address: localhost:3000/api/groups/getone/1/neighborhood
router.get("/getone/:userid/:groupname", async (req, res) => {
  // let contact = empty object
  let group = {};
  // find the contact...
  group = await Group.findOne({
    // based on the contact nickname in the params of the api
    where: {
      groupname: req.params.groupname,
      UserId: req.params.userid
    }
  });
  // if the user id in the params exists...
  if (group) {
    // return them as a JSON object
    res.json({ group });
    return;
    // or if none are returned, return a 404 error
  } else {
    console.log("No user matches the requested uid in the api");
    res.status(404).json({ status: "error", message: err.message });
  }
});

// e.g. API address: localhost:3000/api/groups/add/1
router.post("/add/:userid", async function (req, res) {
  let group = {};
  console.log(req.params.userid);
  group = await Group.findOrCreate({
    where: {
      UserId: req.params.userid,
      groupname: req.body.groupname
    },
    defaults: {
      groupname: req.body.groupname,
      UserId: req.params.userid
    }
  });
  if (group) {
    res.json({ group });
  } else {
    res.status(400).json({ status: "error", message: err.message });
    return;
  }
});

//UPDATE GROUP
// e.g. API address: localhost:3000/api/groups/update/1/3
router.put("/update/:userid/:groupid", async function (req, res) {
  let group = {};
  group = await Group.findOne({
    where: {
      UserId: req.params.userid,
      id: req.params.groupid
    }
  });
  if (group) {
    try {
      group = await Group.update(
        {
          id: req.params.groupid,
          UserId: req.params.userid
        },
        {
          where: {
            UserId: req.params.userid,
            id: req.params.groupid
          }
        }
      );
      return res.send(group);
    } catch (err) {
      return res.status(400).json({ status: "error", message: err.message });
    }
  } else {
    return res.status(400).json({ status: "error", message: err.message });
  }
});

// DELETE GROUP
// e.g. API address: localhost:3000/api/groups/update/1/3
router.delete("/delete/:userid/:groupid", async function (req, res) {
  let group = {};
  group = await Group.findOne({
    where: {
      UserId: req.params.userid,
      id: req.params.groupid
    }
  });
  if (group) {
    try {
      await Group.destroy({
        where: {
          UserId: req.params.userid,
          id: req.params.groupid
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

router.put("/:groupId/contact/:contactId", async (req, res) => {
  const group = await Group.findOne({ where: { id: req.params.groupId } });
  const contact = await Contact.findOne({ where: { id: req.params.contactId } });

  if (group && contact) {
    contact.addGroup(group);
    res.json({ status: 'ok' });
  }

  res.status(404).json({ status: 'error', message: "Group or Contact not found" });
});

//* MODULE EXPORTS ********************************
//! Do not change module exports command. Required and functioning as expected.
module.exports = router;
