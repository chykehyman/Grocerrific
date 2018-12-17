/**
 * @function validateFormData
 *
 * @param {object} formData
 *
 * @returns {object}
 */
export default (name) => {
  const minLength = 3;
  const error = {};

  const trimmedName = name.trim();

  if (!(trimmedName === '' || trimmedName.length < minLength)) {
    if (!(/[a-zA-z ]/.test(trimmedName))) {
      error.name = 'field must only contain letters';
    }
  } else {
    error.name = `A minimum of ${minLength} characters is required`;
  }

  return { error, isValid: Object.keys(error).length === 0 };
};
