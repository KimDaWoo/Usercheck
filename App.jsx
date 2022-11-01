import React, { useState, useEffect } from "react"; 
import './App.css';

const serverURL = "http://localhost:65010/users"; // 웹서버 접속주소 
function App() {
    const [userData, setUserData] = useState(null); // 서버에서 받아올 사용자정보(객체배열)를 저장하는 곳
    const [text, setText] = useState(null); //회원 확인 시 출력될 메세지를 저장.
    const getUserData = () => {
        fetch(serverURL)
        .then((res) => res.json())
        .then((data) => setUserData(data)).then(console.log(userData))
    }

    useEffect(getUserData, []);

    const onSubmitHandler = (event) => {
        event.preventDefault();
        const name = event.target.name.value; 
        const id = event.target.id.value;
        const passwd = event.target.passwd.value; 
        console.log("Submit버튼 클릭후 서버로 POST전송");
        
        fetch(serverURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify({ name, id, passwd }), 
        })
        .then(getUserData()) 
    }

    const onCheckHandler = (event) => { // 전체 회원의 아이디, 비밀번호와 입력된 비밀번호, 아이디를 비교하여 출력될 메세지를 결정.
        event.preventDefault();
        const id = event.target.id.value;
        const passwd = event.target.passwd.value; 

        userData.map((user) => {
            user.id === id && user.passwd === passwd ? setText(()=> "회원으로 확인되었습니다.") : setText(()=> "그런 회원은 없습니다.") ;
        })
    } 

    return (
        <>
            <div>
                <h2> 회원등록 </h2>
                <form onSubmit={onSubmitHandler}>
                    <input type='text' name="name" placeholder="이름"></input>
                    <input type="text" name="id" placeholder="아이디" /> 
                    <input type="text" name="passwd" placeholder="암호" /> 
                    <button type="submit"> 등록 </button>
                </form>
            </div>
            <div>
                <h2> 회원확인 </h2>
                <form onSubmit={onCheckHandler}> //입력된 아이디와 비밀번호를 기반으로 버튼 클릭 시 onCheckHandler 함수를 실행.
                    <input type="text" name="id" placeholder="아이디" /> 
                    <input type="text" name="passwd" placeholder="암호" /> 
                    <button type="submit"> 확인 </button>
                </form>
                <h2>{text}</h2> //메세지 출력
            </div>
            <p></p>
            <div>
                <h2> 회원목록 </h2> <ol>
                    {(userData === null) ? (
                        <p> 서버에서 데이터를 가져오는 중.... </p>
                    ): 
                    (
                        userData.map((user, i) => ( // 수신되었다면 목록으로 처리
                            <li key={user.keyid} > {user.name} {user.id} {user.passwd} </li>))
                    )}
                </ol> 
            </div>
        </>
    )
}

export default App;
