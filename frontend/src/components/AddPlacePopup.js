import React, { useState,useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js'
import { useFormAndValidation } from '../hooks/useFormAndValidation.js';


function AddPlacePopup ({isOpen, onClose, onAddPlace, isLoading}) {

  
  const {values, handleChange, errors, isValid, setValues, resetForm} = useFormAndValidation();

  function handleSubmit (e) {
    e.preventDefault();
    onAddPlace ({
      name: values.name,
      link: values.link
    });
  }

useEffect (()=>{
  resetForm();
},[isOpen])

  return(
    <PopupWithForm name={'place'} 
      title={'Новое место'} 
      isOpen={isOpen} 
      onClose={onClose} 
      submitButtonText = {'Сохранить'}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isValid={isValid}>
      <div className="form__input-wrap">
        <input type="text"
        value={values.name||""} 
        name="name" 
        placeholder="Назавание" 
        className={`form__input place-form__input place-form__input_type_name ${errors.name ? 'form__input_disabled':''}`}
        required
        minLength="2" maxLength="30" 
        noValidate
        onChange={handleChange}/>

        <div className="form__error-message placeName-error-message">{errors.name}</div>
      </div>
      
      <div className="form__input-wrap">
        <input type="url" 
        value={values.link||""} 
        name="link"
        placeholder="Ссылка на картинку" 
        className={`form__input place-form__input place-form__input_type_link ${errors.link ? 'form__input_disabled':''}`}
        required
        noValidate
        onChange={handleChange}/>

        <div className="form__error-message placeImageLink-error-message">{errors.link}</div>
      </div>
    </PopupWithForm>
  )
}

export default AddPlacePopup;