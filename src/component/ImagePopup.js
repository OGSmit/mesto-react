
function ImagePopup(props) {

  return(
    <div className={props.isOpened? 'popup popup_dark popup_opened' : 'popup popup_dark'} id="popup_image">
        <div className="popup__container popup__container_target">
          <button className="popup__buttons-close" type="button" onClick={props.onClose}/>
          <img
            src={props.card.link}
            alt="фотография города Карачаевск"
            className="popup__image"
          />
          <h2 className="popup__subtitle">{props.card.name}</h2>
        </div>
      </div>
  )
}

export default ImagePopup