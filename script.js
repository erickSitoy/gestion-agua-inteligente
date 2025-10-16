// --- Login y Registro ---
function mostrarRegistro() {
  document.getElementById("login-container").classList.add("oculto");
  document.getElementById("registro-container").classList.remove("oculto");
}

function mostrarLogin() {
  document.getElementById("registro-container").classList.add("oculto");
  document.getElementById("login-container").classList.remove("oculto");
}

function registrarUsuario() {
  const user = document.getElementById("nuevoUsuario").value.trim();
  const pass = document.getElementById("nuevoPassword").value.trim();

  if (!user || !pass) {
    alert("Completa todos los campos");
    return;
  }

  if (localStorage.getItem(user)) {
    alert("Este usuario ya existe");
  } else {
    localStorage.setItem(user, pass);
    alert("Usuario registrado con éxito");
    mostrarLogin();
  }
}

function iniciarSesion() {
  const user = document.getElementById("usuario").value.trim();
  const pass = document.getElementById("password").value.trim();

  const storedPass = localStorage.getItem(user);

  if (storedPass && storedPass === pass) {
    alert("Bienvenido " + user);
    document.getElementById("login-container").classList.add("oculto");
    document.getElementById("app").classList.remove("oculto");
  } else {
    alert("Usuario o contraseña incorrectos");
  }
}

function cerrarSesion() {
  document.getElementById("app").classList.add("oculto");
  document.getElementById("login-container").classList.remove("oculto");
}

// --- Secciones del sistema ---
function mostrarSeccion(id) {
  document.querySelectorAll("section").forEach(sec => sec.classList.remove("activo"));
  document.getElementById(id).classList.add("activo");
}

function simularNivel() {
  const nivel = Math.floor(Math.random() * 100);
  const barraDiv = document.getElementById("nivelAgua");
  barraDiv.innerHTML = `<div class="relleno" style="width:${nivel}%; background:${nivel > 30 ? '#00bcd4' : 'tomato'}"></div>
                        <p>${nivel}% lleno</p>`;
}

function simularConsumo() {
  const consumo = (Math.random() * 500).toFixed(1);
  document.getElementById("consumoValor").innerText = consumo;
}

function toggleAlertas() {
  const check = document.getElementById("alertas");
  const texto = document.getElementById("estadoAlertas");
  texto.textContent = check.checked ? "✅ Alertas activadas" : "🚫 Alertas desactivadas";
}


