const STORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');
populateFormFromLS();

//

form.addEventListener('input', onFormInput);
form.addEventListener('submit', onFormSubmit);

//

function onFormInput() {
  const { email, message } = form.elements;
  const state = {
    email: email.value,
    message: message.value,
  };

  saveLS(STORAGE_KEY, state);
}

function onFormSubmit(event) {
  event.preventDefault();

  const { email, message } = form.elements;
  const emailValue = email.value.trim();
  const messageValue = message.value.trim();

  if (emailValue === '' || messageValue === '') {
    alert('All form fields must be filled in');
    return;
  }

  const formData = {
    email: emailValue,
    message: messageValue,
  };
  console.log(formData);

  localStorage.removeItem(STORAGE_KEY);
  form.reset();
}

//

function saveLS(key, value) {
  try {
    const serialisedState = JSON.stringify(value);
    localStorage.setItem(key, serialisedState);
  } catch (error) {
    console.error(error.message);
  }
}

function loadLS(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : undefined;
  } catch (error) {
    console.error(error.message);
  }
}

function populateFormFromLS() {
  const saved = loadLS(STORAGE_KEY);
  if (!saved) return;

  const { email, message } = form.elements;
  email.value = saved.email || '';
  message.value = saved.message || '';
}
