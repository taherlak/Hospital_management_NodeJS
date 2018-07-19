var display_info = (con)=>{
  return new Promise((resolve,reject)=>{
    con.query('SELECT * FROM patient_info',(err, rows, fields)=>{
            var patient_data = JSON.parse(JSON.stringify(rows));
            if(patient_data){
            resolve(patient_data);
            }else{
              reject("No data found")
            }
        });
  });
};

var display_custom_info = (con,req) =>{
  return new Promise((resolve,reject)=>{
    //console.log(req.body.dateType);
    if(req){
      var dateType = req.body.dateType;
      var fromDate = req.body.fromDate;
      var toDate = req.body.toDate;
      console.log(req.body.fromDate,req.body.toDate);
      var sql = "SELECT * FROM patient_info where "+dateType+" BETWEEN '"+fromDate+" 'AND '"+toDate+ "'";
      console.log(sql);
      con.query(sql,(err, rows, fields)=>{
              var patient_data = JSON.parse(JSON.stringify(rows));
              if(patient_data){
                resolve(patient_data);
              }else{
                reject("No data found")
              }
          });

    }
  });
};
module.exports = {
  display_info,
  display_custom_info
};
