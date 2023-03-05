const Stay= require("../src/models/stay.js")
const {cloudinary}= require("../cloudinary/index")


//show all stays
module.exports.index=async (req,res)=>{

    let skip=req.query.skip || 0;
    let limit=req.query.limit || 5;

    const stays= await Stay.find({}).limit(limit).skip(skip);
    const stayCount = await Stay.find({}).count();
    res.status(200).render("stays/index.ejs",{stays,limit,skip,stayCount})
}


//show new stay form
module.exports.showAddPage=(req,res)=>{
    res.status(200).render("stays/new.ejs");
}



//add new stay 
module.exports.addPage=async (req,res)=>{
    
    const imgArr= req.files.map(f=>({url:f.path,filename:f.filename}));
    const stay = new Stay(req.body.stay);
    stay.images=imgArr;
    stay.author= req.user._id;
    await stay.save();
    req.flash("success","Successfully created a new stay");
    res.status(200).redirect(`stays/${stay.id}`);
}



//show edit form 
module.exports.showEditPage= async (req,res)=>{
    const stay= await Stay.findById(req.params.id);
    res.status(200).render("stays/edit.ejs",{stay})
}


//editCamp
module.exports.editCamp=async (req,res)=>{
    let stay=await Stay.findByIdAndUpdate(req.params.id,{ ...req.body.stay });
    const images=req.files.map(f=>({url:f.path,filename:f.filename}));
    stay.images.push(...images);

    if(req.body.deleteImages){
        await stay.updateOne({$pull:{images:{filename:{$in: req.body.deleteImages}}}},{new: true})
        for(let filename of req.body.deleteImages){
            cloudinary.uploader.destroy(filename)
        }
        if(stay.images.length==req.body.deleteImages){
            console.log("heyhyy");
        }
    }
    
    await stay.save()

    req.flash("success","Successfully updated the stay");
    res.status(200).redirect(`/stays/${stay.id}`);
}


// show particular stay
module.exports.showCamp=async (req,res)=>{
    const stay = await Stay.findById(req.params.id).populate(
        {  
            path:"reviews",
            populate:{
                path:"author",
            }
        }).populate("author");

    if(stay){
        res.status(200).render("stays/show.ejs",{stay})
    }else{
        req.flash("error","No such stay exist");
        res.redirect("/stays");
    } 
}


//delete camp
module.exports.deleteCamp=async (req,res)=>{
    const stay =await Stay.findByIdAndDelete(req.params.id);

    for(let image of stay.images){
        cloudinary.uploader.destroy(image.filename);
    }

    req.flash("success","Successfully deleted the stay");
    res.redirect("/stays");
}
