// App logic for the demo SPA
(function(){
  const levelText = document.getElementById('levelText');
  const waterEl = document.getElementById('water');
  const stateText = document.getElementById('stateText');
  const btnUpdate = document.getElementById('btnUpdate');
  const btnAuto = document.getElementById('btnAuto');
  const autoState = document.getElementById('autoState');
  const historyTable = document.querySelector('#historyTable tbody');
  const btnClear = document.getElementById('btnClear');
  const thresholdInput = document.getElementById('threshold');
  const thresholdVal = document.getElementById('thresholdVal');
  const themeToggle = document.getElementById('themeToggle');
  const autoIntervalOn = document.getElementById('autoIntervalOn');

  const maxValEl = document.getElementById('maxVal');
  const minValEl = document.getElementById('minVal');
  const avgValEl = document.getElementById('avgVal');

  // state
  let auto = false;
  let autoTimer = null;
  let threshold = parseInt(localStorage.getItem('threshold')||'30');
  thresholdInput.value = threshold;
  thresholdVal.textContent = threshold;

  // readings array
  let readings = JSON.parse(localStorage.getItem('readings')||'[]');

  function renderReadings(){
    historyTable.innerHTML = '';
    readings.forEach(r => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${r.t}</td><td>${r.v}%</td>`;
      historyTable.appendChild(tr);
    });
    // summary
    if(readings.length){
      const vals = readings.map(r=>r.v);
      maxValEl.textContent = Math.max(...vals) + '%';
      minValEl.textContent = Math.min(...vals) + '%';
      const avg = (vals.reduce((a,b)=>a+b,0)/vals.length).toFixed(1);
      avgValEl.textContent = avg + '%';
    } else {
      maxValEl.textContent = '--';
      minValEl.textContent = '--';
      avgValEl.textContent = '--';
    }
  }

  function pushReading(value){
    const now = new Date();
    const item = {t: now.toLocaleString(), v: value};
    readings.unshift(item);
    if(readings.length>50) readings.pop();
    localStorage.setItem('readings', JSON.stringify(readings));
    renderReadings();
  }

  function updateDisplay(value){
    levelText.textContent = value + '%';
    waterEl.style.height = value + '%';
    if(value>=80){
      stateText.textContent = 'Tanque lleno';
      stateText.style.color = '#16a34a';
    } else if(value>=40){
      stateText.textContent = 'Nivel medio';
      stateText.style.color = '#f59e0b';
    } else {
      stateText.textContent = 'Nivel bajo';
      stateText.style.color = '#ef4444';
      if(value<=threshold){
        // small browser notification if permission
        if(Notification && Notification.permission==='granted'){
          try { new Notification('Alerta: nivel bajo', {body: 'Nivel del agua: '+value+'%'}); } catch(e){}
        }
      }
    }
    // update summary values storage
    pushReading(value);
  }

  function randomLevel(){
    return Math.floor(Math.random()*101);
  }

  // initial render
  renderReadings();
  // if we have previous readings show latest
  if(readings.length) updateDisplay(readings[0].v);
  else updateDisplay(Math.floor(Math.random()*101));

  btnUpdate.addEventListener('click', ()=>{
    const v = randomLevel();
    updateDisplay(v);
  });

  btnAuto.addEventListener('click', ()=>{
    auto = !auto;
    autoState.textContent = auto? 'ON' : 'OFF';
    if(auto){
      autoTimer = setInterval(()=> {
        const v = randomLevel();
        updateDisplay(v);
      }, 5000);
    } else {
      clearInterval(autoTimer);
    }
  });

  btnClear.addEventListener('click', ()=>{
    if(confirm('Borrar todo el historial?')){
      readings = [];
      localStorage.removeItem('readings');
      renderReadings();
    }
  });

  thresholdInput.addEventListener('input', (e)=>{
    threshold = parseInt(e.target.value);
    thresholdVal.textContent = threshold;
    localStorage.setItem('threshold', threshold);
  });

  themeToggle.addEventListener('click', ()=>{
    document.body.classList.toggle('dark');
    if(document.body.classList.contains('dark')){
      themeToggle.textContent = 'Modo Claro';
      document.documentElement.style.setProperty('--bg','#0b1220');
      document.documentElement.style.setProperty('--card','#071425');
      document.documentElement.style.setProperty('--accent','#60a5fa');
      document.documentElement.style.setProperty('--muted','#9ca3af');
    } else {
      themeToggle.textContent = 'Modo Oscuro';
      document.documentElement.style.setProperty('--bg','#f7f9fb');
      document.documentElement.style.setProperty('--card','#ffffff');
      document.documentElement.style.setProperty('--accent','#1976d2');
      document.documentElement.style.setProperty('--muted','#6b7280');
    }
  });

  autoIntervalOn.addEventListener('change', (e)=>{
    if(e.target.checked){
      if(autoTimer) clearInterval(autoTimer);
      autoTimer = setInterval(()=> {
        const v = randomLevel();
        updateDisplay(v);
      }, 5000);
      auto = true;
      autoState.textContent = 'ON';
    } else {
      if(autoTimer) clearInterval(autoTimer);
      auto = false;
      autoState.textContent = 'OFF';
    }
  });

  // navigation
  document.querySelectorAll('.nav button').forEach(b=>{
    b.addEventListener('click', ()=>{
      document.querySelectorAll('.nav button').forEach(x=>x.classList.remove('active'));
      b.classList.add('active');
      const view = b.getAttribute('data-view');
      document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
      document.getElementById(view).classList.add('active');
    });
  });

  // ask notifications permission
  if("Notification" in window && Notification.permission!=="granted"){
    Notification.requestPermission().then(()=>{});
  }

})();
