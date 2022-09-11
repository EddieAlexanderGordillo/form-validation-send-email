// variables
const btnEnviar = document.querySelector('#send');
const formulario = document.querySelector('#send-mail');
const btnResetear = document.querySelector('#resetear');

const email = document.querySelector('#email');
const subject = document.querySelector('#subject');
const message = document.querySelector('#message');

const regex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
eventListeners();
// eventlisteners
function eventListeners() {
  document.addEventListener('DOMContentLoaded', iniciarApp);
  // campos del formulario
  email.addEventListener('blur', validarFormulario);
  subject.addEventListener('blur', validarFormulario);
  message.addEventListener('blur', validarFormulario);
  // reinicia el formulario
  btnResetear.addEventListener('click', resetearFormulario);
  // enviar email
  formulario.addEventListener('submit', enviarEmail);
}

// funciones

function iniciarApp() {
  btnEnviar.disabled = true;
  btnEnviar.classList.add('cursor-disabled', 'button__send--disabled');
}

function validarFormulario(e) {
  if (e.target.value.length > 0) {
    // elimina los mensajes de error
    const error = document.querySelector('.message--error');
    if (error) {
      error.remove();
    }
    e.target.classList.remove('input--error');
    e.target.classList.add('input--correct');
  } else {
    e.target.classList.remove('input--correct');
    e.target.classList.add('input--error');
    mostrarError('Todos los campos son obligatorios');
  }
  if (e.target.type === 'email') {
    // const resultado = e.target.value.indexOf('@'); validacion no pro
    // if (resultado < 0) {
    //   mostrarError('El email no es válido');
    if (regex.test(e.target.value)) {
      const error = document.querySelector('.message--error');
      if (error) {
        error.remove();
      }
      e.target.classList.remove('input--error');
      e.target.classList.add('input--correct');
    } else {
      e.target.classList.remove('input--correct');
      e.target.classList.add('input--error');
      mostrarError('El email no es válido');
    }
  }
  if (regex.test(email.value) && subject.value !== '' && message.value !== '') {
    btnEnviar.disabled = false;
    btnEnviar.classList.remove('cursor-disabled', 'button__send--disabled');
  }
}
function mostrarError(mensaje) {
  const mensajeError = document.createElement('p');
  mensajeError.textContent = mensaje;
  mensajeError.classList.add('message--error');

  const errores = document.querySelectorAll('.message--error');
  if (errores.length === 0) {
    formulario.insertAdjacentElement('beforeend', mensajeError);
  }
}

// envia email
function enviarEmail(e) {
  e.preventDefault();
  const spinner = document.querySelector('#spinner');
  spinner.style.display = 'flex';
  // despues de 3 seg se oculta el spinner y mostrar mensaje OK
  setTimeout(() => {
    spinner.style.display = 'none';
    // mensaje ok
    const parrafo = document.createElement('p');
    parrafo.textContent = 'El mensaje se envió correctamente';
    parrafo.classList.add('message--correct');
    // inserta el parrafo antes del spinner
    formulario.insertBefore(parrafo, spinner);
    setTimeout(() => {
      //  elimina el mensaje ok despues de 5 seg
      parrafo.remove();
      resetearFormulario();
    }, 5000);
  }, 3000);
}
function resetearFormulario() {
  // no llamar en un id o name reset porque anula la funcion reset
  formulario.reset();
  iniciarApp();
}
