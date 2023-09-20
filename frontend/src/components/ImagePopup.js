import { usePopupClose } from "../hooks/usePopupClose";

function ImagePopup ({card,onClose}) {

  usePopupClose(card?.link, onClose)

  return (
  <section className={`popup popup_dark popup_photo ${card ? 'popup_opened' : ''}`} onClick ={onClose} >
    <div className="popup__wrap">
      <div className="popup__close" onClick ={onClose}></div>
      <div className="photo-popup">
        <img src = {card&&card.link} alt={card&&card.name} className = "photo-popup__photo"/> 
        <p className="photo-popup__description">{card&&card.name}</p>
      </div>
    </div>
  </section>
  )
}

export default ImagePopup;