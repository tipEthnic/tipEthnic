const express = require('express'); //모듈 불러옴
const app = express();
const path = require('path');

app.use(express.static("assets"));

app.get('/', function(req,res) {
    res.sendFile(__dirname + "/assets/views/index.html")
})

const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log("server is loading :)" );
})
