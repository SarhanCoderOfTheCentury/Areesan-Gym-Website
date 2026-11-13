"use client";
import dynamic from "next/dynamic";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { usePageVisible } from "@/lib/usePageVisible";
const Renderer = dynamic(() => import("./SceneRenderer"), { ssr: false });
type Runtime = {
  visible: string[];
  update: (id: string, visible: boolean) => void;
  mode: "auto" | "on" | "off";
  setMode: (mode: "auto" | "on" | "off") => void;
  supported: boolean | null;
  compact: boolean;
  lowPower: boolean;
};
const RuntimeContext = createContext<Runtime>({
  visible: [],
  update: () => {},
  mode: "auto",
  setMode: () => {},
  supported: null,
  compact: false,
  lowPower: false,
});
export function SceneRuntimeProvider({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState<string[]>([]);
  const [mode, setMode] = useState<"auto" | "on" | "off">("auto");
  const [supported, setSupported] = useState<boolean | null>(null),
    [compact, setCompact] = useState(false),
    [lowPower, setLowPower] = useState(false);
  useEffect(() => {
    const n = navigator as Navigator & {
      deviceMemory?: number;
      connection?: { saveData?: boolean };
    };
    setCompact(matchMedia("(max-width:760px)").matches);
    setLowPower(
      !!(
        n.connection?.saveData ||
        (n.deviceMemory && n.deviceMemory <= 2) ||
        (n.hardwareConcurrency && n.hardwareConcurrency <= 2)
      ),
    );
    try {
      const gl = document.createElement("canvas").getContext("webgl2");
      setSupported(!!gl);
      gl?.getExtension("WEBGL_lose_context")?.loseContext();
    } catch {
      setSupported(false);
    }
  }, []);
  const update = useCallback(
    (id: string, active: boolean) =>
      setVisible((v) =>
        active ? (v.includes(id) ? v : [...v, id]) : v.filter((x) => x !== id),
      ),
    [],
  );
  return (
    <RuntimeContext.Provider
      value={{ visible, update, mode, setMode, supported, compact, lowPower }}
    >
      {children}
    </RuntimeContext.Provider>
  );
}
export function GraphicsControl() {
  const { mode, setMode, supported, lowPower } = useContext(RuntimeContext);
  const reduced = useReducedMotion();
  const active=supported===true&&!reduced&&mode!=='off'&&(!lowPower||mode==='on');
  return (
    <button
      className="graphics-control"
      onClick={() => setMode(active ? "off" : "on")}
      aria-pressed={active}
      disabled={!!reduced || supported === false}
    >
      {reduced
        ? "Reduced-motion experience"
        : supported === false
          ? "Static experience · 3D unavailable"
          : active
            ? "Pause interactive 3D"
            : "Enable interactive 3D"}
      <span>
        {reduced || supported === false
          ? "STATIC"
          : mode === "auto" ? "AUTO" : active ? "ON" : "OFF"}
      </span>
    </button>
  );
}
export type SceneProps = {
  kind: "brand" | "goals" | "journey" | "membership" | "ring";
  selected?: number;
  progress?: number;
  onSelect?: (index: number) => void;
  color?: string;
};
export default function SceneViewport({
  id,
  label,
  children,
  ...props
}: SceneProps & { id: string; label: string; children?: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.05 });
  const pageVisible = usePageVisible();
  const reduced = useReducedMotion();
  const [failed, setFailed] = useState(false),
    [rendered, setRendered] = useState(false);
  const { visible, update, mode, supported, compact, lowPower } =
    useContext(RuntimeContext);
  const handleReady = useCallback(() => setRendered(true), []);
  const handleFailure = useCallback(() => {
    setFailed(true);
    setRendered(false);
  }, []);
  useEffect(() => {
    update(id, inView);
    return () => update(id, false);
  }, [id, inView, update]);
  const enabled =
    pageVisible &&
    supported === true &&
    !failed &&
    !reduced &&
    mode !== "off" &&
    (!lowPower || mode === "on") &&
    inView &&
    visible.slice(0, 2).includes(id);
  return (
    <div
      ref={ref}
      className={`scene-viewport scene-${props.kind}`}
      data-render-mode={enabled ? "3d" : "poster"}
      role="img"
      aria-label={label}
    >
      <div
        className={`scene-poster ${enabled && rendered ? "is-hidden" : ""}`}
        aria-hidden="true"
      >
        {props.kind === "membership" ? (
          <div className="static-podium">
            {["Basic", "Premium", "Premium Plus"].map((p, i) => (
              <div
                key={p}
                className={i === (props.selected ?? 1) ? "selected" : ""}
              >
                <small>
                  {i === 1 ? "SIGNATURE" : i === 0 ? "ESSENTIAL" : "DEDICATED"}
                </small>
                <b>{["I", "II", "III"][i]}</b>
                <strong>{p}</strong>
                <span>AREESAN</span>
              </div>
            ))}
          </div>
        ) : props.kind === "journey" ? (
          <svg viewBox="0 0 750 250">
            <path
              d="M70 150Q180 40 265 110T480 125T680 70"
              fill="none"
              stroke="#90743c"
              strokeWidth="2"
            />
            {[
              [70, 150],
              [265, 110],
              [480, 125],
              [680, 70],
            ].map(([x, y], i) => (
              <g key={i} transform={`translate(${x} ${y})`}>
                <circle
                  r="30"
                  stroke={
                    Math.round((props.progress ?? 0) * 3) === i
                      ? "#f0ce79"
                      : "#6e5b33"
                  }
                  strokeWidth="3"
                  fill="#111b1e"
                />
                <text y="5" textAnchor="middle" fill="#d8ba78" fontSize="13">
                  0{i + 1}
                </text>
              </g>
            ))}
          </svg>
        ) : (
          <img
            src={
              props.kind === "brand"
                ? "/visuals/brand-poster.svg"
                : "/visuals/orbit-poster.svg"
            }
            alt=""
          />
        )}
      </div>
      {enabled && (
        <Renderer
          {...props}
          compact={compact}
          onReady={handleReady}
          onFailure={handleFailure}
        />
      )}
      {children}
    </div>
  );
}
