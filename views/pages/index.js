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

function handleUuidInput(eventOrElement) {
  const input = eventOrElement instanceof Event ? eventOrElement.target : eventOrElement;
  const value = input.value;
  if (value) {
    const onlyV4 = input.dataset.onlyV4 === 'true';
    const isMatch = regexies.isUuid(value, onlyV4);
    showError(input, !isMatch);
  } else {
    showError(input, false);
  }
}

function handleUrlInput(eventOrElement) {
  const input = eventOrElement instanceof Event ? eventOrElement.target : eventOrElement;
  const value = input.value;
  if (value) {
    const optionalProtocol = input.dataset.optionalProtocol === 'true';
    const isMatch = regexies.isUrl(value, !optionalProtocol);
    showError(input, !isMatch);
  } else {
    showError(input, false);
  }
}

function handleHexColorInput(eventOrElement) {
  const input = eventOrElement instanceof Event ? eventOrElement.target : eventOrElement;
  const value = input.value;
  if (value) {
    const optionalHash = input.dataset.optionalHash === 'true';
    const isMatch = regexies.isHexColor(value, !optionalHash);
    showError(input, !isMatch);
  } else {
    showError(input, false);
  }
}

function createMimeTypesList (mimeTypesString) {
  if (mimeTypesString) {
    return mimeTypesString.replace(' ', '').split(',');
  }
}

function handleImageMimeTypeInput(eventOrElement) {
  const input = eventOrElement instanceof Event ? eventOrElement.target : eventOrElement;
  const value = input.value;
  if (value) {
    const additionalMimeTypes = input.dataset.additionalMimeTypes;
    const isMatch = regexies.isImageMimetype(value, createMimeTypesList(additionalMimeTypes));
    showError(input, !isMatch);
  } else {
    showError(input, false);
  }
}

function handleAudioMimeTypeInput(eventOrElement) {
  const input = eventOrElement instanceof Event ? eventOrElement.target : eventOrElement;
  const value = input.value;
  if (value) {
    const additionalMimeTypes = input.dataset.additionalMimeTypes;
    const isMatch = regexies.isAudioMimetype(value, createMimeTypesList(additionalMimeTypes));
    showError(input, !isMatch);
  } else {
    showError(input, false);
  }
}

function handleVideoMimeTypeInput(eventOrElement) {
  const input = eventOrElement instanceof Event ? eventOrElement.target : eventOrElement;
  const value = input.value;
  if (value) {
    const additionalMimeTypes = input.dataset.additionalMimeTypes;
    const isMatch = regexies.isVideoMimetype(value, createMimeTypesList(additionalMimeTypes));
    showError(input, !isMatch);
  } else {
    showError(input, false);
  }
}

function handleMimeTypeInput(eventOrElement) {
  const input = eventOrElement instanceof Event ? eventOrElement.target : eventOrElement;
  const value = input.value;
  if (value) {
    const mimeTypePrefix = input.dataset.prefixMimeTypes;
    const additionalMimeTypes = input.dataset.additionalMimeTypes;
    const preparedMimeTypes = additionalMimeTypes ? createMimeTypesList(additionalMimeTypes) : [];
    const isMatch = regexies.isMimetype(value, mimeTypePrefix, preparedMimeTypes);
    showError(input, !isMatch);
  } else {
    showError(input, false);
  }
}

function handleSlugInput(eventOrElement) {
  const input = eventOrElement instanceof Event ? eventOrElement.target : eventOrElement;
  const value = input.value;
  if (value) {
    const separator = input.dataset.slugSeparator || '_';
    const language = input.dataset.slugLanguage || 'en';
    const isMatch = regexies.isSlug(value, separator, language);
    showError(input, !isMatch);
  } else {
    showError(input, false);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Navigation
  initNavigation();
  // Email example
  const emailInputs = document.querySelectorAll('[data-action="match-email"]');
  initMatchTextInputs(emailInputs, regexies.isEmail);
  // Password examples
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

  // CreateIs function constructor
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

  // Escape example
  const escapeInput = document.querySelector('[data-action="escape-example-input"]');
  const escapeResultSpan = document.querySelector('[data-action="escape-example-result"]');
  escapeInput.addEventListener('input', (event) => {
    const value = event.target.value;
    const escapedString = regexies.escape(value);
    escapeResultSpan.innerText = escapedString;
  });

  // UUID example
  const uuidInput = document.querySelector('[data-action="match-uuid"]');
  const uuidV4Checkbox = document.querySelector('[data-action="match-uuid-v4"]');
  uuidInput.addEventListener('input', handleUuidInput);
  uuidV4Checkbox.addEventListener('input', (event) => {
    uuidInput.dataset.onlyV4 = event.target.checked ? 'true' : 'false';
    handleUuidInput(uuidInput);
  });

  // Bearer example
  const bearerInput = document.querySelectorAll('[data-action="match-bearer-token"]');
  initMatchTextInputs(bearerInput, regexies.isBearer);

  // JWT example
  const jwtInput = document.querySelectorAll('[data-action="match-jwt-token"]');
  initMatchTextInputs(jwtInput, regexies.isJwt);

  // Url example
  const urlInput = document.querySelector('[data-action="match-url"]');
  const urlOptionalProtocolCheckbox = document.querySelector('[data-action="match-url-protocol"]');
  urlInput.addEventListener('input', handleUrlInput);
  urlOptionalProtocolCheckbox.addEventListener('input', (event) => {
    urlInput.dataset.optionalProtocol = event.target.checked ? 'true' : 'false';
    handleUrlInput(urlInput);
  });

  // Hex color example
  const hexColorInput = document.querySelector('[data-action="match-hex-color"]');
  const hexColorHashCheckbox = document.querySelector('[data-action="match-hex-color-hash"]');
  hexColorInput.addEventListener('input', handleHexColorInput);
  hexColorHashCheckbox.addEventListener('input', (event) => {
    hexColorInput.dataset.optionalHash = event.target.checked ? 'true' : 'false';
    handleHexColorInput(hexColorInput);
  });

  // Image MIME type
  const imageMimeTypeInput = document.querySelector('[data-action="match-image-mimetype"]');
  const imageMimeTypeAdditionalInput = document.querySelector('[data-action="match-image-mimetype-additional"]');
  imageMimeTypeInput.addEventListener('input', handleImageMimeTypeInput);
  imageMimeTypeAdditionalInput.addEventListener('input', (event) => {
    imageMimeTypeInput.dataset.additionalMimeTypes = event.target.value;
    handleImageMimeTypeInput(imageMimeTypeInput);
  });

  // Audio MIME type
  const audioMimeTypeInput = document.querySelector('[data-action="match-audio-mimetype"]');
  const audioMimeTypeAdditionalInput = document.querySelector('[data-action="match-audio-mimetype-additional"]');
  audioMimeTypeInput.addEventListener('input', handleAudioMimeTypeInput);
  audioMimeTypeAdditionalInput.addEventListener('input', (event) => {
    audioMimeTypeInput.dataset.additionalMimeTypes = event.target.value;
    handleAudioMimeTypeInput(audioMimeTypeInput);
  });

  // Video MIME type
  const videoMimeTypeInput = document.querySelector('[data-action="match-video-mimetype"]');
  const videoMimeTypeAdditionalInput = document.querySelector('[data-action="match-video-mimetype-additional"]');
  videoMimeTypeInput.addEventListener('input', handleVideoMimeTypeInput);
  videoMimeTypeAdditionalInput.addEventListener('input', (event) => {
    videoMimeTypeInput.dataset.additionalMimeTypes = event.target.value;
    handleVideoMimeTypeInput(videoMimeTypeInput);
  });

  // MIME type
  const mimeTypeInput = document.querySelector('[data-action="match-mimetype"]');
  const mimeTypePrefixInput = document.querySelector('[data-action="match-mimetype-prefix"]');
  const mimeTypeAdditionalInput = document.querySelector('[data-action="match-mimetype-additional"]');
  mimeTypeInput.dataset.prefixMimeTypes = mimeTypePrefixInput.value;
  mimeTypeInput.dataset.additionalMimeTypes = createMimeTypesList(mimeTypeAdditionalInput.value);
  mimeTypeInput.addEventListener('input', handleMimeTypeInput);
  mimeTypePrefixInput.addEventListener('input', (event) => {
    mimeTypeInput.dataset.prefixMimeTypes = event.target.value;
    handleMimeTypeInput(mimeTypeInput);
  });
  mimeTypeAdditionalInput.addEventListener('input', (event) => {
    mimeTypeInput.dataset.additionalMimeTypes = event.target.value;
    handleMimeTypeInput(mimeTypeInput);
  });

  // Numbers example
  const numbersInputs = document.querySelectorAll('[data-action="match-numbers"]');
  initMatchTextInputs(numbersInputs, regexies.isNumbersOnly);

  // ObjectId/MongoId example
  const mongoIdInputs = document.querySelectorAll('[data-action="match-mongoid"]');
  initMatchTextInputs(mongoIdInputs, regexies.isMongoId);

  // Roman number example
  const romanNumberInputs = document.querySelectorAll('[data-action="match-roman-number"]');
  initMatchTextInputs(romanNumberInputs, regexies.isRomanNumber);

  // Twitter example
  const twitterInputs = document.querySelectorAll('[data-action="match-twitter"]');
  initMatchTextInputs(twitterInputs, regexies.isTwitterHandle);

  // LinkedIn example
  const linkedInInputs = document.querySelectorAll('[data-action="match-linkedin"]');
  initMatchTextInputs(linkedInInputs, regexies.isLinkedInProfileUrl);

  // Facebook example
  const facebookInputs = document.querySelectorAll('[data-action="match-facebook"]');
  initMatchTextInputs(facebookInputs, regexies.isFacebookProfileUrl);

  // Slug example
  const slugInput = document.querySelector('[data-action="match-slug"]');
  const slugSeparatorInput = document.querySelector('[data-action="match-slug-separator"]');
  const slugLanguageSelect = document.querySelector('[data-action="match-slug-language"]');
  slugInput.dataset.slugSeparator = slugSeparatorInput.value;
  slugInput.dataset.slugLanguage = slugLanguageSelect.value;
  slugInput.addEventListener('input', handleSlugInput);
  slugSeparatorInput.addEventListener('input', (event) => {
    slugInput.dataset.slugSeparator = event.target.value;
    handleSlugInput(slugInput);
  });
  slugLanguageSelect.addEventListener('input', (event) => {
    slugInput.dataset.slugLanguage = event.target.value;
    handleSlugInput(slugInput);
  });
}, false);
