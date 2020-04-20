import React, { Component } from 'react';
import ColorContext from '../contexts/color';

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

class SelectColors extends Component {
  static contextType = ColorContext; // 단점 : 한 클래스에서 하나의 Context밖에 사용하지 못함.
  // 앞으로 새로운 컴포넌트를 작성할 때 클래스형 컴포넌트로 작성할 일은 많지 않기 때문에 useContext 사용을 권함.

  handleSetColor = (color) => {
    this.context.actions.setColor(color);
  };

  handleSetSubColor = (subcolor) => {
    this.context.actions.setSubColor(subcolor);
  };

  render() {
    return (
      <div>
        <h2>색상을 선택하세요.</h2>
        <div style={{ display: 'flex' }}>
          {colors.map((color) => (
            <div
              key={color}
              style={{
                background: color,
                width: '24px',
                height: '24px',
                cursor: 'pointer',
              }}
              onClick={() => this.handleSetColor(color)}
              onContextMenu={(e) => {
                e.preventDefault(); //마우스 오른쪽 버튼 클릭 시 메뉴가 뜨는 것을 무시함.
                this.handleSetSubColor(color);
              }}
            />
          ))}
        </div>

        <hr />
      </div>
    );
  }
}

export default SelectColors;
