const STORAGE_KEY="n11-dispatch-v2";
const baseLat=19.4326,baseLng=-99.1332;
const seed={
 incidents:[
 {id:"INC-2026-0005",caller:"Daniel Bello",document:"12345678901",type:"Extorsión telefónica",priority:"medium",status:"open",createdAt:"2026-01-26T15:02:40",address:"Av. Juárez 50, Centro",lat:19.4355,lng:-99.1412,description:"Se investiga posible extorsión telefónica; la persona reportante identificó al presunto responsable.",notes:"Solicitante permanece en línea.",assigned:["P-014"],timeline:[["Incidente creado","2026-01-26T15:02:40"],["Dirección geolocalizada","2026-01-26T15:03:00"],["Unidad P-014 despachada","2026-01-26T15:04:15"]]},
 {id:"INC-2026-0004",caller:"Diego Piero",document:"98765432100",type:"Abuso de confianza",priority:"medium",status:"open",createdAt:"2026-01-26T15:01:15",address:"C. Libertad 114",lat:19.428,lng:-99.121,description:"Posible abuso de confianza relacionado con faltante de mercancía en comercio.",notes:"",assigned:[],timeline:[["Incidente creado","2026-01-26T15:01:15"],["Solicitante validado","2026-01-26T15:02:10"]]},
 {id:"INC-2026-0003",caller:"Lorenzo Bustamante",document:"45678912300",type:"Ahogamiento",priority:"high",status:"open",createdAt:"2026-01-26T14:59:40",address:"Bosque de Chapultepec",lat:19.4204,lng:-99.1819,description:"Persona con dificultad respiratoria en cuerpo de agua. Atención médica inmediata.",notes:"Protocolo médico activado.",assigned:["AMB-07"],timeline:[["Incidente creado","2026-01-26T14:59:40"],["Prioridad alta validada","2026-01-26T15:00:01"],["AMB-07 despachada","2026-01-26T15:00:22"]]},
 {id:"INC-2026-0002",caller:"Lorena Palacios",document:"74185296300",type:"Asfixia",priority:"high",status:"open",createdAt:"2026-01-26T14:58:16",address:"Roma Norte",lat:19.4177,lng:-99.1622,description:"Paciente consciente con obstrucción parcial de vía aérea.",notes:"Se brindan instrucciones telefónicas.",assigned:["AMB-11"],timeline:[["Incidente creado","2026-01-26T14:58:16"],["Instrucciones de primeros auxilios","2026-01-26T14:58:50"],["AMB-11 despachada","2026-01-26T14:59:04"]]},
 {id:"INC-2026-0001",caller:"Mario Leal",document:"36925814700",type:"Accidente ferroviario",priority:"high",status:"closed",createdAt:"2026-01-26T14:55:19",closedAt:"2026-01-26T16:20:00",address:"Buenavista",lat:19.446,lng:-99.1525,description:"Incidente en vía férrea con posible víctima.",notes:"Atención concluida.",assigned:["P-022","AMB-03"],timeline:[["Incidente creado","2026-01-26T14:55:19"],["Policía y ambulancia notificadas","2026-01-26T14:55:44"],["Incidente cerrado","2026-01-26T16:20:00"]]}
 ],
 units:[
 {id:"P-014",name:"Patrulla P-014",type:"Policía",status:"busy",lat:19.437,lng:-99.143},
 {id:"P-022",name:"Patrulla P-022",type:"Policía",status:"available",lat:19.445,lng:-99.128},
 {id:"P-031",name:"Patrulla P-031",type:"Policía",status:"available",lat:19.424,lng:-99.15},
 {id:"AMB-03",name:"Ambulancia AMB-03",type:"Ambulancia",status:"available",lat:19.431,lng:-99.112},
 {id:"AMB-07",name:"Ambulancia AMB-07",type:"Ambulancia",status:"busy",lat:19.421,lng:-99.177},
 {id:"AMB-11",name:"Ambulancia AMB-11",type:"Ambulancia",status:"busy",lat:19.418,lng:-99.16},
 {id:"BOM-02",name:"Bomberos BOM-02",type:"Bomberos",status:"available",lat:19.44,lng:-99.17}
 ],
 people:[
 {document:"12345678901",name:"Daniel Bello",phone:"+52 55 1000 0001",address:"Av. Juárez 50, Centro",alerts:"Reporte previo de extorsión",incidents:["INC-2026-0005"]},
 {document:"98765432100",name:"Diego Piero",phone:"+52 55 1000 0002",address:"C. Libertad 114",alerts:"Sin alertas",incidents:["INC-2026-0004"]},
 {document:"45678912300",name:"Lorenzo Bustamante",phone:"+52 55 1000 0003",address:"Col. Lomas",alerts:"Contacto médico",incidents:["INC-2026-0003"]}
 ],
 pois:[
 {name:"Hospital General de México",category:"Hospital",lat:19.4131,lng:-99.1523,address:"Dr. Balmis 148"},
 {name:"Estadio Ciudad de los Deportes",category:"Estadio",lat:19.3833,lng:-99.1784,address:"Nochebuena"},
 {name:"Escuela Nacional Preparatoria 5",category:"Escuela",lat:19.282,lng:-99.138,address:"Coapa"},
 {name:"Monumento a la Revolución",category:"Monumento",lat:19.4362,lng:-99.1547,address:"Plaza de la República"}
 ]
};
let data=JSON.parse(localStorage.getItem(STORAGE_KEY)||"null")||structuredClone(seed);
let selectedId=data.incidents.find(x=>x.status==="open")?.id||data.incidents[0].id;
let statusFilter="open",dispatchMap,fullMap,dispatchLayers=[],fullLayers=[];
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
function save(){localStorage.setItem(STORAGE_KEY,JSON.stringify(data))}
function toast(m){const t=$("#toast");t.textContent=m;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2200)}
function selected(){return data.incidents.find(i=>i.id===selectedId)||data.incidents[0]}
function fmt(d){return new Date(d).toLocaleString("es-MX")}
function km(a,b,c,d){const R=6371,p=Math.PI/180,x=(c-a)*p,y=(d-b)*p;const q=Math.sin(x/2)**2+Math.cos(a*p)*Math.cos(c*p)*Math.sin(y/2)**2;return 2*R*Math.asin(Math.sqrt(q))}
function priorityLabel(p){return {high:"PRIORIDAD ALTA",medium:"PRIORIDAD MEDIA",low:"PRIORIDAD BAJA"}[p]}
function addTimeline(i,text){i.timeline.push([text,new Date().toISOString()])}
function initMaps(){
 dispatchMap=L.map("dispatchMap").setView([baseLat,baseLng],13);
 fullMap=L.map("fullMap").setView([baseLat,baseLng],12);
 [dispatchMap,fullMap].forEach(m=>L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"© OpenStreetMap"}).addTo(m));
 dispatchMap.on("click",e=>{const i=selected();i.lat=e.latlng.lat;i.lng=e.latlng.lng;i.address=`Ubicación seleccionada: ${e.latlng.lat.toFixed(5)}, ${e.latlng.lng.toFixed(5)}`;addTimeline(i,"Ubicación fijada directamente en el mapa");save();renderAll();toast("Ubicación del incidente actualizada")});
 renderMaps()
}
function clearLayers(map,layers){layers.forEach(x=>map.removeLayer(x));layers.length=0}
function markerIcon(color,txt){return L.divIcon({className:"",html:`<div style="width:30px;height:30px;border-radius:50%;background:${color};color:#fff;display:grid;place-items:center;border:2px solid white;box-shadow:0 3px 8px #0006;font-size:12px">${txt}</div>`,iconSize:[30,30]})}
function renderMaps(){
 if(!dispatchMap)return;
 clearLayers(dispatchMap,dispatchLayers);clearLayers(fullMap,fullLayers);
 const i=selected();
 const im=L.marker([i.lat,i.lng],{icon:markerIcon("#ff5e50","!")}).addTo(dispatchMap).bindPopup(`<b>${i.id}</b><br>${i.type}<br>${i.address}`);dispatchLayers.push(im);dispatchMap.setView([i.lat,i.lng],13);
 data.units.forEach(u=>{const m=L.marker([u.lat,u.lng],{icon:markerIcon(u.status==="available"?"#2fc98b":"#138df4","🚓")}).addTo(dispatchMap).bindPopup(`<b>${u.name}</b><br>${u.status==="available"?"Disponible":"Ocupada"}`);dispatchLayers.push(m)});
 if($("#showIncidents")?.checked!==false)data.incidents.filter(x=>x.status==="open").forEach(x=>{const m=L.marker([x.lat,x.lng],{icon:markerIcon("#ff5e50","!")}).addTo(fullMap).bindPopup(`<b>${x.id}</b><br>${x.type}`);fullLayers.push(m)});
 if($("#showUnits")?.checked!==false)data.units.forEach(u=>{const m=L.marker([u.lat,u.lng],{icon:markerIcon(u.status==="available"?"#2fc98b":"#138df4","🚓")}).addTo(fullMap).bindPopup(`<b>${u.name}</b><br>${u.status}`);fullLayers.push(m)})
}
function renderIncidents(){
 const q=$("#incidentSearch").value.toLowerCase(),p=$("#priorityFilter").value;
 const arr=data.incidents.filter(i=>i.status===statusFilter&&(!p||i.priority===p)&&(!q||`${i.id} ${i.type} ${i.caller}`.toLowerCase().includes(q)));
 $("#incidentCount").textContent=`Total ${arr.length}`;
 $("#incidentList").innerHTML=arr.map(i=>`<article class="incident-card ${i.id===selectedId?"selected":""}" data-id="${i.id}">
 <div class="incident-top"><div><div class="incident-name">${i.caller}</div><div class="incident-type">${i.type}</div></div><span class="priority ${i.priority}">${priorityLabel(i.priority)}</span></div>
 <div class="incident-code">${i.id} · ${fmt(i.createdAt)}</div><div class="incident-summary">${i.description}</div></article>`).join("")||`<div class="hint" style="padding:20px">No hay incidentes para mostrar.</div>`;
 $$(".incident-card").forEach(c=>c.onclick=()=>{selectedId=c.dataset.id;renderAll()})
}
function renderDetails(){
 const i=selected();$("#detailCode").textContent=i.id;$("#detailDescription").value=i.description;$("#detailNotes").value=i.notes||"";
 const fields=[["Estado",i.status==="open"?"En curso":"Completado"],["Tipo",i.type],["Prioridad",priorityLabel(i.priority)],["Solicitante",i.caller],["DNI / CPF",i.document],["Fecha y hora",fmt(i.createdAt)],["Ubicación",i.address],["Unidades",i.assigned.join(", ")||"Sin asignar"]];
 $("#detailInfo").innerHTML=fields.map(([a,b])=>`<div class="info-item"><small>${a}</small><strong>${b}</strong></div>`).join("");
 $("#timeline").innerHTML=i.timeline.slice().reverse().map(([a,b])=>`<div class="timeline-item"><span class="timeline-dot"></span><div><strong>${a}</strong><small>${fmt(b)}</small></div></div>`).join("")
}
function renderResources(){
 const i=selected();
 $("#unitSelect").innerHTML=`<option value="">Seleccione una unidad</option>`+data.units.map(u=>`<option value="${u.id}">${u.name} · ${u.status==="available"?"Disponible":"Ocupada"}</option>`).join("");
 $("#unitList").innerHTML=data.units.map(u=>`<div class="unit-card"><div><span class="status-dot ${u.status}"></span><b>${u.name}</b><br><small>${u.type} · ${km(i.lat,i.lng,u.lat,u.lng).toFixed(2)} km</small></div><small>${i.assigned.includes(u.id)?"Asignada":u.status==="available"?"Disponible":"Ocupada"}</small></div>`).join("");
 const rec=data.units.filter(u=>u.status==="available").map(u=>({...u,d:km(i.lat,i.lng,u.lat,u.lng)})).sort((a,b)=>a.d-b.d);
 $("#recommendList").innerHTML=rec.map((u,n)=>`<div class="recommend-card"><div><b>#${n+1} ${u.name}</b><br><small>${u.type} · ${u.d.toFixed(2)} km</small></div><button class="primary quick-dispatch" data-unit="${u.id}">Despachar</button></div>`).join("")||`<p class="hint">No hay unidades disponibles.</p>`;
 $$(".quick-dispatch").forEach(b=>b.onclick=()=>dispatch(b.dataset.unit))
}
function dispatch(id){
 const i=selected(),u=data.units.find(x=>x.id===id);if(!u)return toast("Seleccione una unidad");if(u.status!=="available"&&!i.assigned.includes(id))return toast("La unidad no está disponible");if(i.assigned.includes(id))return toast("La unidad ya está asignada");
 u.status="busy";i.assigned.push(id);addTimeline(i,`Unidad ${id} despachada al incidente`);save();renderAll();toast(`${id} despachada`)
}
function renderDashboard(){
 const open=data.incidents.filter(i=>i.status==="open").length,closed=data.incidents.length-open,available=data.units.filter(u=>u.status==="available").length;
 $("#kpis").innerHTML=[["Incidentes activos",open],["Incidentes completados",closed],["Unidades disponibles",available],["Unidades ocupadas",data.units.length-available]].map(x=>`<div class="panel kpi"><span>${x[0]}</span><strong>${x[1]}</strong></div>`).join("");
 const status=[["En curso",open],["Completados",closed]],prio=["high","medium","low"].map(p=>[priorityLabel(p),data.incidents.filter(i=>i.priority===p).length]);
 bars("#statusBars",status);bars("#priorityBars",prio);
 $("#recentTable").innerHTML=table(["Código","Tipo","Estado"],data.incidents.slice().sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt)).slice(0,5).map(i=>[i.id,i.type,i.status==="open"?"En curso":"Completado"]));
 $("#availabilityTable").innerHTML=table(["Unidad","Tipo","Estado"],data.units.map(u=>[u.id,u.type,u.status==="available"?"Disponible":"Ocupada"]))
}
function bars(sel,rows){const max=Math.max(...rows.map(r=>r[1]),1);$(sel).innerHTML=rows.map(r=>`<div class="bar-row"><span>${r[0]}</span><div class="bar-track"><div class="bar-fill" style="width:${r[1]/max*100}%"></div></div><b>${r[1]}</b></div>`).join("")}
function table(h,rows){return `<table><thead><tr>${h.map(x=>`<th>${x}</th>`).join("")}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(x=>`<td>${x}</td>`).join("")}</tr>`).join("")}</tbody></table>`}
function renderCoverage(){
 const reqs=[
 ["17","Interfaz web de servicio y despacho"],["18","Dashboard de incidentes en curso y completados"],["19","Descarga de informes en PDF y XLSX"],["20","Mapa con iconos y datos cartográficos"],["21","Formulario y panel de ocurrencias"],["22","Geolocalización desde registro"],["23","Búsqueda parcial de puntos de interés"],["24","Búsqueda de persona por DNI/CPF"],["25","Ubicación directa mediante clic en mapa"],["26","Detalle integral del incidente"],["27","Despacho de agentes al lugar"],["28","Agentes georreferenciados y lista de disponibles"],["29","Recomendación de agentes más cercanos"],["30","Cronología completa de hechos"]];
 $("#coverageGrid").className="coverage-grid";$("#coverageGrid").innerHTML=reqs.map(r=>`<div class="coverage-item"><b>✓ ${r[0]}</b> ${r[1]}</div>`).join("")
}
function renderAll(){renderIncidents();renderDetails();renderResources();renderDashboard();renderCoverage();renderMaps()}
function exportPdf(all=false){
 const arr=all?data.incidents:[selected()];const {jsPDF}=window.jspdf;const doc=new jsPDF();let y=15;
 doc.setFontSize(16);doc.text(all?"Historial de incidentes":"Informe de incidente",14,y);y+=10;
 arr.forEach((i,idx)=>{if(y>260){doc.addPage();y=15}doc.setFontSize(11);doc.text(`${i.id} - ${i.type}`,14,y);y+=6;doc.setFontSize(9);
 const lines=[`Estado: ${i.status}`,`Prioridad: ${priorityLabel(i.priority)}`,`Solicitante: ${i.caller} (${i.document})`,`Fecha: ${fmt(i.createdAt)}`,`Ubicación: ${i.address}`,`Unidades: ${i.assigned.join(", ")||"Sin asignar"}`,`Descripción: ${i.description}`];
 lines.forEach(t=>{const s=doc.splitTextToSize(t,180);doc.text(s,14,y);y+=s.length*5});y+=5;if(!all){doc.text("Cronología:",14,y);y+=5;i.timeline.forEach(t=>{doc.text(`- ${fmt(t[1])}: ${t[0]}`,16,y);y+=5})}y+=6});
 doc.save(all?"historial-incidentes.pdf":`${selected().id}.pdf`)
}
function exportXlsx(all=false){
 const arr=all?data.incidents:[selected()];const rows=arr.map(i=>({Codigo:i.id,Estado:i.status,Tipo:i.type,Prioridad:priorityLabel(i.priority),Solicitante:i.caller,Documento:i.document,Fecha:fmt(i.createdAt),Ubicacion:i.address,Latitud:i.lat,Longitud:i.lng,Unidades:i.assigned.join(", "),Descripcion:i.description,Notas:i.notes,Cronologia:i.timeline.map(t=>`${fmt(t[1])}: ${t[0]}`).join(" | ")}));
 const ws=XLSX.utils.json_to_sheet(rows),wb=XLSX.utils.book_new();XLSX.utils.book_append_sheet(wb,ws,"Incidentes");XLSX.writeFile(wb,all?"historial-incidentes.xlsx":`${selected().id}.xlsx`)
}
async function geocode(text){
 const local=data.pois.find(p=>`${p.name} ${p.category} ${p.address}`.toLowerCase().includes(text.toLowerCase()));if(local)return local;
 try{const r=await fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(text+", México")}`,{headers:{"Accept-Language":"es"}});const j=await r.json();if(j[0])return{name:j[0].display_name,lat:+j[0].lat,lng:+j[0].lon,address:j[0].display_name}}catch(e){}
 return null
}
function switchView(v){
 $$(".nav").forEach(n=>n.classList.toggle("active",n.dataset.view===v));$$(".view").forEach(x=>x.classList.remove("active"));$(`#view-${v}`).classList.add("active");$("#currentTitle").textContent={dispatch:"Dispatch",dashboard:"Dashboard",map:"Mapa",people:"Personas",reports:"Reportes"}[v];setTimeout(()=>{dispatchMap?.invalidateSize();fullMap?.invalidateSize();renderMaps()},80)
}
$$(".nav[data-view]").forEach(n=>n.onclick=()=>switchView(n.dataset.view));
$$(".tab").forEach(b=>b.onclick=()=>{$$(".tab").forEach(x=>x.classList.remove("active"));b.classList.add("active");statusFilter=b.dataset.status;const first=data.incidents.find(i=>i.status===statusFilter);if(first)selectedId=first.id;renderAll()});
$("#incidentSearch").oninput=renderIncidents;$("#priorityFilter").onchange=renderIncidents;
$$(".section-tabs button").forEach(b=>b.onclick=()=>{$$(".section-tabs button").forEach(x=>x.classList.remove("active"));b.classList.add("active");$$(".detail-page").forEach(x=>x.classList.remove("active"));$(`#detail-${b.dataset.detail}`).classList.add("active")});
$$(".resource-tabs button").forEach(b=>b.onclick=()=>{$$(".resource-tabs button").forEach(x=>x.classList.remove("active"));b.classList.add("active");$$(".resource-page").forEach(x=>x.classList.remove("active"));$(`#resource-${b.dataset.resource}`).classList.add("active")});
$("#dispatchUnit").onclick=()=>dispatch($("#unitSelect").value);
$("#locateUnit").onclick=()=>{const u=data.units.find(x=>x.id===$("#unitSelect").value);if(!u)return toast("Seleccione una unidad");dispatchMap.setView([u.lat,u.lng],16);toast(`${u.name} localizada`)};
$("#addNote").onclick=()=>{const v=$("#newNote").value.trim();if(!v)return;const i=selected();i.notes+=(i.notes?"\n":"")+v;addTimeline(i,`Nota: ${v}`);$("#newNote").value="";save();renderAll()};
$("#detailDescription").onchange=e=>{selected().description=e.target.value;save();renderIncidents()};
$("#detailNotes").onchange=e=>{selected().notes=e.target.value;save()};
$("#closeIncident").onclick=()=>{const i=selected();if(i.status==="closed")return toast("El incidente ya está cerrado");i.status="closed";i.closedAt=new Date().toISOString();addTimeline(i,"Incidente cerrado");i.assigned.forEach(id=>{const u=data.units.find(x=>x.id===id);if(u)u.status="available"});save();statusFilter="open";selectedId=data.incidents.find(x=>x.status==="open")?.id||i.id;renderAll();toast("Incidente completado")};
$("#createIncidentBtn").onclick=()=>$("#incidentDialog").showModal();$("#closeDialog").onclick=$("#cancelDialog").onclick=()=>$("#incidentDialog").close();
$("#geocodeAddress").onclick=async()=>{const q=$("#addressInput").value.trim();if(!q)return toast("Escriba una dirección");toast("Buscando ubicación...");const p=await geocode(q);if(!p)return toast("No se encontró la dirección");$("#latInput").value=p.lat;$("#lngInput").value=p.lng;toast("Dirección geolocalizada")};
$("#incidentForm").onsubmit=e=>{e.preventDefault();const f=new FormData(e.target),id=`INC-${new Date().getFullYear()}-${String(data.incidents.length+1).padStart(4,"0")}`;const i={id,caller:f.get("caller"),document:f.get("document"),type:f.get("type"),priority:f.get("priority"),status:"open",createdAt:new Date().toISOString(),address:f.get("address"),lat:+f.get("lat"),lng:+f.get("lng"),description:f.get("description"),notes:"",assigned:[],timeline:[["Incidente creado",new Date().toISOString()],["Dirección geolocalizada",new Date().toISOString()]]};data.incidents.unshift(i);selectedId=id;statusFilter="open";save();e.target.reset();$("#incidentDialog").close();renderAll();toast("Incidente creado")};
$("#searchPoi").onclick=()=>{const q=$("#poiSearch").value.toLowerCase();const r=data.pois.filter(p=>`${p.name} ${p.category} ${p.address}`.toLowerCase().includes(q));$("#poiResults").innerHTML=r.map(p=>`<div class="poi-card"><div><b>${p.name}</b><br><small>${p.category} · ${p.address}</small></div><button data-lat="${p.lat}" data-lng="${p.lng}" data-name="${p.name}">Usar</button></div>`).join("")||`<p class="hint">Sin resultados.</p>`;$$(".poi-card button").forEach(b=>b.onclick=()=>{const i=selected();i.lat=+b.dataset.lat;i.lng=+b.dataset.lng;i.address=b.dataset.name;addTimeline(i,`Ubicación definida mediante POI: ${b.dataset.name}`);save();renderAll();toast("Ubicación actualizada")})};
$("#searchPerson").onclick=()=>{const q=$("#personSearch").value.replace(/\D/g,""),p=data.people.find(x=>x.document===q)||data.incidents.find(x=>x.document===q);if(!p){$("#personResult").className="person-result empty";$("#personResult").textContent="No se encontró una persona con ese DNI/CPF.";return}const incidents=p.incidents||data.incidents.filter(i=>i.document===q).map(i=>i.id);$("#personResult").className="person-result";$("#personResult").innerHTML=`<div class="person-grid"><div><small>Nombre</small><b>${p.name||p.caller}</b></div><div><small>DNI / CPF</small><b>${q}</b></div><div><small>Teléfono</small><b>${p.phone||"No registrado"}</b></div><div><small>Dirección</small><b>${p.address||"No registrada"}</b></div><div><small>Alertas</small><b>${p.alerts||"Sin alertas"}</b></div><div><small>Incidentes</small><b>${incidents.join(", ")||"Ninguno"}</b></div></div>`};
$("#showIncidents").onchange=renderMaps;$("#showUnits").onchange=renderMaps;
$("#exportPdfQuick").onclick=$("#reportSelectedPdf").onclick=()=>exportPdf(false);$("#exportXlsxQuick").onclick=$("#reportSelectedXlsx").onclick=()=>exportXlsx(false);$("#reportAllPdf").onclick=()=>exportPdf(true);$("#reportAllXlsx").onclick=()=>exportXlsx(true);
$("#themeToggle").onclick=()=>document.body.classList.toggle("light");
$("#resetDemo").onclick=()=>{if(confirm("¿Restablecer todos los datos de demostración?")){data=structuredClone(seed);save();selectedId=data.incidents[0].id;renderAll();toast("Demo restablecida")}};
setInterval(()=>{data.units.forEach(u=>{if(u.status==="available"){u.lat+=(Math.random()-.5)*.001;u.lng+=(Math.random()-.5)*.001}});save();renderMaps();renderResources()},8000);
window.addEventListener("DOMContentLoaded",()=>{initMaps();renderAll()});
