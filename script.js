var efectivo = [];

document.addEventListener("DOMContentLoaded", function() {
  mostrarFechaHora();
});

function mostrarFechaHora() {
  // Obtener la referencia a los elementos span
  var fechaElement = document.getElementById('fecha');
  var horaElement = document.getElementById('hora');

  // Obtener la fecha y hora actual
  var fechaActual = new Date();

  // Obtener los componentes de fecha y hora
  var dia = fechaActual.getDate();
  var mes = fechaActual.getMonth() + 1; // Los meses comienzan desde 0
  var anio = fechaActual.getFullYear();
  var horas = fechaActual.getHours();
  var minutos = fechaActual.getMinutes();
  var segundos = fechaActual.getSeconds();

  // Formatear los componentes como cadena con dos dígitos
  var fechaFormateada = ("0" + dia).slice(-2) + "/" + ("0" + mes).slice(-2) + "/" + anio;
  var horaFormateada = ("0" + horas).slice(-2) + ":" + ("0" + minutos).slice(-2) + ":" + ("0" + segundos).slice(-2);

  // Asignar los valores formateados a los elementos span
  fechaElement.textContent = fechaFormateada;
  horaElement.textContent = horaFormateada;
}

// Event Handler

function handleEnterKey(event, nextIndex) {
  if (event.keyCode === 13) {  // 13 es el código de la tecla Enter
    if (nextIndex !== null) {
      var nextInput = document.getElementsByName('fname' + nextIndex)[0];
      nextInput.focus();
      calculateTotal();
    }
  }
}

// Seccion de Monedas fraccionarias.

function updateAmount(input, index) {
  var amountSpan = document.getElementById('amount' + index);
  var originalValue = parseFloat(amountSpan.getAttribute('data-original-value')) || 0;
  
  if (input.value === "") {
    amountSpan.textContent = '__________';
    efectivo[index - 1] = null;  // Si el campo está vacío, se establece el valor del producto como null
  } else {
    var newValue = parseInt(input.value) * originalValue;
    amountSpan.textContent = isNaN(newValue) ? '__________' : newValue;
    efectivo[index - 1] = isNaN(newValue) ? null : newValue;  // Se guarda el valor del producto en el arreglo
  }
}

function updateMonedas(input) {
  var amountSpan = document.getElementById('amount7');
  amountSpan.textContent = input.value;
  efectivo[6] = input.value === "" ? null : parseFloat(input.value);  // Se guarda el valor de las monedas en el arreglo
}

function calculateTotal() {
  var total = efectivo.reduce(function(sum, value) {
    return sum + (value || 0);
  }, 0);

  var totalAmountElement = document.getElementById('totalAmount');
  totalAmountElement.textContent = isNaN(total) ? '___________' : total;
}