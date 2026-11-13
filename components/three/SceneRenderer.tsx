"use client";
import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { Component, type ReactNode } from "react";
import BrandHeroScene from "./BrandHeroScene";
import FitnessGoalSelector from "./FitnessGoalSelector";
import FitnessJourneyScene from "./FitnessJourneyScene";
import MembershipPodium from "./MembershipPodium";
import ProgressRing from "./ProgressRing";
import type { SceneProps } from "./SceneViewport";
class SceneBoundary extends Component<
  { children: ReactNode; onFailure: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onFailure();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}
export default function SceneRenderer(
  props: SceneProps & {
    compact: boolean;
    onReady: () => void;
    onFailure: () => void;
  },
) {
  const isMember = props.kind === "membership";
  return (
    <SceneBoundary onFailure={props.onFailure}>
      <div className="live-scene">
        <Canvas
          camera={{ position: isMember ? [0, 2.8, 9] : [0, 1, 7.8], fov: 38 }}
          dpr={[1, props.compact ? 1 : 1.5]}
          gl={{
            antialias: !props.compact,
            alpha: true,
            powerPreference: "low-power",
          }}
          onCreated={({ gl }) => {
            gl.setClearColor("#080b0d", 0);
            props.onReady();
            gl.domElement.addEventListener(
              "webglcontextlost",
              (e) => {
                e.preventDefault();
                props.onFailure();
              },
              { once: true },
            );
          }}
          fallback={<span />}
        >
          <ambientLight intensity={0.6} />
          <hemisphereLight args={["#f8e6bd", "#101722", 1.6]} />
          <directionalLight
            position={[4, 6, 5]}
            intensity={3.4}
            color="#ffdf8c"
          />
          <directionalLight
            position={[-5, 1, 2]}
            intensity={2}
            color="#bccad9"
          />
          <pointLight position={[0, -1, 3]} intensity={10} color="#c69c40" />
          <Environment resolution={64} frames={1}>
            <Lightformer
              intensity={3}
              color="#fff3cf"
              position={[0, 5, 3]}
              scale={[10, 2, 1]}
              rotation={[Math.PI / 2, 0, 0]}
            />
            <Lightformer
              intensity={2}
              color="#e9c672"
              position={[-5, 0, 2]}
              scale={[2, 8, 1]}
              rotation={[0, Math.PI / 3, 0]}
            />
            <Lightformer
              intensity={2}
              color="#ffffff"
              position={[5, 0, 1]}
              scale={[2, 7, 1]}
              rotation={[0, -Math.PI / 3, 0]}
            />
          </Environment>
          {props.kind === "brand" && <BrandHeroScene compact={props.compact} />}
          {props.kind === "goals" && (
            <FitnessGoalSelector
              selected={props.selected ?? 0}
              onSelect={props.onSelect}
              color={props.color}
            />
          )}
          {props.kind === "journey" && (
            <FitnessJourneyScene progress={props.progress ?? 0} />
          )}
          {props.kind === "membership" && (
            <MembershipPodium
              selected={props.selected ?? 1}
              onSelect={props.onSelect}
            />
          )}
          {props.kind === "ring" && (
            <ProgressRing
              selected={props.selected ?? 0}
              onSelect={props.onSelect}
            />
          )}
        </Canvas>
      </div>
    </SceneBoundary>
  );
}
