const bed_info = require('./bed_info');

var insert_patient_details = (req,res,con,bed) =>{
  return new Promise((resolve,reject)=>{
    //var bed = 0;
    var name = req.body.names;
    var disease = req.body.disease;
    var admityear = new Date().getFullYear();
    var admitDate = new Date().getDate();
    var admitMonth = new Date().getMonth()+1;
    var final_date = admityear + "-" + admitMonth + "-" + admitDate;  //console.log(sql);
    //var dischargeDate = null;
    var sql = "INSERT INTO patient_info VALUES (DEFAULT"+",'"+name+"','"+final_date+"','"+disease+"',"+bed+",DEFAULT,'Admit')";
    //console.log(sql);
    con.query(sql, function (err, result) {
      if(result){
        resolve('Data inserted successfully for '+name);
      }else{
        reject("Error in data insertion");
      }
    });
  });
};

module.exports={insert_patient_details};
