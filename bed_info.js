const lodash = require( 'lodash' );
var bed_all = [];
var free_bed = [];
var available_beds = (con)=>{
  return new Promise((resolve,reject)=>{
    con.query('Select count(*) as count from patient_info where Bed is not null',(err,rows,fields)=>{
      var total_beds = 25;
      if(rows){
        var occupied_beds= rows[0].count;
        resolve(total_beds - occupied_beds);
      }else{
        reject("Could not get the number of rows");
      }
    });
  });
};

var get_bednum = (con,bed_max) =>{
  return new Promise((resolve,reject)=>{
    con.query('Select distinct(Bed) from patient_info',(err,rows,fields)=>{
      if(rows){
        for(i=1;i<=bed_max;i++){
          bed_all[i] = i;
        }
        var bed_taken = lodash.map( rows, 'Bed' );
        free_bed = bed_all.filter((obj)=>{
           return bed_taken.indexOf(obj) == -1;
         });
        console.log(free_bed);
        console.log(free_bed[0]);
        resolve(free_bed[0]);
      }else{
        reject("Could not find beds in DB")
      }
    });
  });
};
module.exports = {
  available_beds,
  get_bednum
};
