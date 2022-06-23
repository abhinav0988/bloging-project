const express = require('express');
const router = express.Router();
const AuhtorController=require("../Controllers/AuthorController")
const BlogController=require("../Controllers/BlogsController")
const CommonMiddleware=require("../Middleware/CommonMiddleware")
const isdeleted=require("../Middleware/isdeleted")
const BlogIdValidation=require("../Middleware/BlogIdValidation")
const UserController=require("../Controllers/UserController")
const mid = require("../Middleware/auth")
const updatemid = require("../Middleware/updateauth")




router.post("/CreateAuthor",isdeleted.mid3,AuhtorController.CreateAuthor)

router.post("/CreateBlog",mid.middleAuth,isdeleted.mid3,CommonMiddleware.mid1, BlogController.CreateBlog)

router.get("/getBlog", BlogController.getBlog)

router.put("/UpdateBlog/:BlogsId",isdeleted.mid3, BlogIdValidation.BlogIdValidation, updatemid.updateauth, isdeleted.mid2,BlogController.UpdateBlog)

router.delete("/DeletedBlog/:BlogsId", BlogIdValidation.BlogIdValidation, updatemid.updateauth,isdeleted.mid2,BlogController.DeletedBlog)
router.delete("/DeletedQuery",BlogController.DeletedQuery)
router.post("/authorlogin", UserController.authorlogin)



module.exports=router