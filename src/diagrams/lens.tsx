import { useId, useState, type ReactNode } from 'react'
import { CameraGlyph, D, DiagramShell, Person, Readout, Segmented, Slider, Stage, Tag } from './kit'

/**
 * Lens & Perspective diagrams.
 *
 * Every one of these is driven by the real pinhole projection
 * `screen = focalLength x worldOffset / depth`, so what the learner sees when
 * they drag a control is what a camera would actually do — not an animation
 * of what it roughly looks like.
 */

// The camera view occupies a 16:9 window inside the 320 x 200 canvas.
const VIEW = { x: 40, y: 8, w: 240, h: 135 }
const PX_PER_MM = VIEW.w / 36 // full-frame sensor is 36mm wide
const CX = VIEW.x + VIEW.w / 2
const CAMERA_HEIGHT_M = 1.5
const SUBJECT_HEIGHT_M = 1.7
/** Keeps the subject this tall on screen at every setting, so only perspective changes. */
const SUBJECT_PX = 100
const GROUND_Y = 138
const HORIZON_Y = GROUND_Y - (CAMERA_HEIGHT_M / SUBJECT_HEIGHT_M) * SUBJECT_PX

/** Camera-to-subject distance that frames the subject at a constant size. */
function distanceFor(focalMm: number): number {
  return (focalMm * SUBJECT_HEIGHT_M * PX_PER_MM) / SUBJECT_PX
}

function project(focalMm: number, offsetM: number, depthM: number): number {
  return (focalMm * offsetM * PX_PER_MM) / depthM
}

function ViewFrame({ clipId, children }: { clipId: string; children: ReactNode }) {
  return (
    <>
      <defs>
        <clipPath id={clipId}>
          <rect x={VIEW.x} y={VIEW.y} width={VIEW.w} height={VIEW.h} rx="3" />
        </clipPath>
      </defs>
      <rect
        x={VIEW.x}
        y={VIEW.y}
        width={VIEW.w}
        height={VIEW.h}
        rx="3"
        fill={D.bg}
        stroke={D.frame}
        strokeWidth="1.5"
      />
      <g clipPath={`url(#${clipId})`}>{children}</g>
    </>
  )
}

// ───────────────────────────── 1 · Focal length ─────────────────────────────

const SCENERY = [
  { x: -2.6, behind: 9, height: 2.8, width: 0.5 },
  { x: 1.4, behind: 16, height: 3.5, width: 0.6 },
  { x: 3.6, behind: 6, height: 2.2, width: 0.4 },
]

export function FocalLengthDial() {
  const [focal, setFocal] = useState(50)
  const clipId = useId()
  const d = distanceFor(focal)

  const family = focal <= 35 ? 'Wide' : focal <= 58 ? 'Normal' : 'Telephoto'
  const visible = SCENERY.filter((s) => {
    const px = CX + project(focal, s.x, d + s.behind)
    return px > VIEW.x && px < VIEW.x + VIEW.w
  }).length

  // Plan view maps 0–36m of depth onto the strip.
  const planX = (metres: number) => 22 + (metres / 36) * 276

  return (
    <DiagramShell
      controls={
        <>
          <Slider
            label="Focal length"
            value={focal}
            min={16}
            max={200}
            step={1}
            suffix="mm"
            onChange={setFocal}
            hint={`Camera stands ${d.toFixed(1)}m away — moved so the subject stays exactly the same size.`}
          />
          <Readout>
            <strong>{family}.</strong> The subject never changes size. Everything that moves is{' '}
            <em>perspective</em>: at 16mm the background is far and small and you can see{' '}
            {SCENERY.length} objects; at 200mm the background looms and only {visible} stay in
            frame.
          </Readout>
        </>
      }
    >
      <Stage label={`Focal length ${focal}mm, camera ${d.toFixed(1)} metres from subject`}>
        <ViewFrame clipId={clipId}>
          <rect
            x={VIEW.x}
            y={HORIZON_Y}
            width={VIEW.w}
            height={VIEW.y + VIEW.h - HORIZON_Y}
            fill={D.muted}
            opacity="0.25"
          />
          <line
            x1={VIEW.x}
            y1={HORIZON_Y}
            x2={VIEW.x + VIEW.w}
            y2={HORIZON_Y}
            stroke={D.muted}
            strokeWidth="1"
          />
          {SCENERY.map((s, i) => {
            const z = d + s.behind
            const x = CX + project(focal, s.x, z)
            const baseY = HORIZON_Y + project(focal, CAMERA_HEIGHT_M, z)
            const h = project(focal, s.height, z)
            const w = Math.max(2, project(focal, s.width, z))
            return (
              <rect
                key={i}
                x={x - w / 2}
                y={baseY - h}
                width={w}
                height={h}
                rx="1"
                fill={D.muted}
                stroke={D.stroke}
                strokeWidth="0.8"
              />
            )
          })}
          <Person x={CX} y={GROUND_Y} h={SUBJECT_PX} />
        </ViewFrame>
        <Tag x={VIEW.x} y={VIEW.y - 1} anchor="start" color={D.stroke}>
          WHAT THE CAMERA SEES
        </Tag>

        {/* Plan view */}
        <line x1="14" y1="176" x2="306" y2="176" stroke={D.muted} strokeWidth="1" />
        <CameraGlyph x={planX(0)} y={176} scale={0.9} />
        <Tag x={planX(0)} y={195} color={D.accent} size={8}>
          camera
        </Tag>
        <Person x={planX(d)} y={181} h={16} color={D.fill} />
        <Tag x={planX(d)} y={195} size={8}>
          {d.toFixed(1)}m
        </Tag>
        {SCENERY.map((s, i) => (
          <rect
            key={i}
            x={planX(d + s.behind) - 2}
            y={169}
            width="4"
            height="7"
            fill={D.muted}
            stroke={D.stroke}
            strokeWidth="0.6"
          />
        ))}
        <Tag x="14" y="164" anchor="start" size={8}>
          FROM ABOVE — the world never moves, only the camera does
        </Tag>
      </Stage>
    </DiagramShell>
  )
}

// ─────────────────────────── 2 · Perspective compression ───────────────────────────

/** Three subjects at fixed real-world spacing; only the camera moves. */
const RANKS = [0, 6, 16]
/** Small lateral offsets so the three figures do not overlap exactly. */
const RANK_OFFSETS = [-0.9, 0.35, -0.2]

export function CompressionStack() {
  const [near, setNear] = useState(6)
  const clipId = useId()
  // Focal length is derived so the nearest figure is always the same size.
  const focal = (near * SUBJECT_PX) / (SUBJECT_HEIGHT_M * PX_PER_MM)
  const sizes = RANKS.map((r) => project(focal, SUBJECT_HEIGHT_M, near + r))
  const ratio = sizes[2] / sizes[0]

  const planX = (metres: number) => 22 + (metres / 50) * 276

  return (
    <DiagramShell
      controls={
        <>
          <Slider
            label="Camera distance to the first person"
            value={near}
            min={2}
            max={34}
            step={1}
            suffix="m"
            onChange={setNear}
            hint={`Focal length auto-set to ${Math.round(focal)}mm so the front figure never changes size.`}
          />
          <Readout>
            The three people are standing <strong>6m and 16m apart, always</strong>. Only your
            distance changes. The furthest one reads at{' '}
            <strong>{Math.round(ratio * 100)}%</strong> of the nearest one&rsquo;s height — near
            the camera that gap is huge, far from it the three flatten into one stack.
          </Readout>
        </>
      }
    >
      <Stage label={`Compression at ${near} metres, ${Math.round(focal)}mm`}>
        <ViewFrame clipId={clipId}>
          <rect
            x={VIEW.x}
            y={HORIZON_Y}
            width={VIEW.w}
            height={VIEW.y + VIEW.h - HORIZON_Y}
            fill={D.muted}
            opacity="0.25"
          />
          {[2, 1, 0].map((i) => {
            const z = near + RANKS[i]
            const h = sizes[i]
            const baseY = HORIZON_Y + project(focal, CAMERA_HEIGHT_M, z)
            const x = CX + project(focal, RANK_OFFSETS[i] ?? 0, z)
            return (
              <g key={i}>
                <Person x={x} y={baseY} h={h} opacity={i === 0 ? 1 : 0.55 + 0.15 * (2 - i)} />
                <Tag x={x} y={baseY + 9} size={8} color={D.stroke}>
                  {RANKS[i]}m
                </Tag>
              </g>
            )
          })}
        </ViewFrame>

        <line x1="14" y1="176" x2="306" y2="176" stroke={D.muted} strokeWidth="1" />
        <CameraGlyph x={planX(0)} y={176} scale={0.9} />
        {RANKS.map((r, i) => (
          <Person key={i} x={planX(near + r)} y={181} h={14} opacity={i === 0 ? 1 : 0.6} />
        ))}
        <Tag x="14" y="164" anchor="start" size={8}>
          FROM ABOVE — the people never move
        </Tag>
        <Tag x={planX(near)} y={195} size={8}>
          {near}m
        </Tag>
      </Stage>
    </DiagramShell>
  )
}

// ─────────────────────────── 3 · Wide-angle distortion ───────────────────────────

export function FaceDistortion() {
  const [distanceCm, setDistanceCm] = useState(45)
  const d = distanceCm / 100
  // Head is always drawn the same width; only the relative depths change.
  const NOSE_FORWARD = 0.1
  const EAR_BACK = 0.08
  const noseScale = d / (d - NOSE_FORWARD)
  const earScale = d / (d + EAR_BACK)
  const focal = Math.round((d * SUBJECT_PX) / (0.23 * PX_PER_MM))

  const cx = 160
  const cy = 82
  const headRx = 40
  const headRy = 52

  return (
    <DiagramShell
      controls={
        <>
          <Slider
            label="Camera distance to the face"
            value={distanceCm}
            min={30}
            max={300}
            step={5}
            suffix="cm"
            onChange={setDistanceCm}
            hint={`To keep this framing from ${distanceCm}cm you would be on roughly a ${focal}mm lens.`}
          />
          <Readout>
            Head width is locked. The nose is drawn{' '}
            <strong>{Math.round((noseScale - 1) * 100)}% larger</strong> and the ears{' '}
            <strong>{Math.round((1 - earScale) * 100)}% narrower</strong> than reality — purely
            because at {distanceCm}cm the nose is meaningfully closer to the lens than the ears
            are. Step back and the face flattens out on its own.
          </Readout>
        </>
      }
    >
      <Stage label={`Face at ${distanceCm} centimetres, about ${focal}mm`}>
        {/* ears */}
        <ellipse cx={cx - headRx * earScale} cy={cy} rx="9" ry="14" fill={D.muted} stroke={D.stroke} strokeWidth="1" />
        <ellipse cx={cx + headRx * earScale} cy={cy} rx="9" ry="14" fill={D.muted} stroke={D.stroke} strokeWidth="1" />
        {/* head */}
        <ellipse cx={cx} cy={cy} rx={headRx} ry={headRy} fill={D.bg} stroke={D.frame} strokeWidth="2" />
        {/* eyes */}
        <ellipse cx={cx - 15} cy={cy - 14} rx="5.5" ry="3.5" fill={D.fill} />
        <ellipse cx={cx + 15} cy={cy - 14} rx="5.5" ry="3.5" fill={D.fill} />
        {/* nose — the part that grows */}
        <path
          d={`M ${cx} ${cy - 12} L ${cx - 11 * noseScale} ${cy + 16 * noseScale} Q ${cx} ${cy + 22 * noseScale} ${cx + 11 * noseScale} ${cy + 16 * noseScale} Z`}
          fill={D.accent}
          opacity="0.85"
          stroke={D.stroke}
          strokeWidth="1"
        />
        {/* mouth */}
        <path
          d={`M ${cx - 13} ${cy + 30} Q ${cx} ${cy + 36} ${cx + 13} ${cy + 30}`}
          fill="none"
          stroke={D.stroke}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <Tag x={cx} y="16" color={D.accent}>
          NOSE {noseScale.toFixed(2)}x
        </Tag>
        <Tag x={cx - headRx * earScale - 16} y={cy + 34} anchor="end" size={8}>
          ears {earScale.toFixed(2)}x
        </Tag>

        {/* plan view */}
        <line x1="20" y1="176" x2="300" y2="176" stroke={D.muted} strokeWidth="1" />
        <CameraGlyph x={26} y={176} scale={0.9} />
        <circle cx={26 + (d / 3) * 250} cy="176" r="7" fill={D.fill} />
        <circle cx={26 + (d / 3) * 250 - 8} cy="176" r="2.5" fill={D.accent} />
        <Tag x="20" y="164" anchor="start" size={8}>
          FROM ABOVE — the orange dot is the nose
        </Tag>
        <Tag x={26 + (d / 3) * 250} y="195" size={8}>
          {distanceCm}cm
        </Tag>
      </Stage>
    </DiagramShell>
  )
}

// ─────────────────────────── 4 · Zoom vs push in ───────────────────────────

const PANE = { w: 140, h: 79, y: 34 }
const START_DISTANCE = 8
const BG_BEHIND = 12

export function ZoomVsPush() {
  const [amount, setAmount] = useState(0)
  const zoomClip = useId()
  const pushClip = useId()
  const t = amount / 100

  const focalZoom = 35 + t * 65
  const subjectPx = 30 * (focalZoom / 35) // both panes match this exactly
  const pushDistance = (35 * START_DISTANCE) / focalZoom

  const zoomBgRatio = START_DISTANCE / (START_DISTANCE + BG_BEHIND)
  const pushBgRatio = pushDistance / (pushDistance + BG_BEHIND)

  function Pane({
    x,
    clipId,
    title,
    bgRatio,
  }: {
    x: number
    clipId: string
    title: string
    bgRatio: number
  }) {
    const cxp = x + PANE.w / 2
    const baseY = PANE.y + PANE.h - 6
    const bgH = subjectPx * bgRatio * 1.9
    return (
      <>
        <defs>
          <clipPath id={clipId}>
            <rect x={x} y={PANE.y} width={PANE.w} height={PANE.h} rx="3" />
          </clipPath>
        </defs>
        <Tag x={cxp} y={PANE.y - 5} color={D.stroke}>
          {title}
        </Tag>
        <rect x={x} y={PANE.y} width={PANE.w} height={PANE.h} rx="3" fill={D.bg} stroke={D.frame} strokeWidth="1.5" />
        <g clipPath={`url(#${clipId})`}>
          <rect x={cxp - bgH * 0.75} y={baseY - bgH} width={bgH * 0.42} height={bgH} fill={D.muted} stroke={D.stroke} strokeWidth="0.7" />
          <rect x={cxp + bgH * 0.34} y={baseY - bgH * 0.8} width={bgH * 0.36} height={bgH * 0.8} fill={D.muted} stroke={D.stroke} strokeWidth="0.7" />
          <Person x={cxp} y={baseY} h={subjectPx} />
        </g>
      </>
    )
  }

  return (
    <DiagramShell
      controls={
        <>
          <Slider
            label="How far into the move you are"
            value={amount}
            min={0}
            max={100}
            step={1}
            suffix="%"
            onChange={setAmount}
            hint={`Zoom: camera parked at 8m, lens now ${Math.round(focalZoom)}mm. Push: lens stays 35mm, camera now ${pushDistance.toFixed(1)}m away.`}
          />
          <Readout>
            The subject is <strong>identical size in both</strong> — that is the whole point. Zoom
            only crops, so the background stays at {Math.round(zoomBgRatio * 100)}% relative size
            throughout. Push changes where you are standing, so the background falls away to{' '}
            {Math.round(pushBgRatio * 100)}%. A zoom says <em>look closer</em>. A push says{' '}
            <em>get closer</em>.
          </Readout>
        </>
      }
    >
      <Stage label={`Zoom versus push in, ${amount} percent`}>
        <Pane x={12} clipId={zoomClip} title="ZOOM — camera parked" bgRatio={zoomBgRatio} />
        <Pane x={168} clipId={pushClip} title="PUSH IN — camera moves" bgRatio={pushBgRatio} />

        {/* plan views */}
        <line x1="12" y1="152" x2="152" y2="152" stroke={D.muted} strokeWidth="1" />
        <CameraGlyph x={20} y={152} scale={0.8} />
        <Person x={140} y={157} h={13} />
        <Tag x="82" y="170" size={8}>
          camera never moves
        </Tag>

        <line x1="168" y1="152" x2="308" y2="152" stroke={D.muted} strokeWidth="1" />
        <CameraGlyph x={176 + t * 96} y={152} scale={0.8} />
        <Person x={296} y={157} h={13} />
        <path
          d={`M 180 141 L ${182 + t * 96} 141`}
          stroke={D.accent}
          strokeWidth="1.5"
          opacity={t > 0.02 ? 1 : 0}
        />
        <Tag x="238" y="170" size={8}>
          camera walks {(START_DISTANCE - pushDistance).toFixed(1)}m closer
        </Tag>
      </Stage>
    </DiagramShell>
  )
}

// ─────────────────────────── 5 · Sensor size & crop factor ───────────────────────────

type SensorKey = 'ff' | 's35' | 'mft' | 'oneinch' | 'phone'

const SENSORS: Record<SensorKey, { label: string; w: number; h: number; note: string }> = {
  ff: { label: 'Full frame', w: 36, h: 24, note: 'Alexa 65 aside, this is the big-format look.' },
  s35: { label: 'Super 35', w: 24.89, h: 18.66, note: 'The default of cinema for a century.' },
  mft: { label: 'MFT', w: 17.3, h: 13, note: 'Small rigs, gimbals, a lot of run-and-gun.' },
  oneinch: { label: '1 inch', w: 13.2, h: 8.8, note: 'Most drones sit here.' },
  phone: { label: 'Phone', w: 7.6, h: 5.7, note: 'Your hybrid-pipeline plate camera.' },
}

const FF_DIAGONAL = Math.hypot(36, 24)

export function SensorCrop() {
  const [focal, setFocal] = useState(35)
  const [sensor, setSensor] = useState<SensorKey>('s35')
  const clipId = useId()
  const s = SENSORS[sensor]
  const crop = FF_DIAGONAL / Math.hypot(s.w, s.h)
  const equivalent = Math.round(focal * crop)
  const hfov = 2 * Math.atan(s.w / (2 * focal)) * (180 / Math.PI)

  // Left: sensors drawn to scale. 36mm wide maps to 120px.
  const SC = 120 / 36
  const lx = 76
  const ly = 74

  return (
    <DiagramShell
      controls={
        <>
          <Segmented
            label="Sensor"
            value={sensor}
            onChange={setSensor}
            options={(Object.keys(SENSORS) as SensorKey[]).map((k) => ({
              value: k,
              label: SENSORS[k].label,
            }))}
          />
          <div className="mt-3">
            <Slider label="Lens" value={focal} min={8} max={135} step={1} suffix="mm" onChange={setFocal} />
          </div>
          <Readout>
            A <strong>{focal}mm</strong> lens on {s.label} frames like a{' '}
            <strong>{equivalent}mm</strong> on full frame — crop factor {crop.toFixed(2)}x,
            horizontal field of view {hfov.toFixed(0)}&deg;. The lens never changed. The sensor is
            just taking a smaller bite out of the same image circle. {s.note}
          </Readout>
        </>
      }
    >
      <Stage label={`${focal}mm on ${s.label}, equivalent to ${equivalent}mm full frame`}>
        <Tag x={lx} y="18" color={D.stroke}>
          SAME IMAGE CIRCLE
        </Tag>
        <circle cx={lx} cy={ly} r={(FF_DIAGONAL / 2) * SC + 6} fill="none" stroke={D.muted} strokeWidth="1.5" strokeDasharray="3 3" />
        {(Object.keys(SENSORS) as SensorKey[]).map((k) => {
          const v = SENSORS[k]
          const active = k === sensor
          return (
            <rect
              key={k}
              x={lx - (v.w * SC) / 2}
              y={ly - (v.h * SC) / 2}
              width={v.w * SC}
              height={v.h * SC}
              fill={active ? D.accent : 'none'}
              fillOpacity={active ? 0.18 : 0}
              stroke={active ? D.accent : D.muted}
              strokeWidth={active ? 2 : 1}
            />
          )
        })}
        <Tag x={lx} y="150" size={9}>
          {s.label} — {s.w} x {s.h}mm
        </Tag>
        <Tag x={lx} y="164" size={8} color={D.accent}>
          crop {crop.toFixed(2)}x
        </Tag>

        {/* Right: resulting frame */}
        <Tag x="232" y="18" color={D.stroke}>
          WHAT YOU GET
        </Tag>
        <defs>
          <clipPath id={clipId}>
            <rect x="164" y="26" width="136" height="96" rx="3" />
          </clipPath>
        </defs>
        <rect x="164" y="26" width="136" height="96" rx="3" fill={D.bg} stroke={D.frame} strokeWidth="1.5" />
        <g clipPath={`url(#${clipId})`}>
          {/* Subject size scales with the equivalent focal length. */}
          {[
            { x: -0.9, h: 1.7, o: 1 },
            { x: 0.8, h: 1.7, o: 0.5 },
          ].map((p, i) => {
            const scale = equivalent / 18
            return (
              <Person
                key={i}
                x={232 + p.x * 20 * scale}
                y={116}
                h={Math.max(6, 13 * scale)}
                opacity={p.o}
              />
            )
          })}
        </g>
        <Tag x="232" y="136" size={8}>
          {hfov.toFixed(0)}&deg; horizontal
        </Tag>
        <Tag x="232" y="150" size={9} color={D.accent}>
          frames like {equivalent}mm
        </Tag>
        <Tag x="232" y="164" size={8}>
          on full frame
        </Tag>
      </Stage>
    </DiagramShell>
  )
}

// ─────────────────────────── 6 · Aspect ratio & safe areas ───────────────────────────

type RatioKey = '1.33' | '1.78' | '1.85' | '2.39' | '0.5625' | '1'

const RATIOS: Record<RatioKey, { label: string; value: number; use: string }> = {
  '1.33': { label: '4:3', value: 4 / 3, use: 'Archive, academy, and a deliberate retro or intimate feel.' },
  '1.78': { label: '16:9', value: 16 / 9, use: 'YouTube, broadcast, the default of everything online.' },
  '1.85': { label: '1.85:1', value: 1.85, use: 'The quieter of the two theatrical standards.' },
  '2.39': { label: '2.39:1', value: 2.39, use: 'Scope. Landscape, spectacle, and lonely negative space.' },
  '0.5625': { label: '9:16', value: 9 / 16, use: 'Reels, Shorts, TikTok — where your ad work actually lands.' },
  '1': { label: '1:1', value: 1, use: 'Feed posts that must survive both crops.' },
}

/** Explicit order — object key order would float the integer-like '1' first. */
const RATIO_ORDER: RatioKey[] = ['1.33', '1.78', '1.85', '2.39', '0.5625', '1']

export function AspectRatioFrames() {
  const [ratio, setRatio] = useState<RatioKey>('1.78')
  const [showVertical, setShowVertical] = useState(true)
  const r = RATIOS[ratio]

  // Fit the frame inside a 250 x 130 box, centred.
  const boxW = 250
  const boxH = 130
  let w = boxW
  let h = w / r.value
  if (h > boxH) {
    h = boxH
    w = h * r.value
  }
  const x = 160 - w / 2
  const y = 22 + (boxH - h) / 2
  const actionInset = 0.035
  const titleInset = 0.05
  const vertW = h * (9 / 16)

  return (
    <DiagramShell
      controls={
        <>
          <Segmented
            label="Aspect ratio"
            value={ratio}
            onChange={setRatio}
            options={RATIO_ORDER.map((k) => ({ value: k, label: RATIOS[k].label }))}
          />
          <label className="mt-3 flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
            <input
              type="checkbox"
              checked={showVertical}
              onChange={(e) => setShowVertical(e.target.checked)}
              className="h-4 w-4 accent-[var(--color-accent-strong)]"
            />
            Show the 9:16 crop that will be taken out of it
          </label>
          <Readout>
            <strong>{r.label}.</strong> {r.use} The inner dashed box is{' '}
            <strong>title safe</strong> — captions and logos outside it get eaten by a phone
            bezel or a platform UI.{' '}
            {showVertical && r.value > 1
              ? 'Notice how little of a wide frame survives a vertical crop: compose the subject inside that band or you will re-shoot.'
              : ''}
          </Readout>
        </>
      }
    >
      <Stage label={`Aspect ratio ${r.label} with safe areas`}>
        <rect x={x} y={y} width={w} height={h} rx="2" fill={D.bg} stroke={D.frame} strokeWidth="2" />
        <rect
          x={x + w * actionInset}
          y={y + h * actionInset}
          width={w * (1 - actionInset * 2)}
          height={h * (1 - actionInset * 2)}
          fill="none"
          stroke={D.stroke}
          strokeWidth="0.8"
          strokeDasharray="4 3"
          opacity="0.7"
        />
        <rect
          x={x + w * titleInset}
          y={y + h * titleInset}
          width={w * (1 - titleInset * 2)}
          height={h * (1 - titleInset * 2)}
          fill="none"
          stroke={D.accent}
          strokeWidth="1"
          strokeDasharray="2 3"
        />
        {showVertical && r.value > 1 ? (
          <rect
            x={160 - vertW / 2}
            y={y}
            width={vertW}
            height={h}
            fill={D.accent}
            fillOpacity="0.14"
            stroke={D.accent}
            strokeWidth="1.2"
          />
        ) : null}
        <Person x={160} y={y + h * 0.9} h={h * 0.62} />
        <Tag x={x} y={y - 5} anchor="start" size={9}>
          {r.label}
        </Tag>
        <Tag x={x + w} y={y - 5} anchor="end" size={8} color={D.accent}>
          title safe
        </Tag>
        {showVertical && r.value > 1 ? (
          <Tag x={160} y={y + h + 12} size={8} color={D.accent}>
            9:16 keeps {Math.round((vertW / w) * 100)}% of the width
          </Tag>
        ) : null}
      </Stage>
    </DiagramShell>
  )
}
