// Class to handle basic form functionality
/**
 * @param {object} options input, must be an object that has properties:
 * "form" - form element,
 * "initialData" - initial form elements values
 * "onDataChange" - callback function on every data update
 */
class FormManager {
  constructor(options) {
    this.form = options.form;
    this._formData_ = options.initialData || {};
    this.options = options;
  }

  get formData () {
    return this._formData_
  }

  set formData (formElement) {
    this._formData_ = {
      ...this._formData_,
      [formElement.name]: formElement.value
    }
  }

  onFormChange = (event) => {
    const formElement = event.target;
    this.formData = formElement;
    this.options.onDataChange(this._formData_);
  }

  init = () => {
    this.form.addEventListener('change', this.onFormChange);
  };
}

// Class to handle basic form functionality
/**
 * @param {Node} element must be an Node of input element
 * @param {boolean} show show or not error mesage, true by default
 * @param {object} customMessage must be an object that has properties:
 * "replace" {boolean} - to replace bindings in default message or use text from "error" property,
 * "error" {string} - use text from this property as error message
 * "fieldValue" {object} - object where property name is a binded property in text as {propertyName} and property value as a text for replacement
 * @example if default message is "Hello {text}" and customMessage object is { replace: true, fields: { text: 'World!' } } result string will be "Hello World!"
 */
function showError(element, show = true, customMessage = null) {
  const formElementWrapper = element.closest('[form-element-wrapper]');
  if (customMessage) {
    const isReplacable = customMessage.replace;
    const errorMessageElement = formElementWrapper.querySelector('[form-element-error]');
    if (isReplacable) {
      let defaultMessage = errorMessageElement.getAttribute('form-default-error-message');
      for (const [fieldName, fieldValue] of Object.entries(customMessage.fields)) {
        defaultMessage = defaultMessage.replace(`{${fieldName}}`, fieldValue);
      }
      errorMessageElement.innerText = defaultMessage;
    } else {
      errorMessageElement.innerText = customMessage.error;
    }
  }
  if (show) {
    formElementWrapper.classList.add('has-error');
  } else {
    formElementWrapper.classList.remove('has-error');
  }
}

function initMatchTextInputs(elements, matchFunction) {
  elements.forEach(element => {
    element.addEventListener('input', function(event) {
      const input = event.target;
      const value = input.value;
      const isMatch = matchFunction(value);
      showError(input, !input.value ? false : !isMatch);
    });
  });
}

export {
  FormManager,
  showError,
  initMatchTextInputs
}
