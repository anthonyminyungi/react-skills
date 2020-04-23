import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Counter from '../components/Counter';
import { increase, decrease } from '../modules/counter';

const CounterContainer = () => {
  const number = useSelector((state) => state.counter.number);
  const dispatch = useDispatch();
  const onIncrease = useCallback(() => dispatch(increase()), [dispatch]);
  const onDecrease = useCallback(() => dispatch(decrease()), [dispatch]); // useDispatch를 사용할 때에는 이처럼 useCallback과 함께 사용하는 습관을 들일 것을 권한다고 한다

  return (
    <Counter number={number} onIncrease={onIncrease} onDecrease={onDecrease} />
  );
};

export default CounterContainer;
