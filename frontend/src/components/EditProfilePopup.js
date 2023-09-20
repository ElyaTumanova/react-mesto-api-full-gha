import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js'
import {CurrentUserContext} from '../contexts/CurrentUserContext.js'
import { useFormAndValidation } from '../hooks/useFormAndValidation.js';

function EditProfilePopup ({isOpen, onClose, onUpdateUser, isLoading}) {
  const currentUser = React.useContext(CurrentUserContext);
  const {values, handleChange, errors, isValid, setValues, resetForm, setIsValid, setErrors} = useFormAndValidation();

  React.useEffect(() => {
    let name = currentUser.name
    let about = currentUser.about
    setValues({name, about})
    setErrors ({});
    setIsValid(true);
  }, [currentUser, isOpen]);
  

  function handleSubmit (e) {
    e.preventDefault();
    onUpdateUser ({
      name: values.name,
      about: values.about
    })
  }

   return (<PopupWithForm name={'profile'} 
    title={'Редактировать профиль'} 
    isOpen={isOpen} 
    onClose={onClose} 
    submitButtonText = {'Сохранить'}
    onSubmit={handleSubmit}
    isLoading={isLoading}
    isValid={isValid}>
      <div className="form__input-wrap">
        <input type="text" 
        value = {values.name || ""}
        name="name" 
        placeholder="Введите имя" 
        className={`form__input profile-form__input profile-form__input_type_name ${errors.name ? 'form__input_disabled':''}`}
        required 
        minLength="2" maxLength="40" 
        noValidate
        onChange={handleChange}/>

        <div className="form__error-message profileName-error-message">{errors.name}</div>
      </div>

      <div className="form__input-wrap">
        <input type="text" 
        value = {values.about || ""}
        name="about"
        placeholder="Введите описание" 
        className={`form__input profile-form__input profile-form__input_type_descripton ${errors.about ? 'form__input_disabled':''}`} 
        required 
        minLength="2" maxLength="200" 
        noValidate
        onChange={handleChange}/>

        <div className="form__error-message profileDesccription-error-message">{errors.about}</div>
      </div>
    </PopupWithForm>
  )
}
export default EditProfilePopup;