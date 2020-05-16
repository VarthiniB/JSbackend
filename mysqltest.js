var mysql = require('mysql');

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


    con.query("SELECT * FROM jobs", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
      
      });
 

