import React, { useReducer, useRef, useCallback } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

const createBulkTodos = () => {
  const array = [];
  for (let i = 1; i <= 2500; i++) {
    array.push({
      id: i,
      text: `할 일${i}`,
      checked: false,
    });
  }
  return array;
};
// 느려지는 원인 분석
// 컴포넌트가 리렌더 되는 상황
// 1. 자신이 전달받은 props가 변경될 때
// 2. 자신의 state가 바뀔 때
// 3. 부모 컴포넌트가 리렌더링 될 때
// 4. forceUpdate 함수가 실행될 때

const todoReducer = (todos, action) => {
  switch (action.type) {
    case 'INSERT':
      // { type: 'INSERT', todo: { id: 1, text: 'todo', checked: false } }
      return todos.concat(action.todo);
    case 'REMOVE':
      // { type: 'REMOVE', id: 1 }
      return todos.filter((todo) => todo.id !== action.id);
    case 'TOGGLE':
      // { type: 'TOGGLE', id: 1 }
      return todos.map((todo) =>
        todo.id === action.id ? { ...todo, checked: !todo.checked } : todo,
      );
    default:
      return todos;
  }
};

const App = () => {
  const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);

  // 상태 업데이트에 의해 콜백함수도 업데이트되기 때문에 이를 방지해야 한다.
  // useState의 함수형 업데이트로도 이를 방지할 수 있다.
  // 혹은 위처럼 useReducer를 통해 상태를 업데이트하는 로직을 모아서 컴포넌트 바깥에 둘 수 있다는 장점을 취할 수도 있다.
  // setNumber(number + 1)처럼 하지 않고 아래처럼 하면 된다.

  // const [number, setNumber] = useState(0);
  // const onIncrease = useCallback(
  //   () => setNumber((prevNumber) => prevNumber + 1),
  //   [],
  // );

  const nextId = useRef(4);
  const onInsert = useCallback((text) => {
    const todo = {
      id: nextId.current,
      text,
      checked: false,
    };
    dispatch({ type: 'INSERT', todo });
    nextId.current += 1;
  }, []);

  const onRemove = useCallback((id) => {
    dispatch({ type: 'REMOVE', id });
  }, []);

  const onToggle = useCallback((id) => {
    dispatch({ type: 'TOGGLE', id });
  }, []);

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
};

export default App;
