import React from 'react';
import Modal from 'react-modal';

const OptionModal = (props) => (
  <Modal
    isOpen={!!props.selectedOption}
    onRequestClose={props.clearSelectedOption}
    contentLabel="Selected Option"
  >
    <h3>Selected Option</h3>
    {props.selectedOption && (<p>Some nice text</p>)}
    <button onClick={props.clearSelectedOption}>Close</button>
  </Modal>
);

export default OptionModal;
