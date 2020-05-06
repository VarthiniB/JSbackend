const express = require('express')
const cors = require('cors');
const app = express();

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
var resp = await getData();
	res.json(resp);

});

function getData(){
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
}

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});