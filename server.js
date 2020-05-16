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
  database: "minerva"
   });
  
con.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
});



app.get('/', (req, res) => {
  res.send('Hello Job Search - get mongo db data to chart through http call!')
});

app.get('/getCalenderData', (req, res) => {
  res.send('send this month calendar data')
});

app.post('/getTablePaginated', (req, res) => {

  console.log("=="+JSON.stringify(req.body.uid));

  if(con  == null){
    con.connect(function(err) {
      if (err) {
        return console.error('error: ' + err.message);
      }
  });
  }
  
  con.query("SELECT * FROM jobs where sno='"+req.body.uid+"'", function (err, result, fields) {
    if (err) throw err;
   // console.log(result);
    res.send(result)

  });
 });

app.get('/getCountApplied', (req, res) => {

  if(con  == null){
    con.connect(function(err) {
      if (err) {
        return console.error('error: ' + err.message);
      }
  });
  }
  
  con.query("SELECT * FROM jobs", function (err, result, fields) {
    if (err) throw err;
   // console.log(result);
    res.send(result)

  });
});

app.get('/getCountAppliedToday', (req, res) => {
  res.send('get Applied count for today')
});

app.get('/getUpcomingEvents', (req, res) => {
  res.send('get count of all future events')
});
app.get('/getTodayTask', (req, res) => {
	console.log('get count of all future events')
  res.send('')
});
app.post('/addNewob', (req, res) => {
	console.log('add new entry')
  res.send('')
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