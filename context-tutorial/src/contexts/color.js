import React, { createContext, useState } from 'react';

const ColorContext = createContext({
  state: { color: 'black', subColor: 'red' },
  actions: {
    setColor: () => {},
    setSubColor: () => {},
  },
});

const ColorProvider = ({ children }) => {
  const [color, setColor] = useState('black');
  const [subColor, setSubColor] = useState('red');

  const value = {
    state: { color, subColor },
    actions: { setColor, setSubColor },
  };
  //   value 값을 꼭 명시해주어야 함.
  //무조건 상태 값만 있어야 하는 것은 아니고 함수를 전달해줄 수도 있음.
  return (
    <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
  );
};

// const ColorConsumer = ColorContext.Consumer 와 같은 의미
const { Consumer: ColorConsumer } = ColorContext;

// ColorProvider와 ColorConsumer 내보내기
export { ColorConsumer, ColorProvider };

export default ColorContext;
