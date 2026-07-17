const priorityLabels = {
  high: "PRIORIDAD ALTA",
  medium: "PRIORIDAD MEDIA",
  low: "PRIORIDAD BAJA"
};

const incidents = [
  {
    id: 202601260005,
    caller: "Daniel Bello",
    type: "Extorsión telefónica",
    priority: "medium",
    createdAt: "26/1/2026, 3:02:40 p.m.",
    summary: "Se investiga por extorsión, persona identificada como el ladrón",
    description: "Llamada reportada por posible extorsión telefónica. Se solicita validar identidad, ubicación y canal de contacto.",
    location: "Av. Universidad y C. Progreso",
    status: "dispatched",
    assigned: ["P-014"],
    notes: "Solicitante permanece en línea.",
    timeline: [
      ["Incidente creado", "26/1/2026, 3:02:40 p.m."],
      ["Ubicación validada", "26/1/2026, 3:03:02 p.m."],
      ["Unidad P-014 asignada", "26/1/2026, 3:04:15 p.m."]
    ],
    marker: [58, 44]
  },
  {
    id: 202601260004,
    caller: "Diego Piero",
    type: "Abuso de confianza",
    priority: "medium",
    createdAt: "26/1/2026, 3:01:15 p.m.",
    summary: "Presenta abuso de confianza por robar un comercio",
    description: "Propietario reporta faltante de mercancía y posible participación de un empleado.",
    location: "C. Libertad 114",
    status: "dispatched",
    assigned: [],
    notes: "",
    timeline: [
      ["Incidente creado", "26/1/2026, 3:01:15 p.m."],
      ["Datos del solicitante validados", "26/1/2026, 3:02:10 p.m."]
    ],
    marker: [72, 61]
  },
  {
    id: 202601260003,
    caller: "Lorenzo Bustamante",
    type: "Ahogamiento",
    priority: "high",
    createdAt: "26/1/2026, 2:59:40 p.m.",
    summary: "Persona en río presenta ahogamiento",
    description: "Se reporta una persona con dificultad respiratoria en un cuerpo de agua. Requiere atención médica inmediata.",
    location: "Río, sector Lomas Lindas",
    status: "dispatched",
    assigned: ["AMB-07"],
    notes: "Se activó protocolo médico.",
    timeline: [
      ["Incidente creado", "26/1/2026, 2:59:40 p.m."],
      ["Prioridad elevada a alta", "26/1/2026, 3:00:01 p.m."],
      ["Ambulancia AMB-07 asignada", "26/1/2026, 3:00:22 p.m."]
    ],
    marker: [21, 75]
  },
  {
    id: 202601260002,
    caller: "Lorena Palacios",
    type: "Asfixia",
    priority: "high",
    createdAt: "26/1/2026, 2:58:16 p.m.",
    summary: "Persona se asfixia con nuez",
    description: "Paciente consciente con obstrucción parcial de vía aérea. Se brindan instrucciones telefónicas.",
    location: "Cda. Libertad 32",
    status: "dispatched",
    assigned: ["AMB-11"],
    notes: "Despacho médico prioritario.",
    timeline: [
      ["Incidente creado", "26/1/2026, 2:58:16 p.m."],
      ["Instrucciones de primeros auxilios", "26/1/2026, 2:58:50 p.m."],
      ["Ambulancia AMB-11 asignada", "26/1/2026, 2:59:04 p.m."]
    ],
    marker: [67, 57]
  },
  {
    id: 202601260001,
    caller: "Mario Leal",
    type: "Accidente ferroviario con persona(s) fallecida(s)",
    priority: "high",
    createdAt: "26/1/2026, 2:55:19 p.m.",
    summary: "Accidente ferroviario con posible víctima",
    description: "Se reporta incidente en vía férrea. Policía y servicios médicos requeridos.",
    location: "Cruce ferroviario, C. Cuatro",
    status: "dispatched",
    assigned: ["P-022", "AMB-03"],
    notes: "",
    timeline: [
      ["Incidente creado", "26/1/2026, 2:55:19 p.m."],
      ["Policía y ambulancia notificadas", "26/1/2026, 2:55:44 p.m."]
    ],
    marker: [79, 35]
  },
  {
    id: 202601250010,
    caller: "Sofía Cruz",
    type: "Robo a comercio",
    priority: "low",
    createdAt: "25/1/2026, 8:20:14 p.m.",
    summary: "Incidente finalizado y documentado",
    description: "Robo sin violencia. Informe completado.",
    location: "Plaza Central",
    status: "closed",
    assigned: ["P-031"],
    notes: "Caso cerrado.",
    timeline: [
      ["Incidente creado", "25/1/2026, 8:20:14 p.m."],
      ["Unidad P-031 asignada", "25/1/2026, 8:22:00 p.m."],
      ["Incidente cerrado", "25/1/2026, 9:17:33 p.m."]
    ],
    marker: [36, 49]
  }
];

const units = [
  { id: "P-014", label: "P-014 · Policía", status: "available", distance: "1.2 km" },
  { id: "P-022", label: "P-022 · Policía", status: "busy", distance: "2.8 km" },
  { id: "P-031", label: "P-031 · Policía", status: "available", distance: "3.4 km" },
  { id: "AMB-03", label: "AMB-03 · Ambulancia", status: "busy", distance: "1.9 km" },
  { id: "AMB-07", label: "AMB-07 · Ambulancia", status: "available", distance: "2.1 km" },
  { id: "AMB-11", label: "AMB-11 · Ambulancia", status: "available", distance: "4.0 km" }
];

let selectedIncidentId = incidents[0].id;
let currentStatus = "dispatched";
let activeResource = "dispatch";

const incidentList = document.getElementById("incidentList");
const resultCount = document.getElementById("resultCount");
const detailDate = document.getElementById("detailDate");
const incidentDescription = document.getElementById("incidentDescription");
const notesInput = document.getElementById("notesInput");
const timeline = document.getElementById("timeline");
const mapMarker = document.getElementById("mapMarker");
const incidentAvatar = document.getElementById("incidentAvatar");
const unitSelect = document.getElementById("unitSelect");
const unitStatus = document.getElementById("unitStatus");
const resourceContent = document.getElementById("resourceContent");
const toast = document.getElementById("toast");

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2400);
}

function getSelectedIncident() {
  return incidents.find((incident) => incident.id === selectedIncidentId) || incidents[0];
}

function renderIncidents() {
  const filtered = incidents.filter((incident) => incident.status === currentStatus);
  resultCount.textContent = `Total ${filtered.length}`;

  if (!filtered.some((incident) => incident.id === selectedIncidentId) && filtered.length) {
    selectedIncidentId = filtered[0].id;
  }

  incidentList.innerHTML = filtered.map((incident) => `
    <article class="incident-card ${incident.id === selectedIncidentId ? "selected" : ""}" data-id="${incident.id}">
      <div class="incident-top">
        <div>
          <div class="incident-name">${incident.caller}</div>
          <div class="incident-type">${incident.type}</div>
        </div>
        <div class="incident-meta">
          <span class="priority ${incident.priority}">${priorityLabels[incident.priority]}</span><br>
          <span class="incident-code ${incident.priority}">${incident.id}</span>
          <div class="incident-time">${incident.createdAt}</div>
        </div>
      </div>
      <div class="incident-summary-row">
        <div class="incident-summary">${incident.summary}</div>
        <div class="alert-icons">
          <span class="alert-icon">🚓</span>
          <span class="alert-badge">${incident.assigned.length}</span>
        </div>
      </div>
    </article>
  `).join("");

  incidentList.querySelectorAll(".incident-card").forEach((card) => {
    card.addEventListener("click", () => {
      selectedIncidentId = Number(card.dataset.id);
      renderIncidents();
      renderDetails();
    });
  });

  renderDetails();
  updateMapStats();
}

function renderDetails() {
  const incident = getSelectedIncident();
  detailDate.textContent = incident.createdAt;
  incidentAvatar.textContent = incident.assigned.length;
  incidentDescription.value = incident.description;
  notesInput.value = incident.notes;
  mapMarker.style.left = `${incident.marker[0]}%`;
  mapMarker.style.top = `${incident.marker[1]}%`;
  mapMarker.title = incident.location;

  timeline.innerHTML = incident.timeline.map(([event, time]) => `
    <div class="timeline-item">
      <span class="timeline-dot"></span>
      <div><strong>${event}</strong><span>${time}</span></div>
    </div>
  `).join("");

  renderResources();
}

function renderResources() {
  const incident = getSelectedIncident();

  if (activeResource === "dispatch") {
    resourceContent.innerHTML = `
      <div class="unit-row">
        <label for="unitSelect"><span>*</span> Units</label>
        <select id="unitSelect">
          <option value="">Select</option>
          ${units.map((unit) => `<option value="${unit.id}">${unit.label} · ${unit.distance} · ${unit.status === "available" ? "Disponible" : "Ocupada"}</option>`).join("")}
        </select>
        <button id="dispatchUnitButton" class="dispatch-btn" type="button" title="Despachar unidad">🚙</button>
        <button id="locateUnitButton" class="locate-btn" type="button" title="Localizar unidad">⌖</button>
      </div>
      <div id="unitStatus" class="unit-status">${incident.assigned.length ? `Unidades asignadas: ${incident.assigned.join(", ")}` : "Seleccione una unidad disponible."}</div>
    `;

    document.getElementById("dispatchUnitButton").addEventListener("click", dispatchSelectedUnit);
    document.getElementById("locateUnitButton").addEventListener("click", locateSelectedUnit);
  }

  if (activeResource === "people") {
    resourceContent.innerHTML = `
      <div class="unit-status">
        <strong>Solicitante:</strong> ${incident.caller}<br><br>
        <strong>Identificación:</strong> DNI/CPF simulado · 08941267<br><br>
        <strong>Contacto:</strong> +52 55 0000 0000
      </div>
    `;
  }

  if (activeResource === "vehicles") {
    resourceContent.innerHTML = `
      <div class="unit-status">
        <strong>Vehículos relacionados:</strong><br><br>
        ${incident.assigned.length ? incident.assigned.map((id) => `${id} · GPS activo`).join("<br>") : "Sin vehículos asignados."}
      </div>
    `;
  }
}

function dispatchSelectedUnit() {
  const select = document.getElementById("unitSelect");
  const incident = getSelectedIncident();
  const unit = units.find((item) => item.id === select.value);

  if (!unit) return showToast("Selecciona una unidad.");
  if (unit.status !== "available") return showToast("La unidad seleccionada no está disponible.");
  if (incident.assigned.includes(unit.id)) return showToast("La unidad ya está asignada.");

  incident.assigned.push(unit.id);
  unit.status = "busy";
  incident.timeline.push([`Unidad ${unit.id} asignada`, new Date().toLocaleString("es-MX")]);
  showToast(`${unit.id} despachada al incidente ${incident.id}.`);
  renderIncidents();
}

function locateSelectedUnit() {
  const select = document.getElementById("unitSelect");
  const unit = units.find((item) => item.id === select.value);
  if (!unit) return showToast("Selecciona una unidad para localizar.");
  showToast(`${unit.id} localizada a ${unit.distance} del incidente.`);
}

function updateMapStats() {
  document.getElementById("activeIncidentCount").textContent = incidents.filter((i) => i.status === "dispatched").length;
  document.getElementById("availableUnitCount").textContent = units.filter((u) => u.status === "available").length;

  const markerContainer = document.getElementById("fullMapMarkers");
  markerContainer.innerHTML = [
    ...incidents.filter((i) => i.status === "dispatched").map((incident) => `
      <div class="full-marker incident" title="${incident.type}" style="left:${incident.marker[0]}%;top:${incident.marker[1]}%">!</div>
    `),
    ...units.map((unit, index) => `
      <div class="full-marker unit" title="${unit.label}" style="left:${15 + ((index * 13) % 72)}%;top:${20 + ((index * 19) % 60)}%">🚓</div>
    `)
  ].join("");
}

document.querySelectorAll(".segment").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".segment").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    currentStatus = button.dataset.status;
    renderIncidents();
  });
});

document.querySelectorAll(".resource-tab").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".resource-tab").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    activeResource = button.dataset.resource;
    renderResources();
  });
});

document.querySelectorAll(".nav-item").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".nav-item").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    const mapMode = button.dataset.view === "map";
    document.getElementById("dispatchView").classList.toggle("hidden", mapMode);
    document.getElementById("mapView").classList.toggle("hidden", !mapMode);
    updateMapStats();
  });
});

document.getElementById("collapseSidebar").addEventListener("click", () => {
  document.querySelector(".sidebar").classList.toggle("collapsed");
});

document.getElementById("themeButton").addEventListener("click", () => {
  document.body.classList.toggle("light");
});

document.getElementById("refreshButton").addEventListener("click", () => {
  renderIncidents();
  showToast("Información actualizada.");
});

document.getElementById("filterButton").addEventListener("click", () => {
  showToast("Filtro de demostración: usa DISPATCHED o CLOSED.");
});

document.getElementById("sendNoteButton").addEventListener("click", () => {
  const input = document.getElementById("messageInput");
  const text = input.value.trim();
  if (!text) return;

  const incident = getSelectedIncident();
  incident.notes = `${incident.notes}${incident.notes ? "\n" : ""}${text}`;
  incident.timeline.push(["Nota agregada", new Date().toLocaleString("es-MX")]);
  notesInput.value = incident.notes;
  input.value = "";
  renderDetails();
  showToast("Nota agregada.");
});

const dialog = document.getElementById("incidentDialog");
document.getElementById("newIncidentButton").addEventListener("click", () => dialog.showModal());

document.getElementById("incidentForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const newIncident = {
    id: Number(`${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, "0")}${String(new Date().getDate()).padStart(2, "0")}${String(incidents.length + 1).padStart(4, "0")}`),
    caller: data.get("caller"),
    type: data.get("type"),
    priority: data.get("priority"),
    createdAt: new Date().toLocaleString("es-MX"),
    summary: data.get("description"),
    description: data.get("description"),
    location: data.get("location"),
    status: "dispatched",
    assigned: [],
    notes: "",
    timeline: [["Incidente creado", new Date().toLocaleString("es-MX")]],
    marker: [35 + Math.floor(Math.random() * 35), 25 + Math.floor(Math.random() * 45)]
  };

  incidents.unshift(newIncident);
  selectedIncidentId = newIncident.id;
  currentStatus = "dispatched";
  document.querySelectorAll(".segment").forEach((item) => item.classList.toggle("active", item.dataset.status === "dispatched"));
  dialog.close();
  event.currentTarget.reset();
  renderIncidents();
  showToast("Incidente creado correctamente.");
});

renderIncidents();
