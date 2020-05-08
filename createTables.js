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
app.get('/getuser', (req, res) => {
	var a= { username: 'Gnana' };
	
  res.json(a);
});
app.get('/getallapplied', (req, res) => {
	var a= {};
		a.name="gnana";
		a.jobs=[];
		a.jobs[0] ={"job1":"soft.eng"};
		a.jobs[1] ={"job1":"soft.Analyst"};
	res.json(a);
});

app.get('/getfromDB', async (req, res) => {
	console.log("getfromdb enetred");
var resp = await getData();
	res.json(resp);

});

/*function getData(){
	var resp = {};
	resp.user = []
	var i=0;
return new Promise(function(resolve, reject){
	var mongoClient = require('mongodb').MongoClient;
	var url= 'mongodb://localhost';
	mongoClient.connect(url, function(err,db){
	//	console.log("connected");
	
		var cursor= db.db('jobportal');
		cursor.collection('user').find({},async function (findErr, result) {
			if (findErr) throw findErr;
			
			await result.forEach(asd => {
				//console.log(asd.name);
				var a = { "name": asd.name };
				//console.log(a);
				resp.user[i++]=a;
				console.log(JSON.stringify(resp));
			});
			
			db.close();
			resolve(resp);
		});
	
	})
})
}*/


function getData(){
	var resp = {};
	resp.user = []
	var i=0;
return new Promise(function(resolve, reject){
	var docClient = new AWS.DynamoDB.DocumentClient();

	var table = "testJS";
	
	var sno = "2";
	var name = "nnn";
	
	var params = {
			TableName: table,
			Key:{
					"sno": sno,
					"name": name
			}
	};
	
	docClient.get(params, function(err, data) {
			if (err) {
					console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
			} else {
				console.log("GetItem succeeded:", JSON.stringify(data, null, 2));

			resolve(data);
							}
	});

		});
	

}

app.listen(7000, () => {
  console.log('Example app listening on port 7000!')
});