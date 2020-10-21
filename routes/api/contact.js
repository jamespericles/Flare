const express = require("express");
// const crypto = require('crypto');
// const User = require('../../models').User;
// const passport = require('../../passport');
// const { isValidEmail, isValidPassword } = require('../../utilities/authUtils');
const router = express.Router();

//? Added Contacts here:
const Contact = require("../../models").Contact;
//?---------------------

// CONTACT ROUTES

// GET ALL CONTACTS BASED ON USERID
// e.g. API address: localhost:3000/api/contacts/getall/1
router.get("/getall/:userid", async (req, res) => {
  // let contacts = empty object
  let contacts = {};
  // find the current user...
  contacts = await Contact.findAll({
    // based on the user id in the params of the api
    where: {
      UserId: req.params.userid,
    },
  });
  // if the user id in the params exists...
  if (contacts) {
    // return them as a JSON object
    res.json({ contacts });
    return;
    // or if none are returned, return a 404 error
  } else {
    console.log("No user matches the requested uid in the api");
    res.status(404).json({ status: "error", message: err.message });
  }
});

// GET ONE CONTACT BASED ON USER NICKNAME
// e.g. API address: localhost:3000/api/contacts/getone/1
router.get("/getone/:nickname", async (req, res) => {
  // let contact = empty object
  let contact = {};
  // find the contact...
  contact = await Contact.findOne({
    // based on the contact nickname in the params of the api
    where: {
      nickname: req.params.nickname,
    },
  });
  // if the user id in the params exists...
  if (contact) {
    // return them as a JSON object
    res.json({ contact });
    return;
    // or if none are returned, return a 404 error
  } else {
    console.log("No user matches the requested uid in the api");
    res.status(404).json({ status: "error", message: err.message });
  }
});

// ADD A NEW CONTACT
//! NO MORE CHANGES TO "ADD A NEW CONTACT". FUNCTIONING CORRECTLY.
// e.g. API address: localhost:3000/api/contacts/add/1
router.post("/add/:uid", async function (req, res) {
  let contact = {};
  console.log(req.params.uid);
  contact = await Contact.findOrCreate({
    where: {
      UserId: req.params.uid,
      nickname: req.body.nickname,
      email: req.body.email,
    },
    defaults: {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      nickname: req.body.nickname,
      relationship: req.body.relationship,
      email: req.body.email,
      mobile: req.body.mobile,
      UserId: req.params.uid,
    },
  });
  if (contact) {
    res.json({ contact });
  } else {
    res.status(400).json({ status: "error", message: err.message });
    return;
  }
});
//! ----------------------------------------------------------------

// UPDATE A CONTACT
// e.g. API address: localhost:3000/api/contacts/update/1/3
router.put("/update/:userid/:contactid", async function (req, res) {
  let contact = {};
  console.log(req.params.userid);
  contact = await Contact.findOne({
    where: {
      UserId: req.params.userid,
      id: req.params.contactid,
    },
  });
  if (contact) {
    try {
      contact = await Contact.update(
        {
          id: req.params.contactid,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          nickname: req.body.nickname,
          relationship: req.body.relationship,
          email: req.body.email,
          mobile: req.body.mobile,
          UserId: req.params.userid,
        },
        {
          where: {
            UserId: req.params.userid,
            id: req.params.contactid,
          },
        }
      );
      return res.send(contact);
    } catch (err) {
      return res.status(400).json({ status: "error", message: err.message });
    }
  } else {
    return res.status(400).json({ status: "error", message: err.message });
  }
});

// DELETE A CONTACT
// e.g. API address: localhost:3000/api/contacts/update/1/3
router.delete("/delete/:userid/:contactid", async function (req, res) {
  let contact = {};
  contact = await Contact.findOne({
    where: {
      UserId: req.params.userid,
      id: req.params.contactid,
    },
  });
  if (contact) {
    try {
      await Contact.destroy({
        where: {
          UserId: req.params.userid,
          id: req.params.contactid,
        },
      });
      return res.json({ status: "ok" });
    } catch (err) {
      return res.status(400).json({ status: "error", message: err.message });
    }
  } else {
    return res.status(400).json({ status: "error", message: err.message });
  }
});

//* MODULE EXPORTS ********************************
//! Do not change module exports command. Required and functioning as expected.
module.exports = router;
