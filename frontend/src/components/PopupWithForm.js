import { usePopupClose } from "../hooks/usePopupClose";

function PopupWithForm ({name, isOpen, onClose, title, children, submitButtonText, onSubmit, isLoading, isValid}) {

  usePopupClose(isOpen, onClose)

  return (
    <section className={`popup popup_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__wrap">
        <div className="popup__close" onClick = {onClose}></div>
      <div className="popup__container">  
        <h3 className="popup__header">{title}</h3>
        <form className={`form ${name}-form`} name={`${name}Form`} onSubmit={onSubmit}>
          {children}
          <button className={`form__submit-button ${name}-form__submit-button ${!isValid ?'form__submit-button_disabled' : ''}`}>{isLoading ? 'Сохранение...' : submitButtonText}</button>
        </form>
      </div>  
      </div>
    </section>
  )
}

export default PopupWithForm;