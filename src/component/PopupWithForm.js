import '../index.css';
import React from 'react';

function PopupWithForm(props) {

  function handleClick(e) {
    e.stopPropagation();
    props.onClose();
  }

  function handleClickForChildren(e) {
    e.stopPropagation();
    return
  }

  return (
    <div onClick={handleClick} className={props.isOpened ? 'popup popup_opened' : 'popup'} id={props.name}>
      <div onClick={handleClickForChildren} className="popup__container popup__container_form popup__container_target">
        <button className="popup__buttons-close" type="button" onClick={props.onClose} />
        <h3 className="popup__title">{props.title}</h3>
        <form onSubmit={props.onSubmit} className="popup__form" name={props.name} noValidate="">
          {props.children}
          <button className="popup__buttons-save " type="submit">{props.buttonText}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm