import {useEffect, useState, useContext} from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  function handleChangeName(e) {
    setName(e.target.value)
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value)
  }


  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpened]);

  return (
    <PopupWithForm onSubmit={handleSubmit} buttonText={props.isOpened && props.isApiProcessing? 'Сохраняю...' : 'Сохранить'} isOpened={props.isOpened} onClose={props.onClose} name="popup_edit-profile" title="Редактировать профиль">
      <input
        value={name || ''}
        onChange={handleChangeName}
        id="username"
        type="text"
        className="popup__inputs popup__inputs_type_name"
        name="name"
        placeholder="Имя"
        minLength={2}
        maxLength={40}
        required=""
      />
      <span className="username-error popup__input-error" />
      <input
        value={description || ''}
        onChange={handleChangeDescription}
        id="hobby"
        type="text"
        className="popup__inputs popup__inputs_type_hobby"
        name="about"
        placeholder="Вид деятельности"
        minLength={2}
        maxLength={200}
        required=""
      />
      <span className="hobby-error popup__input-error" />
    </PopupWithForm>
  )
}

export default EditProfilePopup