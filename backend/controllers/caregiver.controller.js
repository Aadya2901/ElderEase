const Patient = require("../models/patient.model");
const Vital = require("../models/vital.model");
const Alert = require("../models/alert.model");

exports.getCaregiverDashboard =
async (req,res)=>{
 try{

  const patients =
   await Patient.find();

  let result = [];

  for(let p of patients){

   const latestVital =
    await Vital.findOne({
      userId:p.userId
    }).sort({ createdAt:-1 });

   const activeAlerts =
    await Alert.countDocuments({
      userId:p.userId,
      status:"active"
    });

   result.push({
     userId:p.userId,
     name:p.name,
     age:p.age,
     relation:p.relation,
     latestVital,
     activeAlerts
   });
  }

  res.json(result);

 }catch(err){
  res.status(500).json({
   message:err.message
  });
 }
};

exports.getPatientDetail =
async(req,res)=>{
 try{

  const id = req.params.id;

  const patient =
   await Patient.findOne({
    userId:id
   });

  const latestVital =
   await Vital.findOne({
    userId:id
   }).sort({ createdAt:-1 });

  const alerts =
   await Alert.find({
    userId:id
   }).sort({ createdAt:-1 }).limit(10);

  res.json({
   patient,
   latestVital,
   alerts
  });

 }catch(err){
  res.status(500).json({
   message:err.message
  });
 }
};

exports.getPatientHistory =
async(req,res)=>{
 try{

  const data =
   await Vital.find({
    userId:req.params.id
   }).sort({ createdAt:-1 })
   .limit(50);

  res.json(data);

 }catch(err){
  res.status(500).json({
   message:err.message
  });
 }
};