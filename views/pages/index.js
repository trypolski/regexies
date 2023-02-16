import regexies from '../../index';
import {
  FormManager,
  showError,
  initMatchTextInputs
} from '../components/forms/forms';

let customPasswordOptions = {
  minLengthPassword: '8',
  maxLengthPassword: '16',
  specialCharactersPassword: '!"§$%&()=?*+#,.;:_-'
}

function handleCustomPasswordInput(eventOrElement) {
  const input = eventOrElement instanceof Event ? eventOrElement.target : eventOrElement;
  const value = input.value;
  const minLengthPassword = Number(customPasswordOptions.minLengthPassword);
  const maxLengthPassword = Number(customPasswordOptions.maxLengthPassword);
  const specialCharactersPassword = customPasswordOptions.specialCharactersPassword.replace(' ', '');
  const isMatch = regexies.isPassword(
    value,
    minLengthPassword,
    maxLengthPassword,
    specialCharactersPassword
  );
  showError(
    input,
    !input.value ? false : !isMatch,
    {
      replace: true,
      error: '',
      fields: {
        min: minLengthPassword,
        max: maxLengthPassword,
        character: specialCharactersPassword
      }
    }
  );
}

function initCustomPassword(element) {
  handleCustomPasswordInput(element);
  element.removeEventListener('input', handleCustomPasswordInput);
  element.addEventListener('input', handleCustomPasswordInput);
}

document.addEventListener('DOMContentLoaded', () => {
  const emailInputs = document.querySelectorAll('[data-action="match-email"]');
  initMatchTextInputs(emailInputs, regexies.isEmail);

  const passwordDefaultInput = document.querySelectorAll('[data-action="match-default-password"]');
  initMatchTextInputs(passwordDefaultInput, regexies.isPassword);

  const customPasswordInput = document.querySelector('[data-action="match-custom-password"]');
  initCustomPassword(customPasswordInput);
  const customPasswordFormElement = document.querySelector('[data-action="custom-password-form"]');
  const customPasswordFormOptions = {
    form: customPasswordFormElement,
    initialData: {
      minLengthPassword: '8',
      maxLengthPassword: '16',
      specialCharactersPassword: '!"§$%&()=?*+#,.;:_-'
    },
    onDataChange: (formData) => {
      customPasswordOptions = formData;
      const min = Number(formData.minLengthPassword);
      const max = Number(formData.maxLengthPassword);
      const formError = customPasswordFormElement.querySelector('[form-wrapper-error]');
      if (min > max) {
        formError.innerText = "Min length should be less than max length"
        customPasswordFormElement.classList.add('has-error');
      } else {
        customPasswordFormElement.classList.remove('has-error');
      }
      initCustomPassword(customPasswordInput);
    }
  };
  const customPasswordForm = new FormManager(customPasswordFormOptions);
  customPasswordForm.init();
}, false);
