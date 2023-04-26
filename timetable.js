import express from "express";
import mongoose from "mongoose";
import connectDB from "./db.js";

mongoose.set("strictQuery", false);
connectDB();
const app=express();
app.use(express.json());
const timetableSchema=mongoose.Schema([{
  
     day       :{
                 type:String,
                 required:true
               },
   
   subjectName:{
                 type:String,
                 required:true
               },
   subjectTeacher:{
                  type:String,
                  required:true
                },
   schedule    :{
                  type:String,
                  required:true
                 },
             } ]
        
)
const Timetable=mongoose.model("Timetable",timetableSchema);
timetableSchema.plugin(Timetable);
const timetable=[{
        day:"monday",
        subjectName:"Tamil",
        subjectTeacher:"Harish",
        schedule:"10.45 AM-11.30 AM"
              },
          {     
     day:"tuesday",
      subjectName:"English",
      subjectTeacher:"Harish",
     schedule:"10.45 AM-11.30 AM"

         }]
    
//get
app.get("/api",(req,res) =>
{
    try{
        res.status(200).send(timetable);
    }
    catch(error){
        res.json({message:"not available"});
    }
});
app.post("/api",async(req,res)=>{
    try{
        const timetable={
            day:req.body.day,
            subjectName:req.body.subjectName,
            subjectTeacher:req.body.subjectTeacher,
            schedule:req.body.schedule

        }
        console.log(timetable);
        var create=new Timetable(timetable);
        var timetableCreated=await create.save();
      
        if(timetableCreated){
            console.log("created");
        res.status(201).json({message:"show details"});
        }
else{
    res.status(401);
    throw new error("not found");
}
}catch(err){
    return res.status(500).json({message:err.message});
}}
);
// specific data
app.get("/api/:id",(req,res)=>{
    console.log(req.params.id);
    Timetable.findById(req.params.id)
    
    .then(result=>{
        res.status(200).json({
            profile:result
        })
    })
    .catch(err=> {
    console.log(err);
    res.status(505).json({
        error:err
    })
    }
  )
  })
  app.put('/api/:id',(req,res)=>{
    console.log(req.params.id);
    Timetable.findOneAndUpdate({_id:req.params.id},{
        $set:{
            day:req.body.day,
            subjectName:req.body.subjectName,
            subjectTeacher:req.body.subjectTeacher,
            schedule:req.body.schedule
        }
    })
    .then(result=>{
        res.status(200).json({
            updated_timetable:result       
         })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
    })
    app.delete("/api/:id",(req,res)=>{
        console.log(req.params.id);
        Timetable.deleteOne({_id:req.params.id},{
            $set:{
                day:req.body.day,
            subjectName:req.body.subjectName,
            subjectTeacher:req.body.subjectTeacher,
            schedule:req.body.schedule
    
            }
        })
        .then(result=>{
            res.status(200).json({
                deleted_timetable:result       
             })
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({
                error:err
            })
        })
        })
        app.delete("/api",(req,res)=>{
    
            Timetable.deleteMany({}).then((result) => {
                res.send(result);
            })
        });
//   export default app;
const port=5000;
app.listen(port,()=>{
    console.log(`server is running at ${port}`);
});