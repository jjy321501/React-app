import React,{useRef, useState, useMemo, useCallback} from 'react';
import Hello from './Hello';
import Wrapper from './Wrapper';
import './App.css';
import Counter from './Counter';
import InputSample from './InputSample';
import UserList from './UserList';
import CreateUser from './CreateUser';

//active 값이 true 인 사용자의 수를 세어서 화면에 렌더링
function countActiveUsers(users){
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user => user.active).length;
}

function App() {
  /* const name = 'react';
  const style = {
    backgroundColor: 'black',
    color: 'aqua',
    fontSize: 24, // 기본 단위 px
    padding: '1rem' // 다른 단위 사용 시 문자열로 설정
  } */

  const [inputs, setInputs] = useState({
    username:'',
    email:''
  });
  const {username, email} = inputs;
  const onChange = e => {
    const {name, value} = e.target
    setInputs({
      ...inputs,
      [name]:value
    });
  };
  const [users,setUsers] = useState([
    {
        id:1,
        username:'velopert',
        email:'public.velopert@gmail.com',
        active:true
    },
    {
        id:2,
        username:'tester',
        email:'tester@example.com',
        active:false
    },
    {
        id:3,
        username:'liz',
        email:'liz@example.com',
        active:false
    }
  ]);

  const nextId = useRef(4);
  //함수형 업데이트 (리렌더링 최적화)
  const onCreate = useCallback(id => { 
    const user = {
      id: nextId.current,
      username,
      email
    };
    //Spread 방식
    /* setUsers([...users, user]); */
    //Concat 방식
    setUsers(users.concat(user));

    setInputs({
      username:'',
      email:''
    });
    nextId.current += 1;
  },[username, email]);
  //함수형 업데이트 (리렌더링 최적화)
  const onRemove = useCallback(
    id => {
      //user.id 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
      // = user.id 가 id 인것을 제거함
      setUsers(users.filter(user => user.id !== id));//불변성 지키면서 배열에서 제거하기위해 filter 배열 내장함수를 사용
    },[]);
  //함수형 업데이트 (리렌더링 최적화)
  const onToggle = useCallback(
    id => {
      setUsers(
        users.map(user =>
          user.id === id ? { ...user, active: !user.active } : user
        )
      );
    },[]);
  const count = useMemo(() => countActiveUsers(users),[users]);
  return (//쓰이는 곳에서 값을 정한다 => props(부모)
    <>
      {/* 주석은 화면에 보이지 않습니다 */}
      /* 중괄호로 감싸지 않으면 화면에 보입니다 */
      <Wrapper>
        <Hello name="react" color="red" isSpecial={true}/*{true} 를 생략하면 true 가 default 값*//>
        <Hello color="pink"/>
      </Wrapper>
      <Counter/>
      <InputSample/>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
     {/*  <div style={style}>{name}</div>
      <div className="gray-box"></div> */}
      <div>활성 사용자 수 : {count}</div>
    </>
  );
}

export default App;