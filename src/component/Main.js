import '../index.css';
import React from 'react';
import api from '../utils/Api';
import Card from './Card';

function Main(props) {

  const [userName, setUserName] = React.useState('');
  const [userDescription, setuserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getProfile()
      .then((data) => {
        setUserName(data.name);
        setuserDescription(data.about);
        setUserAvatar(data.avatar)
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
    <main className="main">
      <section className="profiles">
        <div className="profiles__column">
          <div className="profiles__container">
            <img
              alt="Аватар профиля"
              src={userAvatar}
              className="profiles__avatar"
            />
            <button className="profiles__buttons-avatar" onClick={props.onEditAvatar} type="button" />
          </div>
          <div className="profiles__row">
            <h1 className="profiles__name">{userName}</h1>
            <button className="profiles__buttons-edit" onClick={props.onEditProfile} type="button" />
          </div>
          <p className="profiles__subtitle">{userDescription}</p>
          <button className="profiles__buttons-add" onClick={props.onAddPlace} type="button" />
        </div>
      </section>
      <section className="profile-content">
        {cards.map((card) => {
          return (
            <Card key={card._id} onCardClick={props.onCardClick} card={card} name={card.name} link={card.link} likes={card.likes} />
          )
        })}
      </section>
    </main>
  )
}
export default Main