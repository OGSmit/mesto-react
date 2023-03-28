import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {

  const inputRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: inputRef.current.value
    });
  }

  useEffect(() => {
    inputRef.current.value = '';
  }, [props.isOpened])

  return (
    <PopupWithForm onSubmit={handleSubmit} buttonText={props.isOpened && props.isApiProcessing ? 'Сохраняю...' : 'Сохранить'} isOpened={props.isOpened} onClose={props.onClose} name="popup_edit-avatar" title="Обновить аватар">
      <input
        ref={inputRef || ''}
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