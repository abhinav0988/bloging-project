const AuthorModel = require("../Models/AuthorModel")

//Author Validation

const AuthorValidation=async function(req,res,next){
    try{
    let data =req.body   
    if(!data.fname){
        return res.status(400).send({status: false,msg: "first name should be present"})
    }
    if(typeof data.fname!="string"){
        return res.status(400).send({status: false,msg:" first name must be string"})
    }
    let firstName=data.fname.trim()
    if(firstName.length===0){
        return res.status(400).send({status: false,msg:" please enter firstname"})
    }
    if(!data.lname){
        return res.status(400).send({status: false,msg: "last name should be present"})
    }
    if(typeof data.lname!="string"){
        return res.status(400).send({status: false,msg:" last name must be string"})
    }
    let LastName=data.lname.trim()
    if(LastName.length===0){
        return res.status(400).send({status: false,msg:" please enter Lastname"})
    }

    //Enum Validation

    if(!data.title){
        return res.status(400).send({status: false,msg: "title should be present"})
    }
    const Enum = ["Mr", "Mrs", "Miss"]
    let incluedes=data.title
let enums=Enum.includes(incluedes)
if(!enums){
    return res.status(400).send({status: false,msg:"title should be from Mr Mrs Miss "})
}

//email validation

if(!data.email){
    return res.status(400).send({status: false,msg:"email should be present"})
}
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    let testmails=data.email
    let emailvalidation= regex.test(testmails)
    if(!emailvalidation){
        return res.status(400).send({status: false,msg: "enter a valid email id"})
    }
    let email=await AuthorModel.find({email:data.email})
    if(email.length>0&&data.email===email[0].email){
        return res.status(400).send({status: false,msg: "email already resgistered"})
    }
    if(!data.password){
        return res.status(400).send({status: false,msg: "password required"})
    }

    if(typeof data.password!="string"){
        return res.status(400).send({status: false,msg:"password must  be string"})
    }
    let Password=data.password.trim()
    if(Password.length===0){
        return res.status(400).send({status: false,msg:" please enter password"})
    }
    next()
}
catch(err){
     res.status(500).send({status: false,error:err.message})
}}

module.exports.AuthorValidation=AuthorValidation

