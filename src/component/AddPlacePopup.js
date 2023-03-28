import { useState, useEffect } from "react"
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {

  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name,
      link
    })
  }

  function handleChangeName(e) {
    setName(e.target.value)
  }

  function handleChangeLink(e) {
    setLink(e.target.value)
  }

  useEffect(() => {
    setName('');
    setLink('');
  }, [props.isOpened])


  return (
    <PopupWithForm onSubmit={handleSubmit} 
                   buttonText={props.isOpened && props.isApiProcessing ? 'Добавляю...' : 'Добавить'} 
                   isOpened={props.isOpened} 
                   onClose={props.onClose} 
                   name="popup_add-card" 
                   title="Новое место">
      <input
        value={name || ''}
        onChange={handleChangeName}
        type="text"
        id="place"
        className="popup__inputs popup__inputs_type_name"
        placeholder="Название"
        name="name"
        minLength={2}
        maxLength={40}
        required=""
      />
      <span className="place-error popup__input-error" />
      <input
        value={link || ''}
        onChange={handleChangeLink}
        type="url"
        id="place-link"
        className="popup__inputs popup__inputs_type_hobby"
        placeholder="Ссылка на картинку"
        name="link"
        required=""
      />
      <span className="place-link-error popup__input-error" />
    </PopupWithForm>
  )
}

export default AddPlacePopup