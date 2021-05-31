// 1.서버 사용을 위해 http모듈을 http 변수에. (모듈과 변수의 이름은 달라도 된다.)
var http = require('http'); 
var fs = require('fs')
// 2.http 모듈로 서버를 생성
// 사용자로 부터 http 요청이 들어오면 function 실행
var server = http.createServer(function(request,response){ 

    fs.readFile("./index.html", null, (err,data)=>{
        response.write(data);
        response.end();
    })

});

// 3. listen 함수로 8080 포트를 가진 서버를 실행
server.listen(8080, function(){ 
    console.log('Server is running...');
});