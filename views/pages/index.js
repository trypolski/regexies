import regexies from '../../index';
import {
  FormManager,
  showError,
  initMatchTextInputs
} from '../components/forms/forms';
import {
  initNavigation
} from '../components/navigation/navigation';

const MAX_RULES = 5;

let customPasswordOptions = {
  minLengthPassword: '8',
  maxLengthPassword: '16',
  specialCharactersPassword: '!"§$%&()=?*+#,.;:_-'
}

const addRuleButton = document.querySelector('[data-action="create-is-add-rule"]');
const rulesListWrapper = document.querySelector('[data-action="create-is-rules-list"]');
const ruleItemWrapperExample = document.querySelector('[data-action="create-is-rule-item-example"]');
const createIsInput = document.querySelector('[data-action="create-is-example"]');
const createIsRegexSpan = document.querySelector('[data-action="create-is-regex"]');
let savedRules = [];

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

function showAddRuleForm(show, addRuleForm) {
  if (show) {
    addRuleButton.disabled = true;
    addRuleForm.classList.remove('hidden');
  } else {
    addRuleButton.disabled = false;
    addRuleForm.reset();
    addRuleForm.classList.add('hidden');
  }
}

function renderSavedRules() {
  rulesListWrapper.innerHTML = '';
  savedRules.forEach((rule) => {
    const newRuleElement = ruleItemWrapperExample.cloneNode(true); 
    newRuleElement.title = JSON.stringify(rule);
    newRuleElement.querySelector('[data-action="create-is-rule-item-index"]').innerText = rule.id;
    rulesListWrapper.appendChild(newRuleElement);
    const deleteRuleButton = newRuleElement.querySelector('[data-action="create-is-delete-rule"]');
    deleteRuleButton.dataset.ruleId = rule.id;
    deleteRuleButton.addEventListener('click', removeRule);
    newRuleElement.classList.remove('hidden');
  });
  rulesListWrapper.classList.remove('hidden');
  const customRegex = regexies.createIs(savedRules);
  createIsRegexSpan.innerText = customRegex;
  handleCustomCreateIsInput(createIsInput);
  createIsInput.removeEventListener('input', handleCustomCreateIsInput);
  createIsInput.addEventListener('input', handleCustomCreateIsInput);
}

function removeRule(e) {
  savedRules = savedRules.filter(rule => rule.id !== Number(e.target.dataset.ruleId));
  checkMaxRules();
  renderSavedRules();
}

function checkMaxRules() {
  if (savedRules.length < MAX_RULES) {
    addRuleButton.disabled = false;
  } else {
    addRuleButton.disabled = true;
  }
}

function handleCustomCreateIsInput(eventOrElement) {
  const input = eventOrElement instanceof Event ? eventOrElement.target : eventOrElement;
  const value = input.value;
  if (value) {
    const isMatch = regexies.is(value, savedRules);
    showError(input, !isMatch);
  } else {
    showError(input, false);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
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

  const createIsFormElement = document.querySelector('[data-action="create-is-form"]');
  const createIsFormOptions = {
    form: createIsFormElement,
    initialData: {
      numbers: false,
      lettersCountry: 'en',
      lettersAll: false,
      lettersCapital: false,
      lettersLowercase: false,
      minLength: undefined,
      maxLength: undefined,
      specialCharacters: '',
      optional: false,
      exact: '',
      range: '',
    }
  };
  const createIsForm = new FormManager(createIsFormOptions);
  createIsForm.init();

  addRuleButton.addEventListener('click', () => showAddRuleForm(true, createIsFormElement));
  const cancelRuleButton = document.querySelector('[data-action="create-is-cancel-rule"]');
  cancelRuleButton.addEventListener('click', () => showAddRuleForm(false, createIsFormElement));
  const saveRuleButton = document.querySelector('[data-action="create-is-save-rule"]');
  saveRuleButton.addEventListener('click', () => {
    const rulesLength = savedRules.length;
    const ruleId = rulesLength ? savedRules[rulesLength - 1].id + 1 : 1;
    savedRules = savedRules.concat({ 
      id: ruleId,
      ...createIsForm.formData
    });
    renderSavedRules();
    showAddRuleForm(false, createIsFormElement);
    checkMaxRules();
    createIsForm.reset();
  });

  const createIsLettersAllCheckbox = createIsFormElement.querySelector('[name="lettersAll"]');
  const createIsLettersCapitalCheckbox = createIsFormElement.querySelector('[name="lettersCapital"]');
  const createIsLettersLowercaseCheckbox = createIsFormElement.querySelector('[name="lettersLowercase"]');
  createIsLettersAllCheckbox.addEventListener('change', (e) => {
    createIsLettersCapitalCheckbox.checked = e.target.checked;
    createIsLettersLowercaseCheckbox.checked = e.target.checked;
    createIsForm.updateFormElements([createIsLettersCapitalCheckbox, createIsLettersLowercaseCheckbox]);
  });
  [createIsLettersCapitalCheckbox, createIsLettersLowercaseCheckbox].forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      createIsLettersAllCheckbox.checked = createIsLettersCapitalCheckbox.checked && createIsLettersLowercaseCheckbox.checked;
      createIsForm.updateFormElement(createIsLettersAllCheckbox);
    });
  });
}, false);
