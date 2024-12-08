function toggleInputError(input, errorArea, message, isError, validationConfig) {
  if (isError) {
    input.classList.add(validationConfig.inputErrorClass);
    errorArea.classList.add(validationConfig.errorClass)
    errorArea.textContent = message;
  } else {
    input.classList.remove(validationConfig.inputErrorClass);
    errorArea.classList.remove(validationConfig.errorClass)
    errorArea.textContent = ''
  }
}

export function enableValidation(validationConfig, pattern) {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector))
    inputList.forEach((inputItem) => {
      setEventListeners(formElement, inputItem, validationConfig, pattern)
    })
  });
};

function setEventListeners(formElement, inputItem, validationConfig, pattern) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector)

  toggleButtonState(inputList, buttonElement, validationConfig, pattern)

  inputItem.addEventListener('input', function () {
    checkInputValidity(inputItem, pattern, validationConfig);
    toggleButtonState(inputList, buttonElement, validationConfig, pattern)
  });
};

function toggleButtonState(inputList, buttonElement, validationConfig, pattern) {
  if(hasInvalidInput(inputList, pattern)) {
    buttonElement.classList.add(validationConfig.inactiveButtonClass)
    buttonElement.classList.add(validationConfig.noHoverButton)
    buttonElement.disabled = true
  }
  else {
    buttonElement.classList.remove(validationConfig.inactiveButtonClass)
    buttonElement.classList.remove(validationConfig.noHoverButton)
    buttonElement.disabled = false
  }
}

function hasInvalidInput(inputList, pattern) {
  return inputList.some((inputItem) => {
    const trimmedValue = inputItem.value.trim();

    return !inputItem.validity.valid || 
      (!inputItem.hasAttribute('type') || inputItem.getAttribute('type') !== 'url') && !pattern.test(trimmedValue);
  });
}


function checkInputValidity(inputElement, pattern, validationConfig) {
  if (inputElement.type === 'text' && inputElement.value.trim() === '') {
    toggleInputError(inputElement, inputElement.nextElementSibling, 'Заполните это поле', true, validationConfig);
    return false;
  }

  if (!inputElement.validity.valid) {
    toggleInputError(inputElement, inputElement.nextElementSibling, inputElement.validationMessage, true, validationConfig);
    return false;
  } 
  else if (!(inputElement.hasAttribute('type') && inputElement.getAttribute('type') === 'url') && !pattern.test(inputElement.value)) {
    toggleInputError(inputElement, inputElement.nextElementSibling, inputElement.dataset.errorMessage, true, validationConfig);
    return false;
  } 
  else {
    toggleInputError(inputElement, inputElement.nextElementSibling, '', false, validationConfig);
    return true;
  }
}

export function clearPopupValidation(formSelector, validationConfig) {
  const inputList = Array.from(formSelector.querySelectorAll(validationConfig.inputSelector));
  const button = formSelector.querySelector(validationConfig.submitButtonSelector);

  inputList.forEach((input) => {
    const errorArea = input.nextElementSibling;
    toggleInputError(input, errorArea, '', false, validationConfig);
  });

  updateButtonState(button, false, validationConfig);
}

export function updateButtonState(button, isValid, validationConfig) {
  if (isValid) {
    button.classList.remove(validationConfig.inactiveButtonClass);
    button.classList.remove(validationConfig.noHoverButton);
    button.disabled = false;
  } else {
    button.classList.add(validationConfig.inactiveButtonClass);
    button.classList.add(validationConfig.noHoverButton);
    button.disabled = true;
  }
}

export function ClearFormsValue(form, validationConfig) {
  const formInputs = Array.from(form.querySelectorAll(validationConfig.inputSelector))
  formInputs.forEach((inputItem) => {
    if(inputItem.classList.contains('popup__input')) {
      inputItem.value = ''
    }
  })
}