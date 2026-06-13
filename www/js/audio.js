// Tiny synthesised sound engine (WebAudio) - no asset files required.
export class Audio {
  constructor() {
    this.ctx = null;
    this.sfx = true;
    this.music = true;
    this.musicNodes = null;
    this._musicTimer = null;
  }
  _ensure() {
    if (!this.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AC();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.5;
      this.master.connect(this.ctx.destination);
    }
    if (this.ctx.state === "suspended") this.ctx.resume();
    return this.ctx;
  }
  resume() { if (this.ctx && this.ctx.state === "suspended") this.ctx.resume(); }

  blip(freq = 440, dur = 0.12, type = "sine", vol = 0.3, slide = 0) {
    if (!this.sfx) return;
    const ctx = this._ensure();
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type; o.frequency.setValueAtTime(freq, ctx.currentTime);
    if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(40, freq + slide), ctx.currentTime + dur);
    g.gain.setValueAtTime(0.0001, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(vol, ctx.currentTime + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
    o.connect(g); g.connect(this.master);
    o.start(); o.stop(ctx.currentTime + dur + 0.02);
  }
  eat()   { this.blip(620, 0.1, "triangle", 0.28, 300); }
  bonus() { this.blip(880, 0.09, "square", 0.2, 200); setTimeout(() => this.blip(1240, 0.12, "square", 0.2), 70); }
  power() { this.blip(520, 0.12, "sawtooth", 0.22, 500); setTimeout(() => this.blip(900, 0.14, "sawtooth", 0.2, 400), 90); }
  turn()  { this.blip(300, 0.04, "sine", 0.08); }
  crash() { this.blip(180, 0.35, "sawtooth", 0.35, -120); }
  levelUp(){ [523,659,784,1046].forEach((f,i)=>setTimeout(()=>this.blip(f,0.16,"triangle",0.25),i*100)); }
  gameOver(){ [400,320,250,160].forEach((f,i)=>setTimeout(()=>this.blip(f,0.3,"sawtooth",0.3),i*150)); }

  startMusic() {
    if (!this.music) return;
    this._ensure();
    this.stopMusic();
    const ctx = this.ctx;
    const bass = ctx.createGain(); bass.gain.value = 0.12; bass.connect(this.master);
    const scale = [130.81, 155.56, 196.0, 233.08, 261.63];
    let step = 0;
    const beat = () => {
      if (!this.music) return;
      const t = ctx.currentTime;
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = "sine";
      o.frequency.value = scale[step % scale.length] / 2;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.5, t + 0.03);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.42);
      o.connect(g); g.connect(bass); o.start(t); o.stop(t + 0.45);
      // sparkle every other beat
      if (step % 2 === 0) {
        const o2 = ctx.createOscillator(), g2 = ctx.createGain();
        o2.type = "triangle"; o2.frequency.value = scale[(step + 2) % scale.length] * 2;
        g2.gain.setValueAtTime(0.0001, t); g2.gain.exponentialRampToValueAtTime(0.06, t + 0.02);
        g2.gain.exponentialRampToValueAtTime(0.0001, t + 0.2);
        o2.connect(g2); g2.connect(this.master); o2.start(t); o2.stop(t + 0.22);
      }
      step++;
    };
    this.musicNodes = { bass };
    this._musicTimer = setInterval(beat, 360);
    beat();
  }
  stopMusic() {
    if (this._musicTimer) { clearInterval(this._musicTimer); this._musicTimer = null; }
    if (this.musicNodes) { try { this.musicNodes.bass.disconnect(); } catch (e) {} this.musicNodes = null; }
  }
}
