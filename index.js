const express = require('express');
const hbs = require('hbs');
const HandlebarsIntl = require('handlebars-intl');
const ejs = require('ejs')
const sql = require('mysql')
const port = process.env.PORT || 2000;
const connect_db = require('./connect_db');
const insert_info = require('./insert_data');
const get_data = require('./get_data');
const bed_info = require('./bed_info')
const dischargeControl = require('./dischargeControl')
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('View Engine','hbs');
hbs.registerPartials(__dirname+'/views/partials');
app.use(express.static(__dirname+'/views'));
HandlebarsIntl.registerWith(hbs);
var con = connect_db.connect_sql();
var avail_beds = 0;
var isNoBed = false;


app.get('/',(req,res)=>{
  bed_info.available_beds(con).then((avail_bed)=>{
    console.log("Available beds are: " +avail_bed);
    avail_beds = avail_bed;
    if(avail_bed === 0){
      isNoBed = true;
      console.log("Here");
    }else{
      isNoBed = false;
    }
  }).catch((err)=>{
    if(err){
      console.log(err);
    }
  });
  get_data.display_info(con).then((patient_data)=>{
    res.render('home.hbs',{
        page_title:"Test Table",
        data:patient_data,
        beds:avail_beds,
        isNoBed: isNoBed
    });
    }).catch((e)=>{
      if(e){
        console.log(e);
      }
    });
});

app.post('/add',(req,res)=>{
  res.render('add.hbs');
});

app.post("/insert", function(req,res) {
  var bed = 0;
  bed_info.get_bednum(con,25).then((bed_num)=>{
    console.log(bed_num);
    //bed = bed_num;
    insert_info.insert_patient_details(req,res,con,bed_num).then((data)=>{
      console.log(data);
      res.redirect('/');
    }).catch((err)=>{
      if(err){
        console.log(err);
      }
    });
  }).catch((err)=>{
    if(err){
      console.log(err);
    }
  });
});


app.post('/search',(req,res)=>{
  res.render('search.hbs');
});

app.post('/search_patient',(req,res)=>{
  get_data.display_custom_info(con,req).then((patient_custom_data)=>{
    //console.log(patient_custom_data);
    res.render('search_display.hbs',{
      data:patient_custom_data
    });
  }).catch((err)=>{
    if(err){
      console.log(err);
    }
  });
});

app.post('/discharge',(req,res)=>{
  get_data.display_info(con).then((patient_data)=>{
    res.render('discharge.hbs',{
        data:patient_data
    });
    }).catch((e)=>{
      if(e){
        console.log(e);
      }
    });
})

app.post('/dischargeControl',(req,res)=>{
  dischargeControl.discharge_update(con,req).then((result)=>{
    console.log(result);
    res.redirect('/');
  }).catch((err)=>{
    if(err){
      console.log(err);
    }
  });
})

app.listen(port,(err)=>{
  if(err){
    console.log(err);
  }
  console.log('Server running on port: ' + port);
});
