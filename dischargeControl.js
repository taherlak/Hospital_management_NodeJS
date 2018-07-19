var discharge_update = (con,req)=>{
  return new Promise((resolve,reject)=>{
    var patient_name = req.body.names;
    var admityear = new Date().getFullYear();
    var admitDate = new Date().getDate();
    var admitMonth = new Date().getMonth()+1;
    var final_date = admityear + "-" + admitMonth + "-" + admitDate;
    var sql = "UPDATE patient_info SET DischargeDate = '"+final_date+"',Bed=null,PatientStatus='Discharged' where name='"+patient_name+"'";
    console.log(sql);
    con.query(sql,(error,result)=>{
      if(result){
        resolve("Data updated successfully");
      }else{
        reject("Patient not found");
      }
    });
  });
};

module.exports={
  discharge_update
};
