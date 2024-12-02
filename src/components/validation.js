function checkValidationError(validationConfig, pattern) {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  
  formList.forEach((formSelector) => {
    const button = formSelector.querySelector(validationConfig.submitButtonSelector);
    const inputList = Array.from(formSelector.querySelectorAll(validationConfig.inputSelector));
    
    let isFormValid = true;

    inputList.forEach((inputSelector) => {
      const errorArea = inputSelector.nextElementSibling;

      if (!inputSelector.validity.valid) {
        inputSelector.classList.add(validationConfig.inputErrorClass);
        errorArea.style.display = 'block';
        errorArea.textContent = inputSelector.validationMessage;
        isFormValid = false; 
      } else if (inputSelector.type !== "url" && !pattern.test(inputSelector.value)) {
        inputSelector.classList.add(validationConfig.inputErrorClass);
        errorArea.style.display = 'block';
        errorArea.textContent = inputSelector.dataset.errorMessage;
        isFormValid = false; 
      } else {
        inputSelector.classList.remove(validationConfig.inputErrorClass);
        errorArea.style.display = 'none';
        errorArea.textContent = '';
      }
    });

    if (isFormValid) {
      button.classList.remove(validationConfig.inactiveButtonClass);
      button.classList.remove('no-hover');
      button.disabled = false; 
    } else {
      button.classList.add(validationConfig.inactiveButtonClass);
      button.classList.add('no-hover');
      button.disabled = true;
    }
  });
}



function clearPopupValidation(formSelector, validationConfig) {
  const inputList = Array.from(formSelector.querySelectorAll(validationConfig.inputSelector));
  const button = formSelector.querySelector(validationConfig.submitButtonSelector);

  inputList.forEach((inputSelector) => {
    const errorArea = inputSelector.nextElementSibling;
    inputSelector.classList.remove(validationConfig.inputErrorClass);
    errorArea.style.display = 'none';
    errorArea.textContent = '';
  });

  button.classList.remove(validationConfig.inactiveButtonClass);
  button.classList.remove('no-hover');
  button.disabled = false;
}


export function clearValidation(validationConfig, editPopup, addPopup, editProfileBtn, addCardBtn) {
  editProfileBtn.addEventListener('click', () => {clearPopupValidation(editPopup, validationConfig)})
  addCardBtn.addEventListener('click', () => {clearPopupValidation(addPopup, validationConfig)})
}

export function enableValidation(validationConfig, pattern) {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector))
  formList.forEach((formSelector) => {
    const inputList = Array.from(formSelector.querySelectorAll(validationConfig.inputSelector))
    inputList.forEach((inputSelector) => {
      inputSelector.addEventListener('input', () => {checkValidationError(validationConfig, pattern)})
    })
  })
}