import {createStore} from 'redux';

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");


const ADD_TODO = "ADD_TODO";
const DELETE_TODO ="DELETE_TODO";

const addToDo = (text)=>{
  return {
    type: ADD_TODO, 
    text: text
  }
}

const deleteTodo = (id)=>{
  return {
    type: DELETE_TODO,
    id: id
  }
}

const reducer = (state = [], action)=>{
  console.log(...state)
  switch(action.type){
    case ADD_TODO:
      // ...state  = state array unpack ,  state 어레이를 변경/바꾸는게 아니라 새로 어레이를 생성한다 
      return [{ text : action.text, id: Date.now() }, ...state]
    case DELETE_TODO:
      // 새로운 어레이를 반환해야 하므로 filter를 사용한다 | 클릭한 항목의 아이디와 같이 않은 항목들로 반환 
      return state.filter(item => item.id !== action.id);
    default:
      return state
  }
}

const store = createStore(reducer);

const onChange = ()=>{
  console.log(store.getState())
}


const dispatchAddToDo = (text)=>{
  // store.dispatch({type: ADD_TODO, text: text})  이걸 함수로 쪼갬 
  store.dispatch(addToDo(text));
}

const dispatchDeleteToDo = (e)=>{
  const targetId = parseInt(e.currentTarget.parentElement.id); 
  // store.dispatch({type:DELETE_TODO, id: targetId}); 이걸 쪼갬 
  store.dispatch(deleteTodo(targetId))
  
}
const paintToDos = ()=>{
  // store.getState() 에 있는 어레이를 가져온다 
  const toDos = store.getState();
  // 새로운 toDos 어레이가 들어올 수 있도록 ul 을 초기화 시켜서  
  ul.innerHTML = "";
  toDos.forEach(toDo => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "X";
    btn.addEventListener("click", dispatchDeleteToDo)
    li.id = toDo.id;
    li.innerText = toDo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  })
  // for(const item of toDos) {
  //   const li = document.createElement("li");
  //   li.id = item.id;
  //   li.innerText = item.text;
  //   ul.appendChild(li);
  // }
}

store.subscribe(paintToDos);
store.subscribe(onChange);



function onSubmit(e){
  e.preventDefault();
  const toDo = input.value;
  input.value = '';
  dispatchAddToDo(toDo);
}

form.addEventListener("submit", onSubmit)