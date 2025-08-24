import { useEffect, useRef } from 'react';

const NUM_CLOUDS = 10;
const CLOUD_SPEED_MIN = 0.15;
const CLOUD_SPEED_MAX = 0.6;
const CLOUD_ALPHA_MIN = 0.25;
const CLOUD_ALPHA_MAX = 0.65;
const CLOUD_SIZE_MIN = 120;
const CLOUD_SIZE_MAX = 320;
const CLOUD_START_DELAY_MAX_MS = 6000;
const CLOUD_Y_PADDING = 40;

const NUM_POINTS = 4;          
const POINT_RADIUS_MIN = 10;
const POINT_RADIUS_MAX = 16;
const POINT_DRIFT = 0.5;       
const POINT_VALUE = 10;

const PLAYER_SPEED = 6;
const JUMP_VELOCITY = -20;
const GRAVITY = 0.5;


export default function GameCanvas({ sectionRef, onScore }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  //kept callback current without retriggering the effect
  const scoreCbRef = useRef(onScore);
  useEffect(() => { scoreCbRef.current = onScore; }, [onScore]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const sectionEl = sectionRef?.current;
    if (!canvas || !sectionEl) return;

    const ctx = canvas.getContext('2d', { alpha: true });

    // size canvas to the Home section
    const sizeToSection = () => {
      const rect = sectionEl.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    sizeToSection();

    const onResize = () => sizeToSection();
    window.addEventListener('resize', onResize);
    const ro = new ResizeObserver(sizeToSection);
    ro.observe(sectionEl);

    const playerImg = new Image();
    playerImg.src = '/Laura_Negrin-Portfolio/images/tut.png';
    const cloudImg = new Image();
    cloudImg.src = '/Laura_Negrin-Portfolio/images/cloud.png';
    const grassImg = new Image();
    grassImg.src = '/Laura_Negrin-Portfolio/images/grass.png'
    const rainierImg = new Image();
    rainierImg.src = '/Laura_Negrin-Portfolio/images/rainier.png'
    let loaded = 0, assetsReady = false;
    const done = () => { loaded += 1; assetsReady = loaded >= 4; };
    playerImg.onload = done; 
    cloudImg.onload = done; 
    grassImg.onload = done;
    rainierImg.onload = done;
    
    const drawGrass = () => {
      const grassHeight = 100; 
      const grassWidth = 50;
      const rect = sectionRef.current.getBoundingClientRect();
      const visibleHeight = rect.height;
    
      for (let x = -10; x < canvas.width; x += grassWidth) {
        ctx.drawImage(grassImg, x, visibleHeight - grassHeight, 100, grassHeight+30);
      }
    };

    const drawRainier = () => {
      const rect = sectionRef.current.getBoundingClientRect();
      const visibleHeight = rect.height;
      const visibleWidth = rect.width;
      const mtnHeight = visibleHeight; 
      const mtnWidth = visibleWidth/2;

      ctx.save();
      ctx.globalAlpha = 0.5;
      ctx.drawImage(rainierImg, visibleWidth / 4, visibleHeight - mtnHeight * 0.85, mtnWidth, mtnHeight * 0.85);
      ctx.restore();
    };

    // Game player + points + clouds
    let totalScore = 0;

    const player = { x: 50, y: 50, w: 150, h: 150, vx: 0, vy: 1 };
    const keys = { a: false, d: false };

    const rand = (a, b) => Math.random() * (b - a) + a;
    const direction = (arr) => arr[Math.floor(Math.random() * arr.length)]; //cloud direction
    const nowMs = () => performance.now(); // for random delay

    // Moving Clouds
    const makeCloud = () => {
      const { width: W, height: H } = sectionEl.getBoundingClientRect();
      const dir = direction([1, -1]);
      const w = rand(CLOUD_SIZE_MIN, CLOUD_SIZE_MAX);
      const h = w * 0.6;
      const y = rand(CLOUD_Y_PADDING, Math.max(CLOUD_Y_PADDING, H - h - CLOUD_Y_PADDING));
      const speed = rand(CLOUD_SPEED_MIN, CLOUD_SPEED_MAX) * dir;
      const alpha = rand(CLOUD_ALPHA_MIN, CLOUD_ALPHA_MAX);
      const delay = rand(0, CLOUD_START_DELAY_MAX_MS);
      const startAt = nowMs() + delay;
      const x = dir === 1 ? -w - rand(0, W * 0.3) : W + rand(0, W * 0.3);
      return { x, y, w, h, speed, alpha, dir, startAt };
    };
    let clouds = Array.from({ length: NUM_CLOUDS }, makeCloud);

    const makePoint = () => {
      const { width: W, height: H } = sectionEl.getBoundingClientRect();
      const minY = H * 0.4; 
      const r = rand(POINT_RADIUS_MIN, POINT_RADIUS_MAX);
      const x = rand(r + 8, Math.max(r + 8, W - r - 8));
      const y = rand(minY + r, Math.max(minY + r, H - r - 20)); 
      const driftX = rand(-POINT_DRIFT, POINT_DRIFT);
      const driftY = rand(-POINT_DRIFT, POINT_DRIFT);
      return { x, y, r, driftX, driftY, baseX: x, baseY: y, t: Math.random() * Math.PI * 2 };
    };
    let points = Array.from({ length: NUM_POINTS }, makePoint);

    const keyDown = (e) => {
      const k = e.key.toLowerCase();
      if (['a', 'd', 'w', ' '].includes(k)) e.preventDefault();

      if (k === 'a') keys.a = true;
      if (k === 'd') keys.d = true;
      if (k === 'w') {
        const { height: H } = sectionEl.getBoundingClientRect();
        const ground = H - player.h;
        if (Math.abs(player.y - ground) < 0.5) player.vy = JUMP_VELOCITY;
      }

      if (k === 'r') {
        totalScore = 0;
        points = Array.from({ length: NUM_POINTS }, makePoint);
        Object.assign(player, { x: 50, y: 50, vx: 0, vy: 1 });
        scoreCbRef.current?.(0);
      }
    };
    const keyUp = (e) => {
      const k = e.key.toLowerCase();
      if (k === 'a') keys.a = false;
      if (k === 'd') keys.d = false;
    };
    window.addEventListener('keydown', keyDown, { passive: false });
    window.addEventListener('keyup', keyUp);

    const onVis = () => {
      if (document.hidden) {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      } else if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(loop);
      }
    };
    document.addEventListener('visibilitychange', onVis);

    const rectCircleCollides = (rect, c) => {
      const testX = Math.max(rect.x, Math.min(c.x, rect.x + rect.w));
      const testY = Math.max(rect.y, Math.min(c.y, rect.y + rect.h));
      const distX = c.x - testX;
      const distY = c.y - testY;
      return (distX * distX + distY * distY) <= (c.r * c.r);
    };

    // main draw
    const loop = () => {
      const { width: W, height: H } = sectionEl.getBoundingClientRect();
      ctx.clearRect(0, 0, W, H); // must clear once per loop at beginning (not after or it'll remove all draws)

      for (const c of clouds) {
        if (nowMs() >= c.startAt) {
          c.x += c.speed;
          if (c.dir === 1 && c.x > W + c.w) Object.assign(c, makeCloud());
          if (c.dir === -1 && c.x < -c.w) Object.assign(c, makeCloud());
          ctx.save();
          ctx.globalAlpha = c.alpha;
          ctx.drawImage(cloudImg, c.x, c.y, c.w, c.h);
          ctx.restore();
        }
      }

      if (assetsReady) {
        drawRainier();
        drawGrass();
        player.vx = 0;
        if (keys.d && player.x < W - player.w) player.vx = PLAYER_SPEED;
        if (keys.a && player.x > 0)            player.vx = -PLAYER_SPEED;

        player.x += player.vx;
        player.y += player.vy;

        if (player.y + player.h + player.vy < H) player.vy += GRAVITY;
        else {
          player.vy = 0;
          player.y = H - player.h;
        }

        if (player.x < 0) player.x = 0;
        if (player.x + player.w > W) player.x = W - player.w;

        // draw points
        for (let i = 0; i < points.length; i++) {
          const p = points[i];

          p.t += 0.02;
          p.x += p.driftX * 0.2;
          p.y += p.driftY * 0.2 + Math.sin(p.t) * 0.1;

          if (p.x < p.r + 4) p.x = p.r + 4;
          if (p.x > W - p.r - 4) p.x = W - p.r - 4;
          if (p.y < p.r + 80) p.y = p.r + 80;
          if (p.y > H - p.r - 4) p.y = H - p.r - 4;

          // todo: could be a helper method
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r + 2, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(0,0,0,0.25)'; 
          ctx.fill();
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          const grad = ctx.createRadialGradient(p.x - p.r * 0.4, p.y - p.r * 0.4, p.r * 0.2, p.x, p.y, p.r);
          grad.addColorStop(0, '#FFE38A');
          grad.addColorStop(1, '#E4B300');
          ctx.fillStyle = grad;
          ctx.fill();
          ctx.beginPath();
          ctx.arc(p.x - p.r * 0.3, p.y - p.r * 0.3, p.r * 0.25, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255,255,255,0.55)';
          ctx.fill();

          if (rectCircleCollides(player, p)) {
            totalScore += POINT_VALUE;
            scoreCbRef.current?.(totalScore);
            points[i] = makePoint();
          }
        }

        ctx.drawImage(playerImg, player.x, player.y, player.w, player.h);
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
      ro.disconnect();
      window.removeEventListener('keydown', keyDown);
      window.removeEventListener('keyup', keyUp);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []); 

  return <canvas id="gameCanvas" ref={canvasRef} />;
}