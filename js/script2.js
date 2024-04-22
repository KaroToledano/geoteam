const submitBtn = document.getElementById('submitBtn');
const message = document.getElementById('message');

submitBtn.addEventListener('click', () => {
    const rating = document.querySelector('input[name="rating"]:checked');
    if (rating) {
        message.innerHTML = `¡Has calificado con ${rating.value} estrellas! Gracias por tu calificación.`;
    } else {
      message.innerHTML = 'Por favor, selecciona una calificación antes de enviar.';
    }
  });