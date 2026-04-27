const Vital = require("../models/vital.model");
const Alert = require("../models/alert.model");

exports.getSummary = async(req,res)=>{
 try{

  const userId = req.params.id;

  const vitals =
   await Vital.find({ userId });

  const alerts =
   await Alert.countDocuments({ userId });

  if(vitals.length === 0){
   return res.json({
    message:"No data"
   });
  }

  let totalHR = 0;
  let totalSpO2 = 0;
  let totalTemp = 0;

  vitals.forEach(v=>{
   totalHR += v.heartRate || 0;
   totalSpO2 += v.spo2 || 0;
   totalTemp += v.temperature ?? v.temp ?? 0;
  });

  res.json({
   totalReadings: vitals.length,
   avgHeartRate:
    (totalHR/vitals.length).toFixed(1),

   avgSpO2:
    (totalSpO2/vitals.length).toFixed(1),

   avgTemperature:
    (totalTemp/vitals.length).toFixed(1),

   totalAlerts: alerts
  });

 }catch(err){
  res.status(500).json({
   message:err.message
  });
 }
};

exports.getTrends = async(req,res)=>{
 try{

  const data =
   await Vital.find({
    userId:req.params.id
   })
   .sort({ createdAt:-1 })
   .limit(20);

  res.json(data);

 }catch(err){
  res.status(500).json({
   message:err.message
  });
 }
};

exports.getAlertReport =
async(req,res)=>{
 try{

  const data =
   await Alert.find({
    userId:req.params.id
   })
   .sort({ createdAt:-1 });

  res.json(data);

 }catch(err){
  res.status(500).json({
   message:err.message
  });
 }
};

