"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { Group, MathUtils } from "three";
import { goals } from "@/lib/content";
import { Stage } from "./BrandHeroScene";
import { Icon } from "../ui/Primitives";
export default function FitnessGoalSelector({
  selected,
  onSelect,
  color = "#eac76e",
}: {
  selected: number;
  onSelect?: (n: number) => void;
  color?: string;
}) {
  const wheel = useRef<Group>(null);
  const core = useRef<Group>(null);
  useFrame((s, dt) => {
    if (wheel.current)
      wheel.current.rotation.y = MathUtils.damp(
        wheel.current.rotation.y,
        (-selected * Math.PI * 2) / 5,
        3,
        dt,
      );
    if (core.current)
      core.current.rotation.y = Math.sin(s.clock.elapsedTime * 0.4) * 0.16;
    s.camera.lookAt(0, -0.3, 0);
  });
  return (
    <group position={[0, 0.1, 0]}>
      <Stage radius={2.25} y={-1.4} />
      <group ref={core}>
        <mesh>
          <icosahedronGeometry args={[0.63, 2]} />
          <meshStandardMaterial
            color="#161d20"
            metalness={0.8}
            roughness={0.3}
          />
        </mesh>
        <Html position={[0, 0, 0.67]} center style={{ pointerEvents: "none" }}>
          <div style={{ color }} className="goal-core-icon">
            <Icon name={goals[selected].icon} size={40} />
          </div>
        </Html>
      </group>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.7, 0]}>
        <torusGeometry args={[1.8, 0.018, 8, 96]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </mesh>
      <mesh rotation={[0.4, 0.1, 0.6]}>
        <torusGeometry args={[1.02, 0.055, 10, 80]} />
        <meshStandardMaterial color={color} metalness={0.85} roughness={0.25} />
      </mesh>
      <group ref={wheel}>
        {goals.map((g, i) => {
          const a = (i / 5) * Math.PI * 2;
          return (
            <group
              key={g.id}
              position={[Math.sin(a) * 1.8, -0.55, Math.cos(a) * 1.8]}
            >
              <mesh
                onClick={() => onSelect?.(i)}
                scale={selected === i ? 1.25 : 1}
              >
                <icosahedronGeometry args={[0.17, 1]} />
                <meshStandardMaterial
                  color={g.color}
                  metalness={0.7}
                  roughness={0.2}
                  emissive={g.color}
                  emissiveIntensity={selected === i ? 0.4 : 0.05}
                />
              </mesh>
            </group>
          );
        })}
      </group>
      <Html position={[0, -1.7, 1.1]} center style={{ pointerEvents: "none" }}>
        <div className="scene-caption">
          {String(selected + 1).padStart(2, "0")} / 05{" "}
          <span style={{ color }}>
            {goals[selected].shortTitle.toUpperCase()}
          </span>
        </div>
      </Html>
    </group>
  );
}
