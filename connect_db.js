var mysql = require('mysql');

var connect_sql = (con) =>{

  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "Hospital"
  });

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

  return con;
};



module.exports = {connect_sql};
