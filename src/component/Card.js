
function Card(props) {

  function handleCardClick() {
    props.onCardClick(props.card);
  }

  return (<div className="place-card">
    <img
      src={props.link}
      alt={props.name}
      className="place-card__image"
      onClick={handleCardClick}
    />
    <button className="place-card__buttons-delete" type="button" />
    <div className="place-card__container">
      <h2 className="place-card__subtitle">{props.name}</h2>
      <div className="place-card__like-container">
        <button className="place-card__buttons-like" type="button" />
        <p className="place-card__like-counter">{props.likes.length}</p>
      </div>
    </div>
  </div>)
}

export default Card;