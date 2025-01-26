// Fungsi error, harus mengisi teks
export function validateInput(input, errorMessage) {
  const errorElement = input.nextElementSibling;
  if (input.validity.valueMissing) {
    errorElement.textContent = errorMessage;
    return false;
  } else {
    errorElement.textContent = '';
    return true;
  }
}

// Fungsi error, title tidak boleh lebih dari 50 karakter
export function validateTitleLength(input, maxTitleLength) {
  const errorElement = input.nextElementSibling;
  if (input.value.length >= maxTitleLength) {
    errorElement.textContent = `Title cannot exceed ${maxTitleLength} characters.`;
    return false;
  } else {
    errorElement.textContent = '';
    return true;
  }
}
