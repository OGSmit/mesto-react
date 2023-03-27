import PopupWithForm from "./PopupWithForm";

function ConfirmDeletePopup({isOpened, onClose, onSubmit}) {

  return(
    <PopupWithForm isOpened={isOpened} title="хотите удалить ?"  buttonText='Да' onClose={onClose} onSubmit={onSubmit}/>
  )
}

export default ConfirmDeletePopup