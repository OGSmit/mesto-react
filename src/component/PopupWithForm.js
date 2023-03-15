import '../index.css';
import React from 'react';

function PopupWithForm(props) {
  return (
    <div className={props.isOpened ? 'popup popup_opened' : 'popup'} id={props.name}>
      <div className="popup__container popup__container_form popup__container_target">
        <button className="popup__buttons-close" type="button" onClick={props.onClose}/>
        <h3 className="popup__title">{props.title}</h3>
        <form className="popup__form" name={props.name} noValidate="">
          {props.children}
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm