function mostrarRegistro() {
  document.getElementById("login-container").classList.add("oculto");
  document.getElementById("registro-container").classList.remove("oculto");
}

function mostrarLogin() {
  document.getElementById("registro-container").classList.add("oculto");
  document.getElementById("login-container").classList.remove("oculto");
}

function registrarUsuario() {
  const user = document.getElementById("nuevoUsuario").value;
  const pass = document.getElementById("nuevoPassword").value;

  if (user && pass) {
    localStorage.setItem("usuario", user);
    localStorage.setItem("password", pass);
    alert("Usuario registrado correctamente ✅");
    // Ingresar automáticamente al sistema
    mostrarApp();
  } else {
    alert("Por favor, completa todos los campos");
  }
}

function iniciarSesion() {
  const user = document.getElementById("usuario").value;
  const pass = document.getElementById("password").value;
  const storedUser = localStorage.getItem("usuario");
  const storedPass = localStorage.getItem("password");

  if (user === storedUser && pass === storedPass) {
    mostrarApp();
  } else {
    alert("Usuario o contraseña incorrectos ❌");
  }
}

function mostrarApp() {
  document.getElementById("login-container").classList.add("oculto");
  document.getElementById("registro-container").classList.add("oculto");
  document.getElementById("app").classList.remove("oculto");
}

function cerrarSesion() {
  document.getElementById("app").classList.add("oculto");
  document.getElementById("login-container").classList.remove("oculto");
}

function mostrarSeccion(id) {
  document.querySelectorAll("main section").forEach(s => s.classList.remove("activo"));
  document.getElementById(id).classList.add("activo");
}

function simularNivel() {
  const nivel = Math.floor(Math.random() * 100);
  const mensaje = nivel < 30 ? "⚠️ Nivel bajo: " + nivel + "%" : "✅ Nivel óptimo: " + nivel + "%";
  document.getElementById("nivelAgua").textContent = mensaje;
}

function simularConsumo() {
  const consumo = Math.floor(Math.random() * 500);
  document.getElementById("consumoValor").textContent = consumo;
}

function toggleAlertas() {
  const activo = document.getElementById("checkAlertas").checked;
  const estado = document.getElementById("estadoAlertas");
  estado.textContent = activo ? "✅ Alertas activadas" : "🚫 Alertas desactivadas";
}




