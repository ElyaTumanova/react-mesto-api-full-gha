import IconSucsess from '../images/info-tooltip-icon_success.svg'
import IconFailed from '../images/info-tooltip-icon_failed.svg'

import { usePopupClose } from "../hooks/usePopupClose";

function InfoTooltip ({isRegisteredPopupOpen, isRegistered, onClose}) {

  usePopupClose(isRegisteredPopupOpen, onClose)

  return (
  <section className={`popup popup_dark ${isRegisteredPopupOpen ? 'popup_opened' : ''}`} onClick ={onClose} >
    <div className="popup__wrap">
      <div className="popup__close" onClick ={onClose}></div>
      <div className="info-popup">
        {isRegistered && <img src={IconSucsess} className="info-popup__image" alt="Успешная регистрация"></img>}
        {!isRegistered && <img src={IconFailed} className="info-popup__image" alt="Неуспешная регистрация"></img>}
        {isRegistered && <p className="info-popup__message">Вы успешно зарегистрировались!</p>}
        {!isRegistered && <p className="info-popup__message">Что-то пошло не так! Попробуйте ещё раз.</p>}
      </div>
    </div>
  </section>
  )
}

export default InfoTooltip;