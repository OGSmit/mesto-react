import '../index.css';
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
  }
  
  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard({
      ...selectedCard,
      name: card.name,
      link: card.link
    });
  }

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});


  return (
    <div className="page">
      <Header />
      <Main onCardClick={handleCardClick} onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} />
      <Footer />
      <ImagePopup isOpened={isImagePopupOpen} onClose={closeAllPopups} onCardClick={handleCardClick} card={selectedCard} />
      <PopupWithForm isOpened={isAddPlacePopupOpen} onClose={closeAllPopups} name="popup_add-card" title="Новое место">
        <input
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
          type="url"
          id="place-link"
          className="popup__inputs popup__inputs_type_hobby"
          placeholder="Ссылка на картинку"
          name="link"
          required=""
        />
        <span className="place-link-error popup__input-error" />
        <button className="popup__buttons-save " type="submit">
          Создать
        </button>
      </PopupWithForm>
      <PopupWithForm isOpened={isEditAvatarPopupOpen} onClose={closeAllPopups} name="popup_edit-avatar" title="Обновить аватар">
        <input
          type="url"
          id="link"
          className="popup__inputs popup__inputs_type_hobby"
          placeholder="Ссылка на картинку"
          name="avatar"
          required=""
        />
        <span className="link-error popup__input-error" />
        <button
          className="popup__buttons-save"
          style={{ marginTop: 16 }}
          type="submit"
        >
          Сохранить
        </button>
      </PopupWithForm>
      <PopupWithForm isOpened={isEditProfilePopupOpen} onClose={closeAllPopups} name="popup_edit-profile" title="Редактировать профиль">
        <input
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
        <button className="popup__buttons-save" type="submit">
          Сохранить
        </button>
      </PopupWithForm>
    </div>
  );
}

export default App;
