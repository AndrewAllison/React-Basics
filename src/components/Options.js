import React from 'react';
import Option from './Option';

const Options = (props) => {
  return (
    <div>
      {props.options.length === 0 && <p>Pease enter an option to get started!</p>}
      {props.options.length > 0 && <p>You Have {props.options.length}</p>}
      <ul>
        {
          props.options.map(option => (
            <Option
              key={option}
              text={option}
              handleDeleteOption={props.handleDeleteOption}
            />
          ))
        }
        {props.options.length > 0 && <button onClick={props.handleDeleteOptions}>Remove All</button>}
      </ul>
    </div>
  );
};

export default Options;