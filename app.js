const screens = [...document.querySelectorAll('.screen')];
const titleNode = document.getElementById('screenTitle');
const toast = document.getElementById('toast');
const drawer = document.getElementById('drawer');
const navButtons = [...document.querySelectorAll('.nav-btn')];

const appState = {
  currentScreen: 'loginScreen',
  user: null,
  selectedProjectId: 'lakeview',
};

const projects = [
  {
    id: 'lakeview',
    name: 'Lakeview Residence',
    client: 'Mr. Rahman',
    location: 'Gulshan, Dhaka',
    stage: 'Structural Design',
    status: 'In Progress',
    completion: 72,
    rajuk: 'Prepared',
  },
  {
    id: 'hillside',
    name: 'Hillside Villa',
    client: 'Mr. Rahman',
    location: 'Banani, Dhaka',
    stage: 'Concept Design',
    status: 'Pending Client Feedback',
    completion: 45,
    rajuk: 'In Review',
  },
  {
    id: 'modern',
    name: 'Modern Office Complex',
    client: 'ABC Corp',
    location: 'Motijheel, Dhaka',
    stage: 'Completion',
    status: 'Completed',
    completion: 100,
    rajuk: 'Approved',
  },
];

const rajukSteps = [
  { title: 'Drawing Submission', status: 'Submitted', level: 'green' },
  { title: 'Scrutiny', status: 'In Review', level: 'orange' },
  { title: 'Correction Required', status: 'Action Needed', level: 'red' },
  { title: 'Approval Granted', status: 'Pending Final Signature', level: 'blue' },
];

const documents = [
  { name: 'Approved Drawings', action: 'Download PDF' },
  { name: 'RAJUK Approval Letter', action: 'View PDF' },
  { name: 'Completion Certificate', action: 'Download PDF' },
];

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 1600);
}

function statusPill(status) {
  if (status.includes('Completed') || status.includes('Approved')) return 'green';
  if (status.includes('Progress') || status.includes('Submitted') || status.includes('Prepared')) return 'blue';
  if (status.includes('Pending') || status.includes('Review')) return 'orange';
  return 'red';
}

function showScreen(id) {
  if (!appState.user && id !== 'loginScreen') {
    showToast('Please login first');
    return;
  }

  appState.currentScreen = id;
  screens.forEach((screen) => screen.classList.toggle('active', screen.id === id));

  const titles = {
    loginScreen: 'Foundrio',
    dashboardScreen: `Hello, ${appState.user?.name || 'Admin'}`,
    projectsScreen: `Welcome, ${appState.user?.name || 'Client'}`,
    detailScreen: 'Project Progress',
    rajukScreen: 'RAJUK Status',
    documentsScreen: 'Documents',
  };
  titleNode.textContent = titles[id];

  navButtons.forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.screen === id);
  });
}

function renderDashboard() {
  const stats = [
    { label: 'Total Projects', value: projects.length, gold: false },
    { label: 'In Progress', value: projects.filter((p) => p.status.includes('Progress')).length, gold: false },
    { label: 'Completed', value: projects.filter((p) => p.status === 'Completed').length, gold: false },
    { label: 'Pending RAJUK', value: projects.filter((p) => p.rajuk !== 'Approved').length, gold: false },
  ];

  document.getElementById('statsGrid').innerHTML = stats
    .map(
      (s) => `<article class="stat ${s.gold ? 'gold' : ''}"><strong>${s.value}</strong><small>${s.label}</small></article>`,
    )
    .join('');

  document.getElementById('projectList').innerHTML = projects
    .map(
      (project) => `
      <article class="card" data-open-detail="${project.id}">
        <h4>${project.name} <span class="pill ${statusPill(project.status)}">${project.status}</span></h4>
        <p>Client: ${project.client}</p>
        <p>Location: ${project.location}</p>
        <p>Stage: ${project.stage}</p>
        <div class="progress"><span style="width:${project.completion}%"></span></div>
      </article>
    `,
    )
    .join('');
}

function renderProjects() {
  document.getElementById('clientProjectList').innerHTML = projects
    .map(
      (project) => `
      <article class="card" data-open-detail="${project.id}">
        <h4>${project.name}</h4>
        <p>Client: ${project.client}</p>
        <p>Location: ${project.location}</p>
        <p>Stage: ${project.stage} <span class="pill ${statusPill(project.rajuk)}">${project.rajuk}</span></p>
        <div class="progress"><span style="width:${project.completion}%"></span></div>
      </article>
    `,
    )
    .join('');
}

function renderProjectDetail() {
  const project = projects.find((p) => p.id === appState.selectedProjectId) || projects[0];
  document.getElementById('detailHeader').innerHTML = `
    <h3>${project.name}</h3>
    <p>Client: ${project.client}</p>
    <p>Location: ${project.location}</p>
  `;

  const phases = [
    { name: 'Concept Design', status: project.completion > 30 ? 'Completed' : 'In Progress' },
    { name: 'Architectural Drawing', status: project.completion > 45 ? 'Completed' : 'In Progress' },
    { name: 'Structural Design', status: project.stage === 'Structural Design' ? 'In Progress' : 'Completed' },
    { name: 'RAJUK Review', status: project.rajuk },
  ];

  document.getElementById('progressList').innerHTML = phases
    .map(
      (phase) => `<article class="card"><h4>${phase.name}</h4><span class="pill ${statusPill(phase.status)}">${phase.status}</span></article>`,
    )
    .join('');
}

function renderRajuk() {
  document.getElementById('rajukList').innerHTML = rajukSteps
    .map(
      (step) => `<article class="card"><h4>${step.title}</h4><span class="pill ${step.level}">${step.status}</span></article>`,
    )
    .join('');
}

function renderDocuments() {
  document.getElementById('documentsList').innerHTML = documents
    .map(
      (doc) => `<article class="card"><h4>${doc.name}</h4><button class="btn doc-action" data-doc="${doc.name}">${doc.action}</button></article>`,
    )
    .join('');
}

function createPdf(docName) {
  const content = `%PDF-1.1\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n2 0 obj<</Type/Pages/Count 1/Kids[3 0 R]>>endobj\n3 0 obj<</Type/Page/Parent 2 0 R/MediaBox[0 0 300 180]/Contents 4 0 R>>endobj\n4 0 obj<</Length 65>>stream\nBT /F1 14 Tf 40 120 Td (${docName.replace(/[^a-zA-Z0-9 ]/g, '')}) Tj ET\nendstream\nendobj\nxref\n0 5\n0000000000 65535 f\n0000000010 00000 n\n0000000060 00000 n\n0000000117 00000 n\n0000000214 00000 n\ntrailer<</Root 1 0 R/Size 5>>\nstartxref\n330\n%%EOF`;
  const blob = new Blob([content], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${docName.toLowerCase().replace(/\s+/g, '-')}.pdf`;
  a.click();
  URL.revokeObjectURL(url);
}

function bootstrap() {
  renderDashboard();
  renderProjects();
  renderProjectDetail();
  renderRajuk();
  renderDocuments();

  document.getElementById('loginForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const identity = document.getElementById('emailInput').value.trim();
    const password = document.getElementById('passwordInput').value.trim();

    if (!identity || !password) {
      showToast('Please enter email/phone and password');
      return;
    }

    const name = identity.includes('@') ? identity.split('@')[0] : identity;
    appState.user = { name: name.replace(/[^a-z0-9]/gi, '') || 'Admin' };
    document.getElementById('userNameLabel').textContent = appState.user.name;
    showScreen('dashboardScreen');
    showToast('Login successful');
  });

  document.getElementById('projectList').addEventListener('click', handleOpenDetail);
  document.getElementById('clientProjectList').addEventListener('click', handleOpenDetail);

  document.getElementById('rajukStatusBtn').addEventListener('click', () => showScreen('rajukScreen'));
  document.getElementById('openDocumentsBtn').addEventListener('click', () => showScreen('documentsScreen'));

  document.getElementById('documentsList').addEventListener('click', (event) => {
    const button = event.target.closest('[data-doc]');
    if (!button) return;
    createPdf(button.dataset.doc);
    showToast(`${button.dataset.doc} downloaded`);
  });

  navButtons.forEach((button) => button.addEventListener('click', () => showScreen(button.dataset.screen)));

  document.getElementById('menuButton').addEventListener('click', () => drawer.classList.toggle('open'));
  drawer.addEventListener('click', (event) => {
    const target = event.target.closest('[data-screen]');
    if (!target) return;
    showScreen(target.dataset.screen);
    drawer.classList.remove('open');
  });

  document.getElementById('notifyButton').addEventListener('click', () => showToast('No new notifications'));
  document.getElementById('registerBtn').addEventListener('click', () => showToast('Client registration enabled'));
  document.getElementById('forgotBtn').addEventListener('click', () => showToast('Password reset link sent'));

  document.getElementById('logoutBtn').addEventListener('click', () => {
    appState.user = null;
    appState.selectedProjectId = projects[0].id;
    document.getElementById('loginForm').reset();
    drawer.classList.remove('open');
    showScreen('loginScreen');
    showToast('Logged out');
  });

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  }

  showScreen('loginScreen');
}

function handleOpenDetail(event) {
  const card = event.target.closest('[data-open-detail]');
  if (!card) return;
  appState.selectedProjectId = card.dataset.openDetail;
  renderProjectDetail();
  showScreen('detailScreen');
}

bootstrap();
