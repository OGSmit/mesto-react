import '../index.css';
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/Api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';

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

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (isLiked) {
      api.removelikeCard(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
    } else {
      api.addlikeCard(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
    }
  }

  function handleCardDelete(card) {
    api.removeCard(card._id)
      .then(() => {
        const updatedCards = cards.filter((element) => {
          if (element._id !== card._id) {
            return element
          }
        })
        setCards([...updatedCards])
      })
  }

  function handleUpdateUser(item) {
    api.editProfile(item)
    .then((data) => {
      setCurrentUser({
        ...currentUser,
        ...data
      });
      closeAllPopups();
    })
  }

  function handleUpdateAvatar(item) {
    api.editAvatar(item)
    .then((data) => {
      setCurrentUser({...currentUser, ...data});
      closeAllPopups();
    })
  }

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getProfile()
      .then((data) => {
        setCurrentUser({
          ...currentUser,
          ...data
        });
      })
      .catch(err => console.log(`Component Main get ${err}`))
  }, []);

  React.useEffect(() => {
    api.getInitialCard()
      .then((data) => {
        setCards([...cards, ...data]);
      }).catch(err => console.log(`Component Main get ${err}`))
  }, []);


  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser} >
        <Header />
        <Main onCardDelete={handleCardDelete} cards={cards} onCardLike={handleCardLike} onCardClick={handleCardClick} onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} />
        <Footer />
        <ImagePopup isOpened={isImagePopupOpen} onClose={closeAllPopups} onCardClick={handleCardClick} card={selectedCard} />
        <EditProfilePopup onUpdateUser={handleUpdateUser} isOpened={isEditProfilePopupOpen} onClose={closeAllPopups} />
        <PopupWithForm buttonText="Добавить" isOpened={isAddPlacePopupOpen} onClose={closeAllPopups} name="popup_add-card" title="Новое место">
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
        </PopupWithForm>
        <EditAvatarPopup  onUpdateAvatar={handleUpdateAvatar} isOpened={isEditAvatarPopupOpen} onClose={closeAllPopups}/>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
