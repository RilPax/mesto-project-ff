function toggleInputError(input, errorArea, message, isError, validationConfig) {
  if (isError) {
    input.classList.add(validationConfig.inputErrorClass);
    errorArea.style.display = 'block';
    errorArea.textContent = message;
  } else {
    input.classList.remove(validationConfig.inputErrorClass);
    errorArea.style.display = 'none';
    errorArea.textContent = '';
  }
}

export function updateButtonState(button, isValid, validationConfig) {
  if (isValid) {
    button.classList.remove(validationConfig.inactiveButtonClass);
    button.classList.remove('no-hover');
    button.disabled = false;
  } else {
    button.classList.add(validationConfig.inactiveButtonClass);
    button.classList.add('no-hover');
    button.disabled = true;
  }
}

function validateForm(formSelector, validationConfig, pattern) {
  const inputList = Array.from(formSelector.querySelectorAll(validationConfig.inputSelector));
  const button = formSelector.querySelector(validationConfig.submitButtonSelector);

  let isFormValid = true;

  inputList.forEach((input) => {
    const errorArea = input.nextElementSibling;

    if (!input.validity.valid) {
      toggleInputError(input, errorArea, input.validationMessage, true, validationConfig);
      isFormValid = false;
    } else if (input.type !== "url" && !pattern.test(input.value)) {
      toggleInputError(input, errorArea, input.dataset.errorMessage, true, validationConfig);
      isFormValid = false;
    } else {
      toggleInputError(input, errorArea, '', false, validationConfig);
    }
  });

  updateButtonState(button, isFormValid, validationConfig);
}

export function enableValidation(validationConfig, pattern) {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));

  formList.forEach((formSelector) => {
    const inputList = Array.from(formSelector.querySelectorAll(validationConfig.inputSelector));
    const button = formSelector.querySelector(validationConfig.submitButtonSelector);

    updateButtonState(button, formSelector.checkValidity(), validationConfig);

    inputList.forEach((input) => {
      input.addEventListener('input', () => validateForm(formSelector, validationConfig, pattern));
    });
  });
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
