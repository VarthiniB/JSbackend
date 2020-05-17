const express = require('express')
const cors = require('cors');
const app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
app.use(bodyParser());



app.use(cors({
  origin: 'http://localhost:4200'
}));

var con = mysql.createConnection({
  host     : 'database-1.cysokewdwqua.us-east-1.rds.amazonaws.com',
  port     : '3306',
  user     : 'minerva',
  password : 'Gnanambigai7&',
  database: "minerva",
  connectTimeout: 100000
   });
  
/*con.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
});*/


 function getconnection()
{
  return mysql.createConnection({
    host     : 'database-1.cysokewdwqua.us-east-1.rds.amazonaws.com',
    port     : '3306',
    user     : 'minerva',
    password : 'Gnanambigai7&',
    database: "minerva",
    connectTimeout: 100000
     });
}
 


app.get('/', (req, res) => {
  res.send('Hello Job Search - get mongo db data to chart through http call!')
});

app.post('/getCalenderData', (req, res) => {

  var con=getconnection();
  con.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
});
  con.query("SELECT  count(*) as count, date(doa) as date  FROM jobs where sno='"+req.body.uid+"'and MONTH(doa) = '"+req.body.month+"' group by date(doa)", function (err, result, fields) {
    if (err) throw err;
   // console.log(result);
   con.end();
    res.send(result)

  });
});

app.post('/getTablePaginated', (req, res) => {

  //console.log("=="+JSON.stringify(req.body.uid));

  if(con  == null){
    con.connect(function(err) {
      if (err) {
        return console.error('error: ' + err.message);
      }
  });
  }
  
  con.query("SELECT * FROM jobs where sno='"+req.body.uid+"' order by jno desc", function (err, result, fields) {
    if (err) throw err;
   // console.log(result);
   con.end();
    res.send(result)

  });
 });

app.post('/getCountApplied', (req, res) => {

  if(con  == null){
    con.connect(function(err) {
      if (err) {
        return console.error('error: ' + err.message);
      }
  });
  }
  
  con.query("SELECT count(*) as countalljobs FROM jobs where sno='"+req.body.uid+"'", function (err, result) {
    if (err) throw err;
   // console.log(result);
   con.end();
    res.send(result)

  });
});

app.post('/getCountAppliedToday', (req, res) => {
  
  if(con  == null){
    con.connect(function(err) {
      if (err) {
        return console.error('error: ' + err.message);
      }
  });
  }
  
  con.query("SELECT count(*) as countTodayjobs FROM jobs where sno='"+req.body.uid+"' and Date(doa)= CURDATE()", function (err, result) {
    if (err) throw err;
   // console.log(result);
   con.end();
    res.send(result)

  });
});

app.post('/getUpcomingEvents', (req, res) => {
  
  if(con  == null){
    con.connect(function(err) {
      if (err) {
        return console.error('error: ' + err.message);
      }
  });
  }
  
  con.query("SELECT count(*) as countallevents FROM jobs where sno='"+req.body.uid+"' and dof IS NOT NULL", function (err, result) {
    if (err) throw err;
   // console.log(result);
   con.end();
    res.send(result)

  });
});

app.post('/getTodayTask', (req, res) => {
	 
  if(con  == null){
    con.connect(function(err) {
      if (err) {
        return console.error('error: ' + err.message);
      }
  });
  }
  
  con.query("SELECT count(*) as countTodayevents FROM jobs where sno='"+req.body.uid+"' and Date(dof)= CURDATE()", function (err, result) {
    if (err) throw err;
   // console.log(result);
   con.end();
    res.send(result)

  });
});
app.post('/addNewJob', (req, res) => {
	
  if(con  == null){
    con.connect(function(err) {
      if (err) {
        return console.error('error: ' + err.message);
      }
  });
  }
  var que = "insert into jobs (sno,position,org,location,url,status,remarks,doa,dof)values ('"+req.body.sno+"','"+req.body.position+"','"+req.body.org+"','"+req.body.location+"','"+req.body.url+"','"+req.body.status+"','"+req.body.remarks+"','"+req.body.doa+"',"+(req.body.dof==""?  null : ",'"+req.body.dof+"'")+")"
 
 console.log("==="+que);
  con.query(que, function (err, result) {
    if (err) throw err;
   // console.log(result);
   con.end();
    res.send(result)

  });
});
app.post('/updateJobStatus', (req, res) => {
	console.log('update job status')
  res.send('')
});
app.post('/addJobEvent', (req, res) => {
	console.log('add job event')
  res.send('')
});
app.post('/addJobFeedback', (req, res) => {
	console.log('update job feedback')
  res.send('')
});
app.post('/addJobStatus', (req, res) => {
	console.log('update job status')
  res.send('')
});
app.post('/UpdateAnyEntry', (req, res) => {
	console.log('update anyone row in jobs table')
  res.send('')
});

app.post('/getUserId', (req, res) => {
  if(con  == null){
    con.connect(function(err) {
      if (err) {
        return console.error('error: ' + err.message);
      }
  });
  }
  
  con.query("SELECT sno  FROM user where email='"+req.body.email+"'", function (err, result) {
    if (err) throw err;
   // console.log(result);
   con.end();
    res.send(result)

  });
});

app.post('/addUser', (req, res) => {
  if(con  == null){
    con.connect(function(err) {
      if (err) {
        return console.error('error: ' + err.message);
      }
  });
  }
  
  con.query("insert into user (LastName,FirstName,email,dreamJob,dreamSal,dreamcomp) values ('"+req.body.lname+"','"+req.body.fname+"','"+req.body.email+"','"+req.body.djob+"','"+req.body.ts+"','"+req.body.dc+"')", function (err, result) {
    if (err) throw err;
   // console.log(result);
   con.end();
    res.send(result)

  });
});


app.post('/getUserDetails', (req, res) => {
  if(con  == null){
    con.connect(function(err) {
      if (err) {
        return console.error('error: ' + err.message);
      }
  });
  }
  
  con.query("SELECT * FROM user where sno='"+req.body.sno+"'", function (err, result) {
    if (err) throw err;
   // console.log(result);
   con.end();
    res.send(result)

  });
});


app.listen(7000, () => {
  console.log('Example app listening on port 7000!')
}).on('error', function(err){
  console.log('on error handler');
  console.log(err);
});

process.on('uncaughtException', function(err) {
  console.log('process.on handler');
  console.log(err);
});