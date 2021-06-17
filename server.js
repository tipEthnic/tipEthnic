const express = require('express');
const app = express();


app.use('/assets',express.static(__dirname + "/assets/"));

app.get('/',function(req, res) {
    //__dirname 은 요청하고자 하는 파일의 경로(최상위 디렉토리~현재 디렉토리)를 단축시켜주는 절대경로 식별자
    res.sendFile(__dirname + "/index.html");
})
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log("server is loading :)")
  })

// app.listen(8080,()=>{
//     console.log("server is loading :)");
// })

