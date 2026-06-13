// Level definitions for Neon Snake 3D.
// Walls are generated procedurally so layouts stay compact and varied.

const key = (x, z) => x + "," + z;

function border(cols, rows) {
  const cells = [];
  for (let x = 0; x < cols; x++) { cells.push({ x, z: 0 }); cells.push({ x, z: rows - 1 }); }
  for (let z = 1; z < rows - 1; z++) { cells.push({ x: 0, z }); cells.push({ x: cols - 1, z }); }
  return cells;
}

// Grid of single-cell pillars spaced `step` apart, inset from edges.
function pillars(cols, rows, step, inset = 2) {
  const cells = [];
  for (let x = inset; x < cols - inset; x += step)
    for (let z = inset; z < rows - inset; z += step) cells.push({ x, z });
  return cells;
}

// Plus-shaped barrier through the centre with a gap so it's passable.
function cross(cols, rows, gap = 2) {
  const cells = [];
  const cx = (cols / 2) | 0, cz = (rows / 2) | 0;
  for (let x = 4; x < cols - 4; x++) if (Math.abs(x - cx) > gap) cells.push({ x, z: cz });
  for (let z = 4; z < rows - 4; z++) if (Math.abs(z - cz) > gap) cells.push({ x: cx, z });
  return cells;
}

// Short vertical bars forming a slalom.
function slalom(cols, rows) {
  const cells = [];
  const xs = [Math.floor(cols * 0.3), Math.floor(cols * 0.55), Math.floor(cols * 0.8)];
  xs.forEach((x, i) => {
    const top = i % 2 === 0;
    const len = Math.floor(rows * 0.55);
    for (let k = 0; k < len; k++) {
      const z = top ? 2 + k : rows - 3 - k;
      cells.push({ x, z });
    }
  });
  return cells;
}

// Diamond / rhombus ring around the centre with gaps at the points.
function diamond(cols, rows, r) {
  const cells = [];
  const cx = (cols / 2) | 0, cz = (rows / 2) | 0;
  for (let x = 0; x < cols; x++)
    for (let z = 0; z < rows; z++) {
      const d = Math.abs(x - cx) + Math.abs(z - cz);
      if (d === r && !(Math.abs(x - cx) <= 1 || Math.abs(z - cz) <= 1)) cells.push({ x, z });
    }
  return cells;
}

function dedupe(cells) {
  const seen = new Set(), out = [];
  for (const c of cells) { const k = key(c.x, c.z); if (!seen.has(k)) { seen.add(k); out.push(c); } }
  return out;
}

// A horizontal back-and-forth mover path.
function hPath(z, x0, x1) {
  const p = [];
  for (let x = x0; x <= x1; x++) p.push({ x, z });
  for (let x = x1 - 1; x > x0; x--) p.push({ x, z });
  return p;
}
function vPath(x, z0, z1) {
  const p = [];
  for (let z = z0; z <= z1; z++) p.push({ x, z });
  for (let z = z1 - 1; z > z0; z--) p.push({ x, z });
  return p;
}

const THEMES = [
  { floor: 0x0c1233, grid: 0x2a3a8a, snake: 0x3dff9e, head: 0x9dffd0, accent: 0x28d0ff },
  { floor: 0x131033, grid: 0x4a2a8a, snake: 0x28d0ff, head: 0xc0f0ff, accent: 0x7b5cff },
  { floor: 0x130c22, grid: 0x8a2a6a, snake: 0xff7bd0, head: 0xffd0f0, accent: 0xff3d7f },
  { floor: 0x0c1a14, grid: 0x1f8a5a, snake: 0xffd23d, head: 0xfff0b0, accent: 0x3dff9e },
];

export function buildLevels() {
  const L = [];
  const add = (cfg) => L.push(cfg);

  add({ name: "First Slither", cols: 17, rows: 17, wrap: true, speed: 230, target: 5, lives: 3,
    walls: [], movers: [], theme: 0 });

  add({ name: "Walled Garden", cols: 19, rows: 19, wrap: false, speed: 215, target: 6, lives: 3,
    walls: border(19, 19), movers: [], theme: 0 });

  add({ name: "Four Towers", cols: 19, rows: 19, wrap: false, speed: 205, target: 8, lives: 3,
    walls: dedupe([...border(19, 19), { x: 5, z: 5 }, { x: 13, z: 5 }, { x: 5, z: 13 }, { x: 13, z: 13 },
      { x: 6, z: 5 }, { x: 5, z: 6 }, { x: 12, z: 5 }, { x: 13, z: 6 }, { x: 6, z: 13 }, { x: 5, z: 12 }, { x: 12, z: 13 }, { x: 13, z: 12 }]),
    movers: [], theme: 1 });

  add({ name: "Crossroads", cols: 21, rows: 21, wrap: true, speed: 195, target: 9, lives: 3,
    walls: cross(21, 21, 2), movers: [], theme: 1 });

  add({ name: "Pillar Field", cols: 21, rows: 21, wrap: false, speed: 190, target: 10, lives: 3,
    walls: dedupe([...border(21, 21), ...pillars(21, 21, 4, 4)]), movers: [], theme: 1 });

  add({ name: "Patrol", cols: 21, rows: 21, wrap: false, speed: 185, target: 11, lives: 3,
    walls: border(21, 21),
    movers: [{ path: hPath(10, 3, 17), speed: 1 }], theme: 2 });

  add({ name: "The Slalom", cols: 23, rows: 21, wrap: true, speed: 178, target: 12, lives: 3,
    walls: slalom(23, 21), movers: [], theme: 2 });

  add({ name: "Double Trouble", cols: 23, rows: 21, wrap: false, speed: 172, target: 13, lives: 3,
    walls: border(23, 21),
    movers: [{ path: hPath(7, 3, 19), speed: 1 }, { path: hPath(13, 19, 3).reverse(), speed: 1 }], theme: 2 });

  add({ name: "Diamond Heist", cols: 23, rows: 23, wrap: false, speed: 168, target: 14, lives: 3,
    walls: dedupe([...border(23, 23), ...diamond(23, 23, 7)]),
    movers: [{ path: vPath(11, 3, 19), speed: 1 }], theme: 3 });

  add({ name: "Gauntlet", cols: 25, rows: 23, wrap: false, speed: 160, target: 15, lives: 3,
    walls: dedupe([...border(25, 23), ...pillars(25, 23, 5, 4)]),
    movers: [{ path: hPath(6, 3, 21), speed: 1 }, { path: hPath(16, 21, 3).reverse(), speed: 1 }], theme: 3 });

  add({ name: "Hyper Maze", cols: 25, rows: 25, wrap: true, speed: 150, target: 16, lives: 3,
    walls: dedupe([...cross(25, 25, 2), ...pillars(25, 25, 6, 5)]),
    movers: [{ path: vPath(6, 3, 21), speed: 1 }, { path: vPath(18, 21, 3).reverse(), speed: 1 }], theme: 0 });

  add({ name: "FINAL: Overdrive", cols: 27, rows: 25, wrap: false, speed: 138, target: 20, lives: 3,
    walls: dedupe([...border(27, 25), ...cross(27, 25, 3), ...pillars(27, 25, 6, 4)]),
    movers: [
      { path: hPath(5, 3, 23), speed: 1 },
      { path: hPath(19, 23, 3).reverse(), speed: 1 },
      { path: vPath(13, 4, 20), speed: 1 },
    ], theme: 2 });

  return L.map((l, i) => ({ id: i, themeColors: THEMES[l.theme], ...l }));
}
