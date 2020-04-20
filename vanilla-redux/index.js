import { createStore } from 'redux';

const divToggle = document.querySelector('.toggle');
const counter = document.querySelector('h1');
const btnIncrease = document.querySelector('#increase');
const btnDecrease = document.querySelector('#decrease');

const TOGGLE_SWITCH = 'TOGGLE_SWITCH';
const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';

const toggleSwitch = () => ({ type: TOGGLE_SWITCH });
const increase = (difference) => ({ type: INCREASE, difference });
const decrease = () => ({ type: DECREASE });

const initialState = {
  toggle: false,
  counter: 0,
};

// 리듀서는 변화를 일으키는 함수.
// state가 undefined일 때는 initialState를 기본값으로 사용
function reducer(state = initialState, action) {
  // action의 type에 따라 다른 작업을 처리함
  switch (action.type) {
    case TOGGLE_SWITCH:
      return {
        ...state, // spread연산자를 통해 불변성을 유지 해주어야 함 => 번거로우므로 최대한 깊지 않은 구조로 진행
        toggle: !state.toggle,
      };
    case INCREASE:
      return {
        ...state,
        counter: state.counter + action.difference,
      };
    case DECREASE:
      return {
        ...state,
        counter: state.counter - 1,
      };
    default:
      return state;
  }
}

const store = createStore(reducer);

const render = () => {
  const state = store.getState(); // 현재 상태를 불러옵니다.
  // 토글 처리
  if (state.toggle) {
    divToggle.classList.add('active');
  } else {
    divToggle.classList.remove('active');
  }
  // 카운터 처리
  counter.innerText = state.counter;
};

render();
store.subscribe(render); // react에서는 react-redux가 이를 대신해주므로 직접 사용하지 않음

divToggle.onclick = () => {
  store.dispatch(toggleSwitch());
};

btnIncrease.onclick = () => {
  store.dispatch(increase(1));
};

btnDecrease.onclick = () => {
  store.dispatch(decrease());
};

// 리덕스를 사용할 때 지켜야 하는 세 가지 규칙

// 1. 단일 스토어
// 하나의 애플리케이션(프로젝트) 안에는 하나의 스토어가 들어있다.
// 특정 업데이트가 너무 빈번하게 일어나거나 애플리케이션의 특정 부분을 완전히 분리시킬 때 여러 개의 스토어를 만들 수도 있지만, 상태 관리가 복잡해질 수 있으므로 권장하지 않는다.

// 2. 읽기 전용 상태
// 상태를 업데이트 할 때 기존의 객체는 건드리지 않고 새로운 객체를 생성해서 반환해주어야 한다.
// 리덕스가 불변성을 유지해야 하는 이유는 내부적으로 데이터가 변경되는 것을 감지하기 위해 얕은 비교(shallow copy) 검사를 하기 때문. => 깊게 비교하지 않아 좋은 성능 유지

// 3. 리듀서는 순수한 함수
// * 리듀서 함수는 이전 상태와 액션 객체를 파라미터로 받는다.
// * 파라미터 외의 값에는 의존하면 안 된다.
// * 이전 상태는 절대로 건드리지 않고, 변화를 준 새로운 상태 객체를 만들어서 반환한다.
// * 똑같은 파라미터로 호출된 리듀서 함수는 언제나 똑같은 결과 값을 반환해야 한다.
