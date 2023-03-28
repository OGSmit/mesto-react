import React from "react"

function ConfirmDeletePopup({ isOpened, onClose, onSubmit, isApiProcessing }) {

  return (
    <div className={isOpened ? 'popup popup_opened' : 'popup'} id="popup_confirm">
      <div className="popup__container popup__container_form popup__container_target">
        <form className="popup__form" onSubmit={onSubmit} name="confirm-form" novalidate>
          <button className="popup__buttons-close" onClick={onClose}  type="button"></button>
          <h3 className="popup__title" >Вы уверены?</h3>
          <button className="popup__buttons-save " type="submit">{isOpened && isApiProcessing ? 'Удаляю..' : 'Да'}</button>
        </form>
      </div>
    </div>
  )
}

export default ConfirmDeletePopup