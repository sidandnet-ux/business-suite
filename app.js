
const apps = [
  {
    id: "checkbill",
    name: "CheckBill",
    description: "Billing, quotations and item calculations",
    icon: "🧾",
    url: "https://sidandnet-ux.github.io/checkbill/"
  },

  {
    id: "todo",
    name: "TODO",
    description: "TODO",
    icon: "📦",
    url: "https://sidandnet-ux.github.io/todo/"
  },

  {
    id: "Expense-Manage",
    name: "Expense-Manage",
    description: "Expense-Manage",
    icon: "📅",
    url: "https://sidandnet-ux.github.io/Expense-Manage/"
  },
  {
    id: "task",
    name: "task",
    description: "task",
    icon: "📅",
    url: "https://sidandnet-ux.github.io/task/"
  }
  
];

let currentApp = null;

const dashboard = document.getElementById("dashboard");
const viewer = document.getElementById("appViewer");
const frame = document.getElementById("appFrame");

function createApps() {
  const grid = document.getElementById("appGrid");
  const sidebar = document.getElementById("sideApps");

  grid.innerHTML = "";
  sidebar.innerHTML = "";

  apps.forEach(app => {

    // Dashboard card
    const card = document.createElement("button");
    card.className = "app-card";

    const icon = document.createElement("div");
    icon.className = "app-icon";
    icon.textContent = app.icon;

    const title = document.createElement("h3");
    title.textContent = app.name;

    const description = document.createElement("p");
    description.textContent = app.description;

    const open = document.createElement("span");
    open.className = "open-label";
    open.textContent = "Open application →";

    card.append(icon, title, description, open);
    card.onclick = () => openApp(app.id);
    grid.appendChild(card);

    // Sidebar navigation
    const nav = document.createElement("button");
    nav.className = "nav-btn";
    nav.textContent = app.icon + "  " + app.name;
    nav.dataset.app = app.id;
    nav.onclick = () => openApp(app.id);

    sidebar.appendChild(nav);
  });
}

function openApp(id) {
  const app = apps.find(item => item.id === id);
  if (!app) return;

  currentApp = app;

  dashboard.classList.add("hidden");
  viewer.classList.remove("hidden");

  document.getElementById("pageTitle").textContent = app.name;
  document.getElementById("currentAppName").textContent = app.name;
  document.getElementById("frameError").classList.add("hidden");

  frame.src = app.url;

  document.querySelectorAll(".nav-btn").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.app === id
    );
  });

  document.getElementById("sidebar").classList.remove("show");
}

function showDashboard() {
  dashboard.classList.remove("hidden");
  viewer.classList.add("hidden");

  document.getElementById("pageTitle").textContent = "Dashboard";

  document.querySelectorAll(".nav-btn").forEach(button => {
    button.classList.toggle(
      "active",
      !button.dataset.app
    );
  });

  document.getElementById("sidebar").classList.remove("show");
}

function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("show");
}

function reloadApp() {
  if (currentApp) {
    frame.src = currentApp.url;
    document.getElementById("frameError").classList.add("hidden");
  }
}

function openExternal() {
  if (currentApp) {
    window.open(currentApp.url, "_blank", "noopener");
  }
}

// Detect failed iframe loading.
// Some cross-origin restrictions cannot be detected reliably;
// the Open separately option remains available.
frame.addEventListener("error", () => {
  document.getElementById("frameError").classList.remove("hidden");
});

createApps();
