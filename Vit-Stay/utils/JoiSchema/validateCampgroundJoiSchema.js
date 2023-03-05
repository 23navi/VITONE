const Joi=require("joi");
const ExpressError = require("../errors/ExpressError");

const validatestayJoiSchema=(req,res,next)=>{
    const stayJoiSchema=Joi.object({
        stay:Joi.object({
            title:Joi.string().required(),
            price:Joi.number().required(),
            location: Joi.string().required(),
            description: Joi.string().required(),
            //image:Joi.string()
        }).required(),
        deleteImages:Joi.array()
})

const result= stayJoiSchema.validate(req.body);


if(result.error){
    const message=result.error.details.map(el=>el.message);
    throw new ExpressError(message,400)
}else{
    next();
}
}

module.exports=validatestayJoiSchema;