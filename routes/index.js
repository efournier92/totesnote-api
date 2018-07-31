const express = require(`express`);
const router = express.Router();
// const jwt = require(`express-jwt`);

// const auth = jwt({
//   secret: process.env.JWT_SECRET,
//   userProperty: `payload`,
// });

const authCtrl = require(`../controllers/auth.controller`);
const userCtrl = require(`../controllers/user.controller`);
const noteCtrl = require(`../controllers/note.controller`);

// Auth API 
router.post(`/register`, authCtrl.registerUser);
router.post(`/login`, authCtrl.loginUser);

router.post(`/saveNote`, noteCtrl.saveNote);
router.get(`/getNotes`, userCtrl.getUserNotes);

// // User API
// router.get(`/user`, auth, userCtrl.getUserInfo);

// router.get(`/test`, userCtrl.getTest);

module.exports = router;

