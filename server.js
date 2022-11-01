const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
// express 환경설정
app.use(express.json()); 
app.use(express.static(path.join(__dirname, 'textbook/build'))); 
app.use(bodyParser.urlencoded({ extended: false }));

var keyid = 3; // 다음에 추가될 회원에게 부여할 key값
var userList = [ //객체배열(회원명단)초기값설정
    { keyid: 1, name: "홍길동", id: "kdhong", passwd: "1111" },
    { keyid: 2, name: "박길동", id: "kdpark", passwd: "1111" }
];

const mainPage = (req, res) => {
    // 브라우져(리액트)가 서버에게 접속하면 보내는 첫페이지 (즉, 빌드한 페이지)
    res.sendFile(path.join(__dirname, 'textbook/build/index.html'));
}

const listUsers = (req, res) => {
    console.log("회원명단 조회요청을 받았으며, 리액트에게 명단을 보냅니다"); 
    res.json(userList); // .json는 객체/배열을 클라이언트에게 그대로 보낼때
}

const addUser = (req, res) => {
    const { name, id, passwd } = req.body;
    userList.push({ keyid: keyid++, name, id, passwd }); 
    console.log("회원등록요청을 완료하였으며, 이를 반영한 전체목록입니다."); 
    userList.map((user, i) => { // 수신되었다면 목록으로 처리
        console.log(user.keyid + "." + user.name + "." + user.id + "." + user.passwd);
    })
    return res.send('success');
}

app.get("/", mainPage);         // REST API 바인딩 (첫페이지)
app.get("/users", listUsers);   // REST API 바인딩 (회원목록)
app.post("/users", addUser);    // REST API 바인딩 (회원가입)

// 웹서버 가동 
app.listen(65010, () => {
    console.log("----------------------------------"); 
    console.log("(리액트 연동용) 웹서버 실행중 ... "); 
    console.log("접속주소: http://localhost:65010/ "); 
    console.log("----------------------------------");
});