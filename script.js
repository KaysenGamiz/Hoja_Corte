var efectivo = [];
var retiroEnEfectivo = 0;
var dolares = 0;
var tarjeta = 0;

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

function handleEnterKey(event) {
  if (event.keyCode === 13) {  // 13 es el código de la tecla Enter
    var inputs = document.getElementsByClassName("input-navigation");
    var currentIndex = Array.from(inputs).indexOf(event.target);
    var nextIndex = currentIndex + 1;

    if (nextIndex < inputs.length) {
      var nextInput = inputs[nextIndex];
      nextInput.focus();
    }

    calculateTotal();
    calculateTotalCompras();
    calculateTotalGastos();
    calculateTotalVales();
    calculateTotalDevoluciones()
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

// Update Dlls

function updateDolares() {
  var amountSpan = document.getElementById('amount8');
  var value8 = parseFloat(document.getElementsByName('fname8')[0].value) || 0;
  var value9 = parseFloat(document.getElementsByName('fname9')[0].value) || 0;
  var product = value8 * value9;
  dolares = product;
  var formattedProduct = product.toFixed(2);
  amountSpan.textContent = isNaN(formattedProduct) ? '__________' : formattedProduct;
}

// Inputs para concepto - cantidad

function addInput(containerClassName, numericInputIndex) {
  var numericInput = document.getElementsByClassName("numeric-input")[numericInputIndex];
  var currentCount = parseInt(numericInput.value);
  var numberOfInputsToAdd = currentCount;

  if (currentCount <= 1) {
    numberOfInputsToAdd = 1;
  }

  var existingInputs = document.querySelectorAll('[name^="fname"]');
  var lastInputIndex = existingInputs.length > 0 ? parseInt(existingInputs[existingInputs.length - 1].name.replace('fname', '')) : 13;

  for (var i = 0; i < numberOfInputsToAdd; i++) {
    var newInputContainer = document.createElement("div");
    newInputContainer.classList.add("input-container");

    var input1 = document.createElement("input");
    input1.placeholder = "";
    input1.type = "text";
    input1.name = "fname" + (lastInputIndex + (i * 2) + 1);
    input1.style.width = "190px";
    input1.classList.add("input-concepto");
    input1.setAttribute("onkeyup", "handleEnterKey(event)");

    input1.classList.add("input-navigation"); // Agregar la clase "input-navigation"

    var dollarSign = document.createElement("span");
    dollarSign.classList.add("dolar");
    dollarSign.innerText = "$";

    var input2 = document.createElement("input");
    input2.placeholder = "";
    input2.type = "text";
    input2.name = "fname" + (lastInputIndex + (i * 2) + 2);
    input2.style.width = "90px";
    input2.setAttribute("onkeyup", "handleEnterKey(event)");

    input2.classList.add("input-navigation"); // Agregar la clase "input-navigation"

    newInputContainer.appendChild(input1);
    newInputContainer.appendChild(dollarSign);
    newInputContainer.appendChild(input2);

    var containerElement = document.getElementsByClassName(containerClassName)[0];
    containerElement.appendChild(newInputContainer);
  }

  numericInput.value = 1;
}


function removeInput(containerClassName) {
  var containerElement = document.getElementsByClassName(containerClassName)[0];
  var inputContainers = containerElement.getElementsByClassName("input-container");

  // Obtener el valor del input numeric-input
  var numericInput = containerElement.getElementsByClassName("numeric-input")[0];
  var currentCount = parseInt(numericInput.value);

  // Verificar si hay más de un conjunto de inputs
  if (inputContainers.length > 1) {
    // Calcular la cantidad de inputs a eliminar
    var inputsToRemove = Math.min(currentCount, inputContainers.length - 1);

    // Eliminar los inputs correspondientes
    for (var i = 0; i < inputsToRemove; i++) {
      var lastInputContainer = inputContainers[inputContainers.length - 1];
      lastInputContainer.remove();
    }

    // Restar la cantidad de inputs eliminados al valor del input numeric-input, asegurándonos de que no sea menor que 1
    numericInput.value = Math.max(currentCount - inputsToRemove);
    numericInput.value = 1;
  }
}


function calculateTotalCompras() {
  var comprasInputs = document.querySelectorAll('.ComprasEfectivo .input-container input[name^="fname"]');
  var totalCompras = Array.from(comprasInputs).reduce(function(sum, input, index) {
    if (index % 2 !== 0) {
      var value = parseFloat(input.value) || 0;
      return sum + value;
    }
    return sum;
  }, 0);

  var totalAmountComprasElement = document.getElementById('totalAmountCompras');
  totalAmountComprasElement.textContent = isNaN(totalCompras) ? '___________' : totalCompras;
}

function calculateTotalGastos() {
  var gastosInputs = document.querySelectorAll('.GastosEfectivo .input-container input[name^="fname"]');
  var totalGastos = Array.from(gastosInputs).reduce(function(sum, input, index) {
    if (index % 2 !== 0) {
      var value = parseFloat(input.value) || 0;
      return sum + value;
    }
    return sum;
  }, 0);

  var totalAmountGastosElement = document.getElementById('totalAmountGastos');
  totalAmountGastosElement.textContent = isNaN(totalGastos) ? '___________' : totalGastos;
}

function calculateTotalVales() {
  var valesInputs = document.querySelectorAll('.Vales .input-container input[name^="fname"]');
  var totalVales = Array.from(valesInputs).reduce(function(sum, input, index) {
    if (index % 2 !== 0) {
      var value = parseFloat(input.value) || 0;
      return sum + value;
    }
    return sum;
  }, 0);

  var totalAmountValesElement = document.getElementById('totalAmountVales');
  totalAmountValesElement.textContent = isNaN(totalVales) ? '___________' : totalVales;
}

function calculateTotalDevoluciones() {
  var devolucionesInputs = document.querySelectorAll('.Devoluciones .input-container input[name^="fname"]');
  var totalDevoluciones = 0;

  for (var i = 0; i < devolucionesInputs.length; i += 2) {
    var cantidadInput = devolucionesInputs[i + 1];
    var value = parseFloat(cantidadInput.value) || 0;
    totalDevoluciones += value;
  }

  var totalAmountDevolucionesElement = document.getElementById('totalAmountDevoluciones');
  totalAmountDevolucionesElement.textContent = isNaN(totalDevoluciones) ? '___________' : totalDevoluciones;
}

function calculateTotal() {
  var total = efectivo.reduce(function(sum, value) {
    return sum + (value || 0);
  }, 0);

  var totalAmountElement = document.getElementById('totalAmount');
  totalAmountElement.textContent = isNaN(total) ? '___________' : total;
}

