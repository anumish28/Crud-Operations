const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require("mysql");
const multer = require ("multer");
const upload = multer({ dest: "uploads/"});














const conn = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: '',
    database: 'scenario',
});

conn.connect((err) => {
    if (err) throw err;
    console.log("MYSQL Connected");
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('uploads'))

app.post('/api/insert', upload.single('image'), function (req, res, next) {
  
  
  let data = { title: req.body.title, type: req.body.type, project: req.body.project, testeraffects: req.body.testeraffects, testerfinalises: req.body.testerfinalises, testerattendus: req.body.testerattendus, user: req.body.user, image: req.file.filename}
 // let sql = "INSERT INTO `testdata`(`title`,`type`,`project`,`testeraffects`, `testerfinalises` , `testerattendus`, `user`, `image`) VALUES ('" + title + "','" + type + "','" + project + "','" + testeraffects + "','" + testerfinalises + "', '" + testerattendus + "', '" + user + "', '" + img_name + "')";
  console.log(data)
  
  
  let sql = "Insert into testdata set ?";
  
  
  let query = conn.query(sql, data, (err, result) => {
    
      res.send(JSON.stringify({ status: 200, error: null, response: "New Record added successfully"}));
  
  });
});



    

//insert record

//app.post('/api/insert', upload.single('image'), (req, res) => {

    
    
   // let data = { title: req.body.title, type: req.body.type, project: req.body.project, testeraffects: req.body.testeraffects, testerfinalises: req.body.testerfinalises, testerattendus: req.body.testerattendus, user: req.body.user, image: req.file.upload }
    
    //let sql = "Insert into testdata set ?";
    //let query = conn.query(sql, data, (err, result) => {
      //  if (err) throw err;
        
        //res.send(JSON.stringify({ status: 200, error: null, response: "New Record added successfully"}));
    //});
    
//});

//show record

app.get('/api/view', (req , res)=> {
    let sql = "SELECT * FROM testdata";
    let query = conn.query(sql,(err, result)=> {
       if (err) throw err;
        res.send(JSON.stringify({ status: 200, error: null, response: result })); 
    });
});

//show single record

app.get('/api/view/:id', (req , res)=> {
    let sql = "SELECT * FROM testdata WHERE id=" + req.params.id;
    let query = conn.query(sql,(err, result) => {
       if (err) throw err;
        res.send(JSON.stringify({ status: 200, error: null, response: result })); 
    });
});

// update

app.put("/api/update",(req,res)=>{
    let sql = "UPDATE testdata SET title='"+req.body.title+"', type='"+req.body.type+"', project='"+req.body.project+"', testeraffects='"+req.body.testeraffects+"', testerfinalises='"+req.body.testerfinalises+"', testerattendus='"+req.body.testerattendus+"', user='"+req.body.user+"' WHERE id=" +req.body.id;
    let query =  conn.query(sql,(err, result) => {
       if (err) throw err;
        res.send(JSON.stringify({ status: 200, error: null, response:  "Record updated successfully" })); 
    });
});


//delete

app.delete("/api/delete/:id", (req,res)=> {
    let sql = "DELETE FROM testdata WHERE id="+req.params.id+"";
    let query = conn.query(sql,(err, result) => {
       if (err) throw err;
        res.send(JSON.stringify({ status: 200, error: null, response:  "Record deleted successfully" })); 
    });
})




app.listen(3001, () => {
    console.log("running on port 3001");
});