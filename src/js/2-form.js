const STORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');

const formData = {
  email: '',
  message: '',
};

populateFormFromLS();

form.addEventListener('input', onFormInput);
form.addEventListener('submit', onFormSubmit);

function onFormInput(event) {
  const { name, value } = event.target;

  formData[name] = value;

  saveLS(STORAGE_KEY, formData);
}

function onFormSubmit(event) {
  event.preventDefault();

  const emailValue = formData.email.trim();
  const messageValue = formData.message.trim();

  if (emailValue === '' || messageValue === '') {
    alert('All form fields must be filled in');
    return;
  }

  console.log(formData);

  localStorage.removeItem(STORAGE_KEY);

  formData.email = '';
  formData.message = '';

  form.reset();
}

function saveLS(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
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
    return undefined;
  }
}

function populateFormFromLS() {
  const saved = loadLS(STORAGE_KEY);
  if (!saved) return;

  formData.email = saved.email || '';
  formData.message = saved.message || '';

  form.elements.email.value = formData.email;
  form.elements.message.value = formData.message;
}
