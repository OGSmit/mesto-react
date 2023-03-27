import '../index.css';
import { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/Api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(false);
  const [cardForRemove, setCardForRemove] = useState({})

  function handleCardRemoveClick(card) {
    // Не знал как лучше ч.1, но работает )
    setIsConfirmDeletePopupOpen(true);
    setCardForRemove(card)
  }

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
    setIsConfirmDeletePopupOpen(false);
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
        .catch(err => console.log(`Упс ${err}`))
    } else {
      api.addlikeCard(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(err => console.log(`Упс ${err}`))
    }
  }

  function handleCardDelete(e) {
    // Не знал как лучше ч.2, но работает )
    e.preventDefault();
    api.removeCard(cardForRemove._id)
      .then(() => {
        const updatedCards = cards.filter((element) => {
          if (element._id !== cardForRemove._id) {
            return element
          }
        })
        setCards([...updatedCards]);
        setIsConfirmDeletePopupOpen(false);
      })
      .catch(err => console.log(`Упс ${err}`))
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
      .catch(err => console.log(`Упс ${err}`))
  }

  function handleUpdateAvatar(item) {
    api.editAvatar(item)
      .then((data) => {
        setCurrentUser({ ...currentUser, ...data });
        closeAllPopups();
      })
      .catch(err => console.log(`Упс ${err}`))
  }

  function handleAddPlaceSubmit(item) {
    api.addCard(item)
      .then((data) => {
        setCards([
          data,
          ...cards
        ]);
        closeAllPopups();
      })
      .catch(err => console.log(`Упс ${err}`))
  }

  useEffect(() => {
    api.getProfile()
      .then((data) => {
        setCurrentUser({
          ...currentUser,
          ...data
        });
      })
      .catch(err => console.log(`Component Main get ${err}`))
  }, []);

  useEffect(() => {
    api.getInitialCard()
      .then((data) => {
        setCards([...cards, ...data]);
      }).catch(err => console.log(`Component Main get ${err}`))
  }, []);

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser} >
        <Header />
        <Main onCardDelete={handleCardRemoveClick} cards={cards} onCardLike={handleCardLike} onCardClick={handleCardClick} onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} />
        <Footer />
        <ImagePopup isOpened={isImagePopupOpen} onClose={closeAllPopups} onCardClick={handleCardClick} card={selectedCard} />
        <EditProfilePopup onUpdateUser={handleUpdateUser} isOpened={isEditProfilePopupOpen} onClose={closeAllPopups} />
        <AddPlacePopup onAddPlace={handleAddPlaceSubmit} isOpened={isAddPlacePopupOpen} onClose={closeAllPopups} />
        <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpened={isEditAvatarPopupOpen} onClose={closeAllPopups} />
        <ConfirmDeletePopup isOpened={isConfirmDeletePopupOpen} onClose={closeAllPopups} onSubmit={handleCardDelete}/>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
