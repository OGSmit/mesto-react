import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditAvatarPopup(props) {

  const inputRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: inputRef.current.value
    });
    inputRef.current.value = '';
  }

  return (
    <PopupWithForm onSubmit={handleSubmit} buttonText="Сохранить" isOpened={props.isOpened} onClose={props.onClose} name="popup_edit-avatar" title="Обновить аватар">
      <input

        ref={inputRef}
        type="url"
        id="link"
        className="popup__inputs popup__inputs_type_hobby"
        placeholder="Ссылка на картинку"
        name="avatar"
        required=""
      />
      <span className="link-error popup__input-error" />
    </PopupWithForm>
  )
}

export default EditAvatarPopup;