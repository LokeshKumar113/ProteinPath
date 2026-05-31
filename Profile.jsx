@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap');

:root {
  --green: #1D9E75;
  --green-dark: #0F6E56;
  --green-light: #E1F5EE;
  --green-text: #085041;
  --amber: #BA7517;
  --amber-light: #FAEEDA;
  --amber-text: #633806;
  --red: #E24B4A;
  --red-light: #FCEBEB;
  --red-text: #791F1F;
  --teal: #1D9E75;
  --teal-light: #E1F5EE;
  --teal-text: #0F6E56;
  --gray: #F7F6F3;
  --gray-mid: #E8E6E1;
  --border: #E5E3DE;
  --text: #1A1917;
  --text-2: #6B6860;
  --text-3: #9E9B95;
  --surface: #FFFFFF;
  --bg: #F4F2EE;
  --radius: 12px;
  --radius-sm: 8px;
}

@media (prefers-color-scheme: dark) {
  :root {
    --green: #5DCAA5;
    --green-dark: #9FE1CB;
    --green-light: #04342C;
    --green-text: #9FE1CB;
    --amber: #EF9F27;
    --amber-light: #412402;
    --amber-text: #FAC775;
    --red: #F09595;
    --red-light: #501313;
    --red-text: #F7C1C1;
    --teal-light: #04342C;
    --teal-text: #9FE1CB;
    --border: #2E2C28;
    --text: #F0EDE8;
    --text-2: #A09D97;
    --text-3: #6B6860;
    --surface: #1C1B18;
    --bg: #121110;
    --gray: #1C1B18;
  }
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html, body {
  height: 100%;
  font-family: 'DM Sans', system-ui, sans-serif;
  background: var(--bg);
  color: var(--text);
  -webkit-font-smoothing: antialiased;
}

#root { height: 100%; }

.app-shell {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  background: var(--bg);
  padding: 0;
}

.app-container {
  width: 100%;
  max-width: 430px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bg);
  position: relative;
}

/* Header */
.app-header {
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 10;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo-icon { font-size: 22px; }
.logo-text {
  font-size: 17px;
  font-weight: 600;
  color: var(--text);
  letter-spacing: -0.01em;
}

.header-protein {
  display: flex;
  align-items: baseline;
  gap: 4px;
}
.header-protein-val {
  font-size: 15px;
  font-weight: 600;
  color: var(--green);
}
.header-protein-label {
  font-size: 12px;
  color: var(--text-3);
}

/* Main content */
.app-main {
  flex: 1;
  overflow-y: auto;
  padding-bottom: 72px;
}

/* Bottom nav */
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 430px;
  background: var(--surface);
  border-top: 1px solid var(--border);
  display: flex;
  padding: 6px 0 env(safe-area-inset-bottom, 6px);
  z-index: 10;
}

.nav-btn {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px 4px;
  color: var(--text-3);
  font-size: 11px;
  font-family: inherit;
  transition: color 0.15s;
}

.nav-btn.active { color: var(--green); }
.nav-btn:hover { color: var(--text-2); }

/* Screens */
.screen { padding: 16px; }

.screen-header { margin-bottom: 16px; }

.greeting {
  font-size: 20px;
  font-weight: 600;
  color: var(--text);
  letter-spacing: -0.02em;
  margin-bottom: 2px;
}

.subtext {
  font-size: 13px;
  color: var(--text-2);
}

.section-title {
  font-size: 11px;
  font-weight: 600;
  color: var(--text-3);
  text-transform: uppercase;
  letter-spacing: 0.07em;
  margin-bottom: 10px;
}

/* Cards */
.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 16px;
  margin-bottom: 12px;
}

/* Ring card */
.ring-card {
  display: flex;
  align-items: center;
  gap: 16px;
}

.ring-wrap { position: relative; flex-shrink: 0; }

.ring-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  line-height: 1.1;
}

.ring-value {
  display: block;
  font-size: 20px;
  font-weight: 600;
  color: var(--text);
}

.ring-label {
  display: block;
  font-size: 10px;
  color: var(--text-3);
}

.ring-pct {
  display: block;
  font-size: 12px;
  font-weight: 600;
  color: var(--green);
  margin-top: 1px;
}

.ring-stats { flex: 1; }

.stat-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
  border-bottom: 1px solid var(--border);
  font-size: 13px;
}

.stat-row:last-child { border-bottom: none; }

.stat-label {
  display: flex;
  align-items: center;
  gap: 5px;
  color: var(--text-2);
}

.stat-val { font-weight: 500; color: var(--text); }
.stat-val.green { color: var(--green); }
.stat-val.red { color: var(--red); }

/* Mini cards */
.mini-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 16px;
}

.mini-card {
  background: var(--gray);
  border-radius: var(--radius-sm);
  padding: 12px;
}

.mini-card.green { background: var(--green-light); }

.mini-label {
  font-size: 11px;
  color: var(--text-3);
  margin-bottom: 4px;
}

.mini-value {
  font-size: 22px;
  font-weight: 600;
  color: var(--text);
  letter-spacing: -0.02em;
  margin-bottom: 2px;
}

.mini-sub { font-size: 11px; color: var(--text-2); }

/* Log items */
.log-item {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 10px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.log-name {
  font-size: 14px;
  font-weight: 500;
  color: var(--text);
  margin-bottom: 2px;
}

.log-meta { font-size: 12px; color: var(--text-2); }

.log-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
}

.protein-badge {
  font-size: 14px;
  font-weight: 600;
  color: var(--green);
}

.log-time { font-size: 11px; color: var(--text-3); }

.remove-btn {
  background: none;
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 3px 6px;
  cursor: pointer;
  color: var(--text-3);
  display: flex;
  align-items: center;
}

.remove-btn:hover {
  border-color: var(--red);
  color: var(--red);
}

/* CTA button */
.cta-btn {
  display: block;
  width: 100%;
  background: var(--green);
  color: #fff;
  border: none;
  border-radius: var(--radius-sm);
  padding: 12px 16px;
  font-size: 15px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  margin-top: 12px;
  transition: background 0.15s;
}

.cta-btn:hover { background: var(--green-dark); }

/* Empty state */
.empty-state {
  text-align: center;
  padding: 32px 16px;
  color: var(--text-2);
  font-size: 14px;
  line-height: 1.8;
}

/* Filter row */
.filter-row {
  display: flex;
  gap: 8px;
  margin-bottom: 14px;
}

.filter-btn {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 99px;
  padding: 6px 14px;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-2);
  cursor: pointer;
  font-family: inherit;
  transition: all 0.15s;
}

.filter-btn.active {
  background: var(--green);
  border-color: var(--green);
  color: #fff;
}

/* Restaurant cards */
.rest-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 14px;
  margin-bottom: 12px;
}

.rest-header { margin-bottom: 8px; }

.rest-name-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.rest-name {
  font-size: 15px;
  font-weight: 600;
  color: var(--text);
}

.rest-meta-row {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: var(--text-2);
}

/* Badges */
.badge {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 99px;
}

.badge-green { background: var(--green-light); color: var(--green-text); }
.badge-teal { background: var(--teal-light); color: var(--teal-text); }
.badge-amber { background: var(--amber-light); color: var(--amber-text); }

/* Meal rows */
.meal-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px 0;
  border-top: 1px solid var(--border);
  gap: 8px;
}

.meal-row.unaffordable { opacity: 0.5; }

.meal-info {
  display: flex;
  align-items: center;
  gap: 6px;
  flex: 1;
  min-width: 0;
}

.meal-name {
  font-size: 13px;
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.over-budget {
  font-size: 10px;
  background: var(--red-light);
  color: var(--red-text);
  padding: 1px 6px;
  border-radius: 4px;
  white-space: nowrap;
}

.meal-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.meal-protein { font-size: 12px; font-weight: 600; color: var(--green); }
.meal-price { font-size: 12px; color: var(--text-2); }
.meal-eff { font-size: 12px; font-weight: 500; color: var(--amber); }

.log-btn {
  display: flex;
  align-items: center;
  gap: 3px;
  background: none;
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 3px 8px;
  font-size: 12px;
  font-family: inherit;
  color: var(--text-2);
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
}

.log-btn:hover:not(:disabled) {
  border-color: var(--green);
  color: var(--green);
}

.log-btn.logged {
  border-color: var(--green);
  color: var(--green);
  background: var(--green-light);
}

.log-btn:disabled { cursor: not-allowed; }

/* Log summary */
.log-summary-row {
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.log-summary-card {
  flex: 1;
  min-width: 90px;
  background: var(--gray);
  border-radius: var(--radius-sm);
  padding: 12px;
}

/* Profile */
.profile-card { margin-bottom: 12px; }

.profile-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border);
}

.avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--green-light);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 600;
  color: var(--green-text);
  flex-shrink: 0;
}

.profile-name {
  font-size: 16px;
  font-weight: 600;
  color: var(--text);
}

.profile-sub { font-size: 12px; color: var(--text-2); }

.edit-link {
  margin-left: auto;
  background: none;
  border: none;
  font-size: 13px;
  color: var(--green);
  cursor: pointer;
  font-family: inherit;
  font-weight: 500;
}

.profile-field {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 9px 0;
  border-bottom: 1px solid var(--border);
  font-size: 14px;
}

.profile-field:last-child { border-bottom: none; }
.field-label { color: var(--text-2); }
.field-value { font-weight: 500; color: var(--text); }

/* Profile form */
.profile-form { padding: 20px; }

.form-label {
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-2);
  margin-bottom: 6px;
  margin-top: 16px;
}

.form-label:first-child { margin-top: 0; }

.form-input {
  display: block;
  width: 100%;
  background: var(--gray);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 10px 12px;
  font-size: 15px;
  color: var(--text);
  font-family: inherit;
  outline: none;
  transition: border-color 0.15s;
}

.form-input:focus { border-color: var(--green); }

.form-hint {
  font-size: 12px;
  color: var(--text-3);
  margin-top: 4px;
}
