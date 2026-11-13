"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, MathUtils } from "three";
import { BrandMark, Stage } from "./BrandHeroScene";
export default function ProgressRing({
  selected,
  onSelect,
}: {
  selected: number;
  onSelect?: (i: number) => void;
}) {
  const ref = useRef<Group>(null);
  useFrame((s, dt) => {
    if (ref.current)
      ref.current.rotation.y = MathUtils.damp(
        ref.current.rotation.y,
        s.pointer.x * 0.15,
        3,
        dt,
      );
    s.camera.lookAt(0, -0.2, 0);
  });
  return (
    <group ref={ref} rotation={[0.12, 0.12, -0.12]}>
      <Stage radius={1.8} />
      <BrandMark scale={0.65} />
      {Array.from({ length: 5 }, (_, i) => (
        <group key={i} rotation={[0, 0, (i * Math.PI * 2) / 5]}>
          <mesh
            onPointerOver={() => onSelect?.(i)}
            onClick={() => onSelect?.(i)}
          >
            <torusGeometry
              args={[
                1.45,
                selected === i ? 0.12 : 0.075,
                12,
                40,
                (Math.PI * 2) / 5 - 0.13,
              ]}
            />
            <meshStandardMaterial
              color={selected === i ? "#f1cf79" : "#675632"}
              metalness={0.85}
              roughness={0.24}
              emissive="#bf9a4d"
              emissiveIntensity={selected === i ? 0.2 : 0}
            />
          </mesh>
          <mesh position={[Math.cos(0.5) * 1.45, Math.sin(0.5) * 1.45, 0.01]}>
            <sphereGeometry args={[0.04, 12, 12]} />
            <meshBasicMaterial color="#fff0bf" />
          </mesh>
        </group>
      ))}
    </group>
  );
}
