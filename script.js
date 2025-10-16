// --- MOSTRAR LOGIN Y REGISTRO ---
function mostrarRegistro() {
  document.getElementById("login-container").classList.add("oculto");
  document.getElementById("registro-container").classList.remove("oculto");
}

function mostrarLogin() {
  document.getElementById("registro-container").classList.add("oculto");
  document.getElementById("login-container").classList.remove("oculto");
}

// --- REGISTRAR NUEVO USUARIO ---
function registrarUsuario() {
  const user = document.getElementById("nuevoUsuario").value.trim();
  const pass = document.getElementById("nuevoPassword").value.trim();

  if (!user || !pass) {
    alert("⚠️ Completa todos los campos");
    return;
  }

  if (localStorage.getItem(user)) {
    alert("❌ Este usuario ya existe. Intenta otro.");
  } else {
    localStorage.setItem(user, pass);
    alert("✅ Usuario registrado con éxito. Ahora inicia sesión.");
    // Limpiar campos y volver al login automáticamente
    document.getElementById("nuevoUsuario").value = "";
    document.getElementById("nuevoPassword").value = "";
    mostrarLogin();
  }
}

// --- INICIAR SESIÓN ---
function iniciarSesion() {
  const user = document.getElementById("usuario").value.trim();
  const pass = document.getElementById("password").value.trim();
  const storedPass = localStorage.getItem(user);

  if (storedPass && storedPass === pass) {
    alert("Bienvenido, " + user + " 👋");
    document.getElementById("login-container").classList.add("oculto");
    document.getElementById("app").classList.remove("oculto");
    document.getElementById("usuario").value = "";
    document.getElementById("password").value = "";
  } else {
    alert("❌ Usuario o contraseña incorrectos");
  }
}

// --- CERRAR SESIÓN ---
function cerrarSesion() {
  document.getElementById("app").classList.add("oculto");
  document.getElementById("login-container").classList.remove("oculto");
}

// --- NAVEGACIÓN ENTRE SECCIONES ---
function mostrarSeccion(id) {
  document.querySelectorAll("section").forEach(sec => sec.classList.remove("activo"));
  document.getElementById(id).classList.add("activo");
}

// --- SIMULAR NIVEL DEL AGUA ---
function simularNivel() {
  const nivel = Math.floor(Math.random() * 100);
  const barraDiv = document.getElementById("nivelAgua");
  barraDiv.innerHTML = `<div class="relleno" style="width:${nivel}%; background:${nivel > 30 ? '#00bcd4' : 'tomato'}"></div>
                        <p>${nivel}% lleno</p>`;
}

// --- SIMULAR CONSUMO ---
function simularConsumo() {
  const consumo = (Math.random() * 500).toFixed(1);
  document.getElementById("consumoValor").innerText = consumo;
}

// --- ALERTAS ---
function toggleAlertas() {
  const check = document.getElementById("alertas");
  const texto = document.getElementById("estadoAlertas");
  texto.textContent = check.checked ? "✅ Alertas activadas" : "🚫 Alertas desactivadas";
}



