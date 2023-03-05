const catchAsync=require("../../utils/errors/catchAsync");
const validatestayJoiSchema= require("../../utils/JoiSchema/validateCampgroundJoiSchema");


const {storage}= require("../../cloudinary/index");
const multer= require("multer");
// const imgUpl= multer({dest:"navi"});
const imgUpl= multer({storage});


const {isLoggedIn}= require("../../middleware/isLoggedIn.js")

const stayController=require("../../controller/stayCotroller");

const express= require("express")
const router= express.Router();

const {isAuthorized}=require("../../middleware/isAuthorized"); // as we did module.exports.isAuthorized... it will come as an obj ... not just a variable...


router.route("/stays")
    .get(catchAsync(stayController.index))
    .post(isLoggedIn,imgUpl.array("img"),validatestayJoiSchema,catchAsync(stayController.addPage))


router.get("/stays/new",isLoggedIn,stayController.showAddPage);


router.get("/stays/:id/edit",isLoggedIn,isAuthorized,catchAsync(stayController.showEditPage))


router.route("/stays/:id")
    .get(catchAsync(stayController.showCamp))
    .delete(isLoggedIn,isAuthorized,catchAsync(stayController.deleteCamp))
    .put(isLoggedIn,isAuthorized,imgUpl.array('img'),validatestayJoiSchema,catchAsync(stayController.editCamp))



module.exports=router;