
const router = require("express").Router();

// importing middlewares
const AuthorizeUser= require("../../../middlewares/AuthorizeUser");
const AuthorizeAdmin= require("../../../middlewares/AuthorizeAdmin");
const JwtValidation= require("../../../middlewares/JwtValidation");

// importing controllers
const signup = require("../../../controller/Auth/signup")
const login = require("../../../controller/Auth/login")
const updateUser = require("../../../controller/Auth/updateUser")
const getUsers = require("../../../controller/Auth/getUsers")
const updateToken = require("../../../controller/Auth/updateToken")
const me = require("../../../controller/Auth/me")

router.post('/register',signup);
router.get('/me',JwtValidation,me);
router.post('/login', login);
router.put('/user/:id',JwtValidation,AuthorizeUser,updateUser);
router.get('/user',JwtValidation,AuthorizeAdmin,getUsers);
router.put('/token',updateToken);

module.exports = router;
