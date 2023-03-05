const mongoose=require("mongoose");

//mongoose

// const dbName="yelp-camp";



mongoose.connect("mongodb+srv://navi:Navi2308@cluster0.vbwsb7v.mongodb.net/vitStay?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("connection open");
})
.catch(err=>{
    console.log(err);
    console.log("error");
})
