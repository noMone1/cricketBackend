
const router = require("express").Router();

// importing middlewares
const AuthorizeUser= require("../../../middlewares/AuthorizeUser");
const AuthorizeAdmin= require("../../../middlewares/AuthorizeAdmin");
const JwtValidation= require("../../../middlewares/JwtValidation");

// importing controllers  
const addEmployee = require("../../../controller/tenantsUserController/createUser");
const getEmployees = require("../../../controller/tenantsUserController/getAllUsers");
const getEmployee = require("../../../controller/tenantsUserController/getUser");
const updateEmployee = require("../../../controller/tenantsUserController/updateUser");
const deleteEmployee = require("../../../controller/tenantsUserController/deleteUser");
const checkEmailDuplicate = require("../../../controller/tenantsUserController/checkEmailDuplicate");
const login = require("../../../controller/tenantsUserController/login");


router.post('/',JwtValidation,addEmployee);
router.post('/login',login);
router.get('/',JwtValidation, getEmployees);
router.get('/duplicate',JwtValidation, checkEmailDuplicate);
router.get('/:id',JwtValidation, getEmployee);
router.put('/:id',JwtValidation, updateEmployee);
router.delete('/:id',JwtValidation, deleteEmployee);


module.exports = router;
