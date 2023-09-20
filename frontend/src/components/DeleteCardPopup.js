import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup ({isOpen, onClose, onCardDelete, cardToDelete, isLoading}) {

  function handleDelete(e) {
    e.preventDefault();
    onCardDelete(cardToDelete);
  } 

  return (
    <PopupWithForm
    title={'Вы уверены?'} 
    isOpen={isOpen} 
    onClose={onClose} 
    submitButtonText = {'Сохранить'}
    onSubmit={handleDelete}
    isLoading={isLoading}
    isValid={true}/>
  )
}

export default DeleteCardPopup;