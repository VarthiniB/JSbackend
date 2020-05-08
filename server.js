const express = require('express')
const cors = require('cors');
const app = express();
var AWS = require("aws-sdk");

AWS.config.getCredentials(function(err) {
  if (err) console.log(err.stack);
  // credentials not loaded
  else {
    console.log("Access key:", AWS.config.credentials.accessKeyId);
    console.log("Secret access key:", AWS.config.credentials.secretAccessKey);
  }
});
AWS.config.update({
  region: "us-east-2",
  endpoint: "http://localhost:8000"
});

app.use(cors({
  origin: 'http://localhost:4200'
}));

app.get('/', (req, res) => {
  res.send('Hello Job Search - get mongo db data to chart through http call!')
});

app.get('/getCalenderData', (req, res) => {
  res.send('send this month calendar data')
});

app.get('/getTablePaginated', (req, res) => {
  res.send('send all applied in descending order for open status')
});

app.get('/getCountApplied', (req, res) => {
  res.send('get Applied count')
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
});