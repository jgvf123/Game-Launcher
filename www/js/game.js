import * as THREE from "three";
import { buildLevels } from "./levels.js";
import { Audio } from "./audio.js";

/* =========================================================================
   Neon Snake 3D  —  a polished, level-based 3D snake game.
   Grid-based logic with interpolated rendering for buttery-smooth motion.
   ========================================================================= */

const POWER = {
  SPEED:  { name: "SPEED",  color: 0x28d0ff, dur: 6000, icon: "⚡" },
  SLOW:   { name: "SLOW-MO",color: 0xb07bff, dur: 6000, icon: "🐌" },
  SHIELD: { name: "SHIELD", color: 0xffd23d, dur: 0,    icon: "🛡" },
  GHOST:  { name: "GHOST",  color: 0xbfffff, dur: 5000, icon: "👻" },
};

class Game {
  constructor() {
    this.levels = buildLevels();
    this.audio = new Audio();
    this.state = "menu"; // menu | play | pause | over | win
    this.opts = this.loadOpts();
    this.save = this.loadSave();
    this.tmp = new THREE.Vector3();
    this.particles = [];
    this.initThree();
    this.bindUI();
    this.bindInput();
    this.populateLevels();
    this.syncBest();
    window.addEventListener("resize", () => this.onResize());
    document.getElementById("loading").classList.add("hidden");
    this.clock = new THREE.Clock();
    this.renderer.setAnimationLoop(() => this.loop());
  }

  /* ---------------- persistence ---------------- */
  loadOpts() {
    const d = { sound: true, music: true, shake: true, quality: true };
    try { return { ...d, ...JSON.parse(localStorage.getItem("ns3d_opts") || "{}") }; } catch { return d; }
  }
  saveOpts() { localStorage.setItem("ns3d_opts", JSON.stringify(this.opts)); }
  loadSave() {
    const d = { best: 0, unlocked: 1, stars: {} };
    try { return { ...d, ...JSON.parse(localStorage.getItem("ns3d_save") || "{}") }; } catch { return d; }
  }
  saveGame() { localStorage.setItem("ns3d_save", JSON.stringify(this.save)); }

  /* ---------------- three.js setup ---------------- */
  initThree() {
    const canvas = document.getElementById("scene");
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: this.opts.quality, powerPreference: "high-performance" });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, this.opts.quality ? 2 : 1.3));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = this.opts.quality;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x05050f);
    this.scene.fog = new THREE.Fog(0x05050f, 26, 60);

    this.camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 200);
    this.camPos = new THREE.Vector3(0, 22, 16);
    this.camLook = new THREE.Vector3(0, 0, 0);
    this.camera.position.copy(this.camPos);

    // lights
    const amb = new THREE.AmbientLight(0x6070ff, 0.55); this.scene.add(amb);
    const key = new THREE.DirectionalLight(0xffffff, 1.1);
    key.position.set(8, 26, 10); key.castShadow = this.opts.quality;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.near = 1; key.shadow.camera.far = 80;
    key.shadow.camera.left = -25; key.shadow.camera.right = 25;
    key.shadow.camera.top = 25; key.shadow.camera.bottom = -25;
    this.scene.add(key);
    this.headLight = new THREE.PointLight(0x3dff9e, 1.0, 14, 2); this.scene.add(this.headLight);

    // groups
    this.worldGroup = new THREE.Group(); this.scene.add(this.worldGroup);
    this.floorGroup = new THREE.Group(); this.worldGroup.add(this.floorGroup);
    this.wallGroup = new THREE.Group(); this.worldGroup.add(this.wallGroup);
    this.moverGroup = new THREE.Group(); this.worldGroup.add(this.moverGroup);
    this.snakeGroup = new THREE.Group(); this.worldGroup.add(this.snakeGroup);
    this.fxGroup = new THREE.Group(); this.worldGroup.add(this.fxGroup);

    // reusable geometries
    this.geo = {
      seg: new THREE.BoxGeometry(0.86, 0.86, 0.86),
      wall: new THREE.BoxGeometry(0.96, 1.1, 0.96),
      food: new THREE.IcosahedronGeometry(0.42, 0),
      gem: new THREE.OctahedronGeometry(0.46, 0),
      particle: new THREE.BoxGeometry(0.16, 0.16, 0.16),
    };
    this.segPool = [];
    this.foodMesh = null;
    this.powerMesh = null;
  }

  /* ---------------- UI ---------------- */
  $(id) { return document.getElementById(id); }
  show(id) { this.$(id).classList.remove("hidden"); }
  hide(id) { this.$(id).classList.add("hidden"); }

  bindUI() {
    const o = this.opts;
    this.$("opt-sound").checked = o.sound; this.$("opt-music").checked = o.music;
    this.$("opt-shake").checked = o.shake; this.$("opt-quality").checked = o.quality;
    this.audio.sfx = o.sound; this.audio.music = o.music;

    this.$("btn-play").onclick = () => this.startLevel(Math.min(this.save.unlocked, this.levels.length) - 1);
    this.$("btn-levels").onclick = () => { this.goScreen("levels"); this.populateLevels(); };
    this.$("btn-how").onclick = () => this.goScreen("how");
    this.$("btn-settings").onclick = () => this.goScreen("settings");
    document.querySelectorAll("[data-back]").forEach(b => b.onclick = () => this.goScreen("menu"));

    this.$("btn-pause").onclick = () => this.togglePause();
    this.$("btn-resume").onclick = () => this.togglePause();
    this.$("btn-restart").onclick = () => { this.hide("pause"); this.startLevel(this.level.id); };
    this.$("btn-quit").onclick = () => this.toMenu();
    this.$("btn-next").onclick = () => { this.hide("win"); this.startLevel(Math.min(this.level.id + 1, this.levels.length - 1)); };
    this.$("btn-win-menu").onclick = () => this.toMenu();
    this.$("btn-retry").onclick = () => { this.hide("over"); this.startLevel(this.level.id); };
    this.$("btn-over-menu").onclick = () => this.toMenu();
    this.$("btn-victory-menu").onclick = () => this.toMenu();

    const opt = (id, k) => this.$(id).onchange = (e) => {
      this.opts[k] = e.target.checked; this.saveOpts();
      this.audio.sfx = this.opts.sound; this.audio.music = this.opts.music;
      if (k === "music") { if (this.opts.music && this.state === "play") this.audio.startMusic(); else this.audio.stopMusic(); }
    };
    opt("opt-sound", "sound"); opt("opt-music", "music"); opt("opt-shake", "shake"); opt("opt-quality", "quality");
    this.$("btn-reset").onclick = () => {
      if (confirm("Reset all progress and high score?")) {
        this.save = { best: 0, unlocked: 1, stars: {} }; this.saveGame();
        this.populateLevels(); this.syncBest();
      }
    };
  }

  goScreen(id) {
    ["menu", "levels", "how", "settings"].forEach(s => this.hide(s));
    this.show(id);
  }

  populateLevels() {
    const grid = this.$("level-grid"); grid.innerHTML = "";
    this.levels.forEach((lv, i) => {
      const cell = document.createElement("div");
      const unlocked = i < this.save.unlocked;
      cell.className = "level-cell" + (unlocked ? "" : " locked") + (this.save.stars[i] ? " cleared" : "");
      if (unlocked) {
        const st = this.save.stars[i] || 0;
        cell.innerHTML = `${i + 1}<span class="stars">${"★".repeat(st)}${"☆".repeat(3 - st)}</span>`;
        cell.onclick = () => this.startLevel(i);
      } else {
        cell.innerHTML = `<span class="lock">🔒</span>`;
      }
      grid.appendChild(cell);
    });
  }
  syncBest() {
    this.$("menu-best").textContent = this.save.best;
    this.$("hud-best").textContent = this.save.best;
  }

  /* ---------------- input ---------------- */
  bindInput() {
    const dirMap = { up: { x: 0, z: -1 }, down: { x: 0, z: 1 }, left: { x: -1, z: 0 }, right: { x: 1, z: 0 } };
    this.queueDir = (name) => {
      if (this.state !== "play") return;
      const d = dirMap[name]; if (!d) return;
      const last = this.nextDir || this.dir;
      if (d.x === -last.x && d.z === -last.z) return; // no 180° reversal
      if (d.x === last.x && d.z === last.z) return;
      this.nextDir = d; this.audio.turn();
    };
    window.addEventListener("keydown", (e) => {
      const k = e.key.toLowerCase();
      if (k === "arrowup" || k === "w") this.queueDir("up");
      else if (k === "arrowdown" || k === "s") this.queueDir("down");
      else if (k === "arrowleft" || k === "a") this.queueDir("left");
      else if (k === "arrowright" || k === "d") this.queueDir("right");
      else if (k === "p" || k === "escape") { if (this.state === "play" || this.state === "pause") this.togglePause(); }
      if (["arrowup", "arrowdown", "arrowleft", "arrowright"].includes(k)) e.preventDefault();
    });
    document.querySelectorAll(".dbtn").forEach(b => {
      const fire = (e) => { e.preventDefault(); this.queueDir(b.dataset.dir); };
      b.addEventListener("touchstart", fire, { passive: false });
      b.addEventListener("mousedown", fire);
    });
    // swipe
    const canvas = this.$("scene");
    let sx = 0, sy = 0, swiping = false;
    const start = (x, y) => { sx = x; sy = y; swiping = true; };
    const end = (x, y) => {
      if (!swiping) return; swiping = false;
      const dx = x - sx, dy = y - sy;
      if (Math.abs(dx) < 18 && Math.abs(dy) < 18) return;
      if (Math.abs(dx) > Math.abs(dy)) this.queueDir(dx > 0 ? "right" : "left");
      else this.queueDir(dy > 0 ? "down" : "up");
    };
    canvas.addEventListener("touchstart", (e) => { const t = e.touches[0]; start(t.clientX, t.clientY); }, { passive: true });
    canvas.addEventListener("touchend", (e) => { const t = e.changedTouches[0]; end(t.clientX, t.clientY); }, { passive: true });
    canvas.addEventListener("mousedown", (e) => start(e.clientX, e.clientY));
    canvas.addEventListener("mouseup", (e) => end(e.clientX, e.clientY));
  }

  /* ---------------- world build ---------------- */
  worldX(x) { return x - (this.level.cols - 1) / 2; }
  worldZ(z) { return z - (this.level.rows - 1) / 2; }
  cellKey(c) { return c.x + "," + c.z; }

  buildWorld() {
    [this.floorGroup, this.wallGroup, this.moverGroup, this.snakeGroup, this.fxGroup].forEach(g => g.clear());
    this.segPool = [];
    this.particles = [];
    const lv = this.level, t = lv.themeColors;
    this.scene.background = new THREE.Color(0x05050f);

    // floor
    const fw = lv.cols, fh = lv.rows;
    const floorMat = new THREE.MeshStandardMaterial({ color: t.floor, roughness: 0.85, metalness: 0.1 });
    const floor = new THREE.Mesh(new THREE.BoxGeometry(fw, 0.5, fh), floorMat);
    floor.position.set(0, -0.26, 0); floor.receiveShadow = this.opts.quality;
    this.floorGroup.add(floor);
    // neon grid lines
    const grid = new THREE.GridHelper(Math.max(fw, fh), Math.max(fw, fh), t.grid, t.grid);
    grid.position.y = 0.005; grid.material.opacity = 0.5; grid.material.transparent = true;
    // clip grid to floor by scaling
    grid.scale.set(fw / Math.max(fw, fh), 1, fh / Math.max(fw, fh));
    this.floorGroup.add(grid);
    // glowing border rim
    const rim = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.1, 4, 4),
      new THREE.MeshBasicMaterial({ color: t.accent }));
    rim.visible = false; this.floorGroup.add(rim);

    // walls
    this.wallSet = new Set();
    const wallMat = new THREE.MeshStandardMaterial({ color: t.accent, emissive: t.accent, emissiveIntensity: 0.35, roughness: 0.4, metalness: 0.3 });
    for (const w of lv.walls) {
      this.wallSet.add(this.cellKey(w));
      const m = new THREE.Mesh(this.geo.wall, wallMat);
      m.position.set(this.worldX(w.x), 0.3, this.worldZ(w.z));
      m.castShadow = m.receiveShadow = this.opts.quality;
      this.wallGroup.add(m);
    }

    // movers
    this.movers = (lv.movers || []).map(mv => {
      const mat = new THREE.MeshStandardMaterial({ color: 0xff3d7f, emissive: 0xff3d7f, emissiveIntensity: 0.6, roughness: 0.3, metalness: 0.4 });
      const mesh = new THREE.Mesh(this.geo.wall, mat);
      mesh.castShadow = this.opts.quality;
      this.moverGroup.add(mesh);
      return { path: mv.path, idx: 0, prevIdx: 0, mesh };
    });

    // snake material
    this.snakeMat = new THREE.MeshStandardMaterial({ color: t.snake, emissive: t.snake, emissiveIntensity: 0.45, roughness: 0.25, metalness: 0.2 });
    this.headMat = new THREE.MeshStandardMaterial({ color: t.head, emissive: t.head, emissiveIntensity: 0.7, roughness: 0.2, metalness: 0.2 });
    this.headLight.color.setHex(t.snake);

    // food & power meshes
    this.foodMat = new THREE.MeshStandardMaterial({ color: 0xff3d7f, emissive: 0xff3d7f, emissiveIntensity: 0.8, roughness: 0.2 });
    this.foodMesh = new THREE.Mesh(this.geo.food, this.foodMat);
    this.foodMesh.castShadow = this.opts.quality; this.fxGroup.add(this.foodMesh);
    this.powerMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.9, roughness: 0.15 });
    this.powerMesh = new THREE.Mesh(this.geo.gem, this.powerMat);
    this.powerMesh.visible = false; this.fxGroup.add(this.powerMesh);
  }

  getSeg(i) {
    if (this.segPool[i]) return this.segPool[i];
    const m = new THREE.Mesh(this.geo.seg, i === 0 ? this.headMat : this.snakeMat);
    m.castShadow = this.opts.quality;
    if (i === 0) {
      // eyes
      const eyeMat = new THREE.MeshBasicMaterial({ color: 0x06121a });
      const eyeGeo = new THREE.SphereGeometry(0.1, 8, 8);
      const e1 = new THREE.Mesh(eyeGeo, eyeMat), e2 = new THREE.Mesh(eyeGeo, eyeMat);
      e1.position.set(-0.2, 0.2, 0.44); e2.position.set(0.2, 0.2, 0.44);
      m.add(e1, e2);
    }
    this.snakeGroup.add(m); this.segPool[i] = m; return m;
  }

  /* ---------------- level lifecycle ---------------- */
  startLevel(idx) {
    this.level = this.levels[idx];
    this.buildWorld();
    const lv = this.level;
    // snake init at centre, moving right
    const cx = (lv.cols / 2) | 0, cz = (lv.rows / 2) | 0;
    this.cells = [{ x: cx, z: cz }, { x: cx - 1, z: cz }, { x: cx - 2, z: cz }];
    this.prevCells = this.cells.map(c => ({ ...c }));
    this.dir = { x: 1, z: 0 }; this.nextDir = null;
    if (!this.continuing) this.score = 0; // carry score across levels, reset on fresh start
    this.continuing = false;
    this.orbs = 0; this.lives = lv.lives; this.lifeLost = false;
    this.effects = {}; this.baseSpeed = lv.speed; this.stepMs = lv.speed;
    this.acc = 0; this.shake = 0;
    this.placeFood(); this.powerTimer = 4000 + Math.random() * 3000; this.powerActive = false;

    // hide screens, show hud
    ["menu", "levels", "how", "settings", "pause", "win", "over", "victory"].forEach(s => this.hide(s));
    this.show("hud");
    if (!matchMedia("(min-width:880px)").matches) this.show("touch");
    this.updateHUD();
    this.state = "play";
    this.audio.resume();
    if (this.opts.music) this.audio.startMusic();
    this.snapCamera();
  }

  snapCamera() {
    const maxDim = Math.max(this.level.cols, this.level.rows);
    this.camHeight = maxDim * 0.92;
    this.camDepth = maxDim * 0.62;
    this.camPos.set(0, this.camHeight, this.camDepth);
    this.camLook.set(0, 0, 0);
    this.camera.position.copy(this.camPos);
    this.camera.lookAt(this.camLook);
  }

  toMenu() {
    this.state = "menu"; this.audio.stopMusic();
    ["hud", "touch", "pause", "win", "over", "victory"].forEach(s => this.hide(s));
    this.goScreen("menu"); this.syncBest();
  }

  togglePause() {
    if (this.state === "play") { this.state = "pause"; this.show("pause"); this.audio.stopMusic(); }
    else if (this.state === "pause") { this.state = "play"; this.hide("pause"); if (this.opts.music) this.audio.startMusic(); }
  }

  /* ---------------- food / powerups ---------------- */
  freeCell() {
    const lv = this.level;
    const occupied = new Set(this.cells.map(c => this.cellKey(c)));
    this.wallSet.forEach(k => occupied.add(k));
    this.movers.forEach(m => occupied.add(this.cellKey(m.path[m.idx])));
    if (this.food) occupied.add(this.cellKey(this.food));
    let tries = 0;
    while (tries++ < 500) {
      const x = 1 + ((Math.random() * (lv.cols - 2)) | 0);
      const z = 1 + ((Math.random() * (lv.rows - 2)) | 0);
      if (!occupied.has(x + "," + z)) return { x, z };
    }
    return { x: 1, z: 1 };
  }
  placeFood() { this.food = this.freeCell(); }
  placePower() {
    const keys = Object.keys(POWER);
    this.powerType = keys[(Math.random() * keys.length) | 0];
    this.power = this.freeCell();
    this.powerActive = true; this.powerLife = 7000; // disappears if not grabbed
    const c = POWER[this.powerType].color;
    this.powerMat.color.setHex(c); this.powerMat.emissive.setHex(c);
    this.powerMesh.visible = true;
  }

  /* ---------------- core step ---------------- */
  step() {
    const lv = this.level;
    if (this.nextDir) { this.dir = this.nextDir; this.nextDir = null; }
    const head = this.cells[0];
    let nx = head.x + this.dir.x, nz = head.z + this.dir.z;

    // edges
    if (lv.wrap) {
      nx = (nx + lv.cols) % lv.cols; nz = (nz + lv.rows) % lv.rows;
    }
    const newHead = { x: nx, z: nz };
    const ghost = !!this.effects.GHOST;

    let dead = false;
    if (!lv.wrap && (nx < 0 || nz < 0 || nx >= lv.cols || nz >= lv.rows)) dead = true;
    if (!ghost && this.wallSet.has(this.cellKey(newHead))) dead = true;
    // mover collision
    for (const m of this.movers) { if (this.cellKey(m.path[m.idx]) === this.cellKey(newHead)) { if (!ghost) dead = true; } }
    // self collision (tail will move unless we grow)
    const willEat = this.food && newHead.x === this.food.x && newHead.z === this.food.z;
    const body = willEat ? this.cells : this.cells.slice(0, -1);
    if (!ghost && body.some(c => c.x === newHead.x && c.z === newHead.z)) dead = true;

    if (dead) { this.handleHit(); return; }

    // advance snake
    const old = this.cells;
    if (willEat) {
      this.prevCells = [{ ...old[0] }, ...old.map(c => ({ ...c }))];
      this.cells = [newHead, ...old.map(c => ({ ...c }))];
      this.onEatFood(newHead);
    } else {
      this.prevCells = old.map(c => ({ ...c }));
      this.cells = [newHead, ...old.slice(0, -1).map(c => ({ ...c }))];
    }

    // power pickup
    if (this.powerActive && newHead.x === this.power.x && newHead.z === this.power.z) this.grabPower();

    // advance movers
    for (const m of this.movers) { m.prevIdx = m.idx; m.idx = (m.idx + 1) % m.path.length; }
  }

  onEatFood(head) {
    this.orbs++;
    const mult = this.effects.SPEED ? 2 : 1;
    this.score += (10 + this.level.id * 2) * mult;
    this.audio.eat();
    this.burst(this.worldX(head.x), this.worldZ(head.z), 0xff3d7f, 10);
    this.placeFood();
    this.updateHUD();
    if (this.orbs >= this.level.target) this.winLevel();
  }

  grabPower() {
    const type = this.powerType;
    this.powerActive = false; this.powerMesh.visible = false;
    this.audio.power();
    const head = this.cells[0];
    this.burst(this.worldX(head.x), this.worldZ(head.z), POWER[type].color, 14);
    if (type === "SPEED") { this.effects.SPEED = POWER.SPEED.dur; this.stepMs = this.baseSpeed * 0.6; }
    else if (type === "SLOW") { this.effects.SLOW = POWER.SLOW.dur; this.stepMs = this.baseSpeed * 1.6; }
    else if (type === "GHOST") { this.effects.GHOST = POWER.GHOST.dur; }
    else if (type === "SHIELD") { this.effects.SHIELD = Infinity; }
    this.toast(POWER[type].icon + " " + POWER[type].name, POWER[type].color);
    this.updateHUD();
  }

  handleHit() {
    if (this.effects.SHIELD) {
      delete this.effects.SHIELD;
      this.audio.power(); this.toast("🛡 SHIELD USED!", 0xffd23d);
      // bounce: reverse-safe — just don't move this step, drop the queued dir
      this.nextDir = null; this.shake = this.opts.shake ? 0.4 : 0;
      this.updateHUD(); return;
    }
    this.lives--; this.lifeLost = true;
    this.audio.crash();
    this.shake = this.opts.shake ? 1.0 : 0;
    const head = this.cells[0];
    this.burst(this.worldX(head.x), this.worldZ(head.z), 0xff3d3d, 20);
    if (this.lives <= 0) { this.gameOver(); return; }
    // respawn at centre
    const lv = this.level, cx = (lv.cols / 2) | 0, cz = (lv.rows / 2) | 0;
    this.cells = [{ x: cx, z: cz }, { x: cx - 1, z: cz }, { x: cx - 2, z: cz }];
    this.prevCells = this.cells.map(c => ({ ...c }));
    this.dir = { x: 1, z: 0 }; this.nextDir = null;
    this.toast("CRASH! " + this.lives + " ♥ left", 0xff3d7f);
    this.updateHUD();
  }

  winLevel() {
    this.state = "win"; this.audio.stopMusic(); this.audio.levelUp();
    const stars = this.lifeLost ? (this.lives >= this.level.lives - 1 ? 2 : 1) : 3;
    const id = this.level.id;
    this.save.stars[id] = Math.max(this.save.stars[id] || 0, stars);
    this.save.unlocked = Math.max(this.save.unlocked, Math.min(id + 2, this.levels.length));
    if (this.score > this.save.best) this.save.best = this.score;
    this.saveGame(); this.syncBest();
    this.$("win-score").textContent = this.score;
    this.$("win-stars").textContent = "★".repeat(stars) + "☆".repeat(3 - stars);
    this.hide("touch");
    if (id >= this.levels.length - 1) { // final victory
      this.$("victory-score").textContent = this.score;
      this.hide("hud"); this.show("victory");
    } else {
      this.continuing = true; // carry score to next level
      this.show("win");
    }
  }

  gameOver() {
    this.state = "over"; this.audio.stopMusic(); this.audio.gameOver();
    if (this.score > this.save.best) { this.save.best = this.score; this.saveGame(); }
    this.syncBest();
    this.$("over-score").textContent = this.score;
    this.$("over-best").textContent = this.save.best;
    this.hide("touch"); this.show("over");
  }

  /* ---------------- HUD ---------------- */
  updateHUD() {
    this.$("hud-score").textContent = this.score;
    this.$("hud-level").textContent = this.level.id + 1;
    this.$("hud-goal").textContent = `${this.level.name} · ${this.orbs}/${this.level.target}`;
    this.$("hud-lives").textContent = "♥".repeat(Math.max(0, this.lives));
    this.$("hud-bar").style.width = Math.min(100, (this.orbs / this.level.target) * 100) + "%";
    // powerups
    const box = this.$("powerups"); box.innerHTML = "";
    for (const k of Object.keys(this.effects)) {
      const el = document.createElement("div"); el.className = "pu";
      const remain = this.effects[k] === Infinity ? "" : `<span class="t">${(this.effects[k] / 1000).toFixed(1)}s</span>`;
      el.innerHTML = `${POWER[k].icon}<span>${POWER[k].name}</span>${remain}`;
      box.appendChild(el);
    }
  }
  toast(text, color) {
    const t = this.$("toast"); t.textContent = text;
    t.style.color = "#" + new THREE.Color(color).getHexString();
    t.classList.remove("show"); void t.offsetWidth; t.classList.add("show");
  }

  /* ---------------- particles ---------------- */
  burst(x, z, color, n) {
    const mat = new THREE.MeshBasicMaterial({ color });
    for (let i = 0; i < n; i++) {
      const p = new THREE.Mesh(this.geo.particle, mat);
      p.position.set(x, 0.5, z);
      const a = Math.random() * Math.PI * 2, sp = 2 + Math.random() * 4;
      p.userData.v = new THREE.Vector3(Math.cos(a) * sp, 2 + Math.random() * 3, Math.sin(a) * sp);
      p.userData.life = 0.6 + Math.random() * 0.3;
      this.fxGroup.add(p); this.particles.push(p);
    }
  }
  updateParticles(dt) {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.userData.life -= dt;
      if (p.userData.life <= 0) { this.fxGroup.remove(p); this.particles.splice(i, 1); continue; }
      p.userData.v.y -= 14 * dt;
      p.position.addScaledVector(p.userData.v, dt);
      const s = Math.max(0.01, p.userData.life * 1.4);
      p.scale.setScalar(s); p.rotation.x += dt * 8; p.rotation.y += dt * 6;
    }
  }

  /* ---------------- render helpers ---------------- */
  lerpCell(prev, cur, t, out) {
    let px = this.worldX(prev.x), pz = this.worldZ(prev.z);
    let cxx = this.worldX(cur.x), czz = this.worldZ(cur.z);
    // detect wrap jump -> snap to current to avoid streaking across the board
    if (Math.abs(px - cxx) > 1.6 || Math.abs(pz - czz) > 1.6) { px = cxx; pz = czz; }
    out.set(px + (cxx - px) * t, 0.5, pz + (czz - pz) * t);
  }

  renderSnake(t) {
    const n = this.cells.length;
    for (let i = 0; i < n; i++) {
      const m = this.getSeg(i);
      const prev = this.prevCells[Math.min(i, this.prevCells.length - 1)] || this.cells[i];
      this.lerpCell(prev, this.cells[i], t, this.tmp);
      m.position.copy(this.tmp);
      m.visible = true;
      // taper tail
      const s = 1 - (i / n) * 0.35;
      m.scale.setScalar(s);
      if (i === 0) {
        this.headLight.position.set(this.tmp.x, 2.2, this.tmp.z);
        // orient head toward movement
        const ang = Math.atan2(this.dir.x, this.dir.z);
        m.rotation.y = ang;
      }
      // ghost transparency
      const ghost = !!this.effects.GHOST;
      if (!!m.material.transparent !== ghost) { m.material = ghost ? this._ghostMat(i) : (i === 0 ? this.headMat : this.snakeMat); }
    }
    for (let i = n; i < this.segPool.length; i++) this.segPool[i].visible = false;
  }
  _ghostMat(i) {
    if (!this._gm) this._gm = new THREE.MeshStandardMaterial({ color: 0xbfffff, emissive: 0xbfffff, emissiveIntensity: 0.5, transparent: true, opacity: 0.45 });
    return this._gm;
  }

  renderMovers(t) {
    for (const m of this.movers) {
      this.lerpCell(m.path[m.prevIdx], m.path[m.idx], t, this.tmp);
      m.mesh.position.copy(this.tmp);
      m.mesh.position.y = 0.3;
      m.mesh.rotation.y += 0.04;
    }
  }

  renderFood(time) {
    if (this.food) {
      this.foodMesh.visible = true;
      this.foodMesh.position.set(this.worldX(this.food.x), 0.55 + Math.sin(time * 3) * 0.12, this.worldZ(this.food.z));
      this.foodMesh.rotation.y = time * 1.5; this.foodMesh.rotation.x = time;
      const s = 1 + Math.sin(time * 6) * 0.08; this.foodMesh.scale.setScalar(s);
    }
    if (this.powerActive) {
      this.powerMesh.visible = true;
      this.powerMesh.position.set(this.worldX(this.power.x), 0.6 + Math.sin(time * 4) * 0.15, this.worldZ(this.power.z));
      this.powerMesh.rotation.y = time * 2.5;
      const s = 1 + Math.sin(time * 8) * 0.12; this.powerMesh.scale.setScalar(s);
    } else this.powerMesh.visible = false;
  }

  updateCamera(dt) {
    // gently bias the look point toward the head for a dynamic feel
    let hx = 0, hz = 0;
    if (this.cells) { hx = this.worldX(this.cells[0].x) * 0.22; hz = this.worldZ(this.cells[0].z) * 0.22; }
    const targetLook = this.tmp.set(hx, 0, hz);
    this.camLook.lerp(targetLook, 1 - Math.pow(0.001, dt));
    const desired = this.tmp.set(hx * 0.4, this.camHeight || 22, (this.camDepth || 16) + hz * 0.4);
    this.camPos.lerp(desired, 1 - Math.pow(0.001, dt));
    // screen shake
    let ox = 0, oz = 0, oy = 0;
    if (this.shake > 0) {
      const s = this.shake;
      ox = (Math.random() - 0.5) * s; oy = (Math.random() - 0.5) * s; oz = (Math.random() - 0.5) * s;
      this.shake = Math.max(0, this.shake - dt * 3);
    }
    this.camera.position.set(this.camPos.x + ox, this.camPos.y + oy, this.camPos.z + oz);
    this.camera.lookAt(this.camLook);
  }

  /* ---------------- main loop ---------------- */
  loop() {
    const dt = Math.min(0.05, this.clock.getDelta());
    const time = this.clock.elapsedTime;

    if (this.state === "play") {
      // decay effects
      for (const k of Object.keys(this.effects)) {
        if (this.effects[k] !== Infinity) {
          this.effects[k] -= dt * 1000;
          if (this.effects[k] <= 0) {
            delete this.effects[k];
            if (k === "SPEED" || k === "SLOW") this.stepMs = this.baseSpeed;
            this.updateHUD();
          }
        }
      }
      if (this._hudT === undefined) this._hudT = 0;
      this._hudT += dt; if (this._hudT > 0.1) { this._hudT = 0; if (Object.keys(this.effects).length) this.updateHUD(); }

      // power spawn timer
      if (!this.powerActive) {
        this.powerTimer -= dt * 1000;
        if (this.powerTimer <= 0) { this.placePower(); this.powerTimer = 9000 + Math.random() * 6000; }
      } else {
        this.powerLife -= dt * 1000;
        if (this.powerLife <= 0) { this.powerActive = false; this.powerMesh.visible = false; }
      }

      // fixed-step logic
      this.acc += dt * 1000;
      while (this.acc >= this.stepMs) { this.acc -= this.stepMs; this.step(); if (this.state !== "play") break; }
      const t = this.state === "play" ? Math.min(1, this.acc / this.stepMs) : 1;
      this.renderSnake(t); this.renderMovers(t); this.renderFood(time);
    } else if (this.cells) {
      // keep showing the scene gently animating behind overlays
      this.renderSnake(1); this.renderMovers(1); this.renderFood(time);
    }

    this.updateParticles(dt);
    this.updateCamera(dt);
    this.renderer.render(this.scene, this.camera);
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}

window.addEventListener("DOMContentLoaded", () => { window.__game = new Game(); });

// Register service worker for offline play (ignored inside the native APK).
if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(() => {}));
}
