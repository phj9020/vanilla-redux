// redux에는 createStore 라는 함수가 있다 
// store는 data를 넣을 수 있는 장소를 생성한다 
// redux는 data를 관리하는데 도와주는 역할을 하기 위해 만들어졌다 
import { createStore } from 'redux';

// Vanilla without redux 
const plus = document.querySelector("#add");
const minus = document.querySelector("#minus");
const span = document.querySelector("span");

span.innerText = 0;

const ADD = "ADD";
const MINUS = "MINUS";

const countModifier = (count = 0, action)=>{
  console.log(count,action)
  switch(action.type) {
    case ADD: 
      return count + 1;
    case MINUS: 
      return count - 1;
    default:
      return count
  }
}

const store = createStore(countModifier);

console.log(store)
console.log(store.getState())

const onChange = ()=>{
  span.innerText = store.getState();
}
store.subscribe(onChange)


const handleAdd = ()=>{
  // store.dispatch( {action}) action needs to be object  && action must have key:value 
  store.dispatch({type:ADD})
}

const handleMinus = ()=>{
  store.dispatch({type:MINUS})
}

plus.addEventListener("click", handleAdd);
minus.addEventListener("click", handleMinus)