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

function addCompraEfectivoInput() {
  var numericInput = document.getElementsByClassName("numeric-input")[0];
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
    input1.setAttribute("onkeydown", "handleEnterKey(event, " + (lastInputIndex + (i * 2) + 2) + ")");

    var dollarSign = document.createElement("span");
    dollarSign.classList.add("dolar");
    dollarSign.innerText = "$";

    var input2 = document.createElement("input");
    input2.placeholder = "";
    input2.type = "text";
    input2.name = "fname" + (lastInputIndex + (i * 2) + 2);
    input2.style.width = "90px";
    input2.setAttribute("onkeydown", "handleEnterKey(event, " + (lastInputIndex + (i * 2) + 3) + ")");

    newInputContainer.appendChild(input1);
    newInputContainer.appendChild(dollarSign);
    newInputContainer.appendChild(input2);

    var compraEfectivoElement = document.getElementsByClassName("ComprasEfectivo")[0];
    compraEfectivoElement.appendChild(newInputContainer);
  }

  numericInput.value = 1;
}

function addGastosEfectivoInput() {
  var numericInput = document.getElementsByClassName("numeric-input")[1]; // Obtener el segundo elemento numeric-input
  var currentCount = parseInt(numericInput.value);
  var numberOfInputsToAdd = currentCount;

  if (currentCount <= 1) {
    numberOfInputsToAdd = 1;
  }

  var existingInputs = document.querySelectorAll('[name^="fname"]');
  var lastInputIndex = existingInputs.length > 0 ? parseInt(existingInputs[existingInputs.length - 1].name.replace('fname', '')) : 23;

  for (var i = 0; i < numberOfInputsToAdd; i++) {
    var newInputContainer = document.createElement("div");
    newInputContainer.classList.add("input-container");

    var input1 = document.createElement("input");
    input1.placeholder = "";
    input1.type = "text";
    input1.name = "fname" + (lastInputIndex + (i * 2) + 1);
    input1.style.width = "190px";
    input1.setAttribute("onkeydown", "handleEnterKey(event, " + (lastInputIndex + (i * 2) + 2) + ")");

    var dollarSign = document.createElement("span");
    dollarSign.classList.add("dolar");
    dollarSign.innerText = "$";

    var input2 = document.createElement("input");
    input2.placeholder = "";
    input2.type = "text";
    input2.name = "fname" + (lastInputIndex + (i * 2) + 2);
    input2.style.width = "90px";
    input2.setAttribute("onkeydown", "handleEnterKey(event, " + (lastInputIndex + (i * 2) + 3) + ")");

    newInputContainer.appendChild(input1);
    newInputContainer.appendChild(dollarSign);
    newInputContainer.appendChild(input2);

    var gastosEfectivoElement = document.getElementsByClassName("GastosEfectivo")[0];
    gastosEfectivoElement.appendChild(newInputContainer);
  }

  numericInput.value = 1;
}

function addValesInput() {
  var numericInput = document.getElementsByClassName("numeric-input")[2]; // Obtener el tercer elemento numeric-input
  var currentCount = parseInt(numericInput.value);
  var numberOfInputsToAdd = currentCount;

  if (currentCount <= 1) {
    numberOfInputsToAdd = 1;
  }

  var existingInputs = document.querySelectorAll('[name^="fname"]');
  var lastInputIndex = existingInputs.length > 0 ? parseInt(existingInputs[existingInputs.length - 1].name.replace('fname', '')) : 33;

  for (var i = 0; i < numberOfInputsToAdd; i++) {
    var newInputContainer = document.createElement("div");
    newInputContainer.classList.add("input-container");

    var input1 = document.createElement("input");
    input1.placeholder = "";
    input1.type = "text";
    input1.name = "fname" + (lastInputIndex + (i * 2) + 1);
    input1.style.width = "190px";
    input1.setAttribute("onkeydown", "handleEnterKey(event, " + (lastInputIndex + (i * 2) + 2) + ")");

    var dollarSign = document.createElement("span");
    dollarSign.classList.add("dolar");
    dollarSign.innerText = "$";

    var input2 = document.createElement("input");
    input2.placeholder = "";
    input2.type = "text";
    input2.name = "fname" + (lastInputIndex + (i * 2) + 2);
    input2.style.width = "90px";
    input2.setAttribute("onkeydown", "handleEnterKey(event, " + (lastInputIndex + (i * 2) + 3) + ")");

    newInputContainer.appendChild(input1);
    newInputContainer.appendChild(dollarSign);
    newInputContainer.appendChild(input2);

    var valesElement = document.getElementsByClassName("Vales")[0];
    valesElement.appendChild(newInputContainer);
  }

  numericInput.value = 1;
}

function removeGastosEfectivoInput() {
  var gastosEfectivoElement = document.getElementsByClassName("GastosEfectivo")[0];
  var inputContainers = gastosEfectivoElement.getElementsByClassName("input-container");

  // Verificar si hay al menos un conjunto de inputs para eliminar
  if (inputContainers.length > 1) {
    // Eliminar el último conjunto de inputs
    var lastInputContainer = inputContainers[inputContainers.length - 1];
    lastInputContainer.remove();
  }
}

function removeCompraEfectivoInput() {
  var compraEfectivoElement = document.getElementsByClassName("ComprasEfectivo")[0];
  var inputContainers = compraEfectivoElement.getElementsByClassName("input-container");

  // Verificar si hay al menos un conjunto de inputs para eliminar
  if (inputContainers.length > 1) {
    // Eliminar el último conjunto de inputs
    var lastInputContainer = inputContainers[inputContainers.length - 1];
    lastInputContainer.remove();
  }
}

function removeValesInput() {
  var valesElement = document.getElementsByClassName("Vales")[0];
  var inputContainers = valesElement.getElementsByClassName("input-container");

  // Verificar si hay al menos un conjunto de inputs para eliminar
  if (inputContainers.length > 1) {
    // Eliminar el último conjunto de inputs
    var lastInputContainer = inputContainers[inputContainers.length - 1];
    lastInputContainer.remove();
  }
}
