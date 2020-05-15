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

var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

app.get('/createTableJobs', (req, res) => {
	var params = {
		TableName : "JobList",
		KeySchema: [       
				{ AttributeName: "JNo", KeyType: "HASH"}
				],
		AttributeDefinitions: [       
				{ AttributeName: "JNo", AttributeType: "N" }

				],
		ProvisionedThroughput: {       
				ReadCapacityUnits: 5, 
				WriteCapacityUnits: 5
			 }
		};
		dynamodb.createTable(params, function(err, data) {
			if (err) {
					console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
					res.send('Error')
			} else {
					console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
					res.send('Table created')
			}
	});
 
});


app.get('/testget', (req, res) => {
	var params = {
		TableName : "JobList",
		KeySchema: [       
				{ AttributeName: "JNo", KeyType: "HASH"}
				],
		AttributeDefinitions: [       
				{ AttributeName: "JNo", AttributeType: "N" }

				],
		ProvisionedThroughput: {       
				ReadCapacityUnits: 5, 
				WriteCapacityUnits: 5
			 }
		};
		dynamodb.createTable(params, function(err, data) {
			if (err) {
					console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
					res.send('Error')
			} else {
					console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
					res.send('Table created')
			}
	});
 
});
app.get('/addTest', (req, res) => {
	var params =  {
		TableName: "JobList",
		Item: {
				"JNo": 2,
				"position": "SE",
				"organization": "Nike12",
				"appliedVia":"indeed",
				"url":"http://indeed/",
				"remarks":"good job sal 70k intro by prof",
				"dateofApp": new Date().toDateString(),
				"status":"open",
				"dateofFollowup":new Date().toDateString()
			
		}
};

docClient.put(params, function(err, data) {
	if (err) {
			console.error("Unable to add data", ". Error JSON:", JSON.stringify(err, null, 2));
	} else {
			console.log("PutItem succeeded:",params);
			res.send('item added')
	}
});

 
});


app.get('/updateTest', (req, res) => {
	var params =  {
		TableName: "JobList",
		Key:{
			"JNo":1		
	},
	UpdateExpression: "set userID = :u",
	ExpressionAttributeValues:{
			":u":1
			},
	ReturnValues:"UPDATED_NEW"
};


docClient.update(params, function(err, data) {
	if (err) {
			console.error("Unable to add data", ". Error JSON:", JSON.stringify(err, null, 2));
	} else {
			console.log("PutItem succeeded:",params);
			res.send('item Updated')
	}
});

 
});

app.get('/getTest', (req, res) => {
/*
	var params = {
    TableName : "JobList",
    KeyConditionExpression: "#id = :u",
    ExpressionAttributeNames:{
        "#id": "userID"
    },
    ExpressionAttributeValues: {
        ":u": 1
    }
};

docClient.query(params, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        data.Items.forEach(function(item) {
            console.log(" -", item.year + ": " + item.title);
				});
				res.json(data.Items);
    }
});

*/
var dynamoClient = new AWS.DynamoDB.DocumentClient();
  var params = {
    TableName: "JobList", // give it your table name 
    Select: "ALL_ATTRIBUTES"
  };

  dynamoClient.scan(params, function(err, data) {
    if (err) {
       console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
       console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
    }
  });
 
});


app.listen(7000, () => {
  console.log('Example app listening on port 7000!')
});