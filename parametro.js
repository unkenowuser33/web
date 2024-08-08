// Obtén la URL actual
const urlActual = window.location.href;

// Verifica si el parámetro 'nombre' ya está presente en la URL
const parametros = new URLSearchParams(window.location.search);
// Obtener nombre del path si no está en los parámetros
let carpetaNombre =
  parametros.get("nombre") || window.location.pathname.substring(1);

if (!carpetaNombre || carpetaNombre === "index.php") {
  // Si 'nombre' no está presente o es 'index.php', genera una cadena aleatoria
  carpetaNombre = generarCadenaAleatoria();
  // Agrega la nueva estructura de URL sin parámetros
  const urlConParametro = `${window.location.origin}/${carpetaNombre}`;
  // Redirige a la nueva URL con el 'nombre' en el path
  window.location.href = urlConParametro;
} else {
  // Llama a la función para crear la carpeta con el nombre obtenido
  crearCarpeta(carpetaNombre);
}

// Función para generar una cadena aleatoria
function generarCadenaAleatoria() {
  const caracteres = "abcdefghijklmnopqrstuvwxyz0123456789";
  let cadenaAleatoria = "";
  for (let i = 0; i < 3; i++) {
    const caracterAleatorio = caracteres.charAt(
      Math.floor(Math.random() * caracteres.length)
    );
    cadenaAleatoria += caracterAleatorio;
  }
  return cadenaAleatoria;
}

// Función para crear la carpeta
function crearCarpeta(carpetaNombre) {
  $.ajax({
    url: "crearCarpeta.php",
    type: "POST",
    data: { nombreCarpeta: carpetaNombre },
    success: function (response) {
      console.log("Carpeta creada con éxito:", response);
    },
    error: function (xhr, status, error) {
      console.error("Error al crear la carpeta:", error);
    },
  });
}

// Función para manejar el evento de envío del formulario
/*Form.addEventListener("submit", (e) => {
  e.preventDefault();
  const fileInput = Form.querySelector("#archivo");
  const file = fileInput.files[0];
  if (file) {
    // Puedes enviar el archivo al servidor para su procesamiento aquí
    console.log("Subir archivo:", file.name);
  } else {
    alert("Por favor, seleccione un archivo primero.");
  }
});

// Función para generar un número aleatorio de 3 dígitos
function generarCadenaAleatoria() {
  const caracteres = "abcdefghijklmnopqrstuvwxyz0123456789";
  let cadenaAleatoria = "";
  for (let i = 0; i < 3; i++) {
    const caracterAleatorio = caracteres.charAt(
      Math.floor(Math.random() * caracteres.length)
    );
    cadenaAleatoria += caracterAleatorio;
  }
  return cadenaAleatoria;
}*/

// Barra de progreso (Obsoleto)
/* function uploadFile(carpetaRuta, inputId) {
 //BARRA DE PROGRESO
   var archivoInput = document.getElementById(inputId);
   var archivo = archivoInput.files[0];
   var progressBar = document.getElementById('progressBar');
   var formData = new FormData();

   formData.append('archivo', archivo);

   var xhr = new XMLHttpRequest();

   xhr.upload.onprogress = function (event) {
       if (event.lengthComputable) {
           var percentComplete = (event.loaded / event.total) * 100;
           progressBar.value = percentComplete;
       }
   };

   xhr.onload = function () {
       if (xhr.status === 200) {
           console.log('Archivo subido con éxito');
           // Puedes realizar acciones adicionales después de la carga aquí
       } else {
           console.error('Error al subir el archivo');
       }
   };

   xhr.open('POST', 'upload.php', true);
   xhr.send(formData);
 }*/

// DROP AREA

/* Obtén la zona de arrastre y el formulario
const dropArea = document.getElementById("drop-area");
const Form = document.getElementById("form");

// Agrega los siguientes eventos a la zona de arrastre
dropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropArea.classList.add("drag-over");
});

dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("drag-over");
});

dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  dropArea.classList.remove("drag-over");
  const file = e.dataTransfer.files[0];
  handleFile(file);
});

// Función para manejar el archivo seleccionado
function handleFile(file) {
  if (file) {
    // Realiza alguna acción, como mostrar el nombre del archivo
    console.log("Archivo seleccionado:", file.name);

    // También puedes realizar otras acciones, como subir el archivo al servidor
    // Puedes agregar aquí el código para subir el archivo si lo deseas
  }
}

// Agrega esta función para manejar el evento de envío del formulario
Form.addEventListener("submit", (e) => {
  e.preventDefault();
  const fileInput = Form.querySelector("#archivo");
  const file = fileInput.files[0];
  if (file) {
    // Puedes enviar el archivo al servidor para su procesamiento aquí
    console.log("Subir archivo:", file.name);
  } else {
    alert("Por favor, seleccione un archivo primero.");
  }
});*/

// DROP AREA sin caché de parametro
/*document.getElementById("archivo").addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (file) {
    const formData = new FormData();
    formData.append("archivo", file);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "", true);

    xhr.upload.addEventListener("progress", function (event) {
      if (event.lengthComputable) {
        const percentComplete = Math.round((event.loaded / event.total) * 100);
        const progressBar = document.getElementById("progress-bar");
        progressBar.style.width = percentComplete + "%";
        progressBar.textContent = percentComplete + "%";
        document.getElementById("progress-container").style.display = "block";
      }
    });

    xhr.addEventListener("load", function () {
      if (xhr.status === 200) {
        document.getElementById("progress-bar").style.width = "100%";
        document.getElementById("progress-bar").textContent = "100%";
        setTimeout(() => {
          document.getElementById("progress-container").style.display = "none";
          // Recargar página con un parámetro único para evitar el caché
          /*window.location.href = window.location.href.split('?')[0] + '?nombre=<?php echo $carpetaNombre; ?>&t=' + new Date().getTime();*/

/* Recargar la página sin parámetros adicionales
          window.location.href =
            window.location.pathname +
            (window.location.search ? window.location.search : "");
        }, 2000);
      }
    });

    xhr.send(formData);
  }
});*/

function handleFiles(files) {
  const progressBar = document.getElementById("progress-bar");
  const progressContainer = document.getElementById("progress-container");
  let totalFiles = files.length;
  let currentIndex = 0;

  progressContainer.style.display = "block";

  function uploadNextFile() {
    if (currentIndex >= totalFiles) {
      progressContainer.style.display = "none";
      window.location.href =
        window.location.pathname +
        (window.location.search ? window.location.search : "");
      return;
    }

    const file = files[currentIndex];
    const formData = new FormData();
    formData.append("archivo", file);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "", true);

    xhr.upload.addEventListener("progress", function (event) {
      if (event.lengthComputable) {
        const percentComplete = Math.round((event.loaded / event.total) * 100);
        progressBar.style.width = percentComplete + "%";
        progressBar.textContent = percentComplete + "%";
      }
    });

    xhr.addEventListener("load", function () {
      if (xhr.status === 200) {
        progressBar.style.width = "100%";
        progressBar.textContent = "100%";
        setTimeout(() => {
          progressBar.style.width = "0%";
          progressBar.textContent = "0%";
          currentIndex++;
          uploadNextFile();
        }, 1000);
      } else {
        console.error("Error al subir el archivo", file.name);
        currentIndex++;
        uploadNextFile();
      }
    });

    xhr.send(formData);
  }

  uploadNextFile();
}

// Eventos de la zona de arrastre
dropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropArea.classList.add("drag-over");
});

dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("drag-over");
});

dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  dropArea.classList.remove("drag-over");
  const files = e.dataTransfer.files;
  handleFiles(files);
});

// Evento de cambio del input para manejar múltiples archivos
document.getElementById("archivo").addEventListener("change", function (event) {
  const files = event.target.files;
  handleFiles(files);
});
