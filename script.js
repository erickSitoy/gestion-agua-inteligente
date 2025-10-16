function mostrarSeccion(id) {
  document.querySelectorAll("section").forEach(sec => sec.classList.remove("activo"));
  document.getElementById(id).classList.add("activo");
}

function simularNivel() {
  const nivel = Math.floor(Math.random() * 100);
  const barra = document.querySelector("#nivelAgua::after");
  const barraDiv = document.getElementById("nivelAgua");
  barraDiv.style.setProperty("--nivel", nivel + "%");
  barraDiv.innerHTML = `<p>${nivel}% lleno</p>`;
  barraDiv.style.background = nivel > 30 ? "#00bcd4" : "tomato";
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

})();

