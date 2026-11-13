"use client";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, RoundedBox } from "@react-three/drei";
import { Group, MathUtils } from "three";
import { plans } from "@/lib/content";
function Panel({
  i,
  selected,
  onSelect,
}: {
  i: number;
  selected: number;
  onSelect?: (i: number) => void;
}) {
  const ref = useRef<Group>(null);
  const [hovered, hover] = useState(false);
  const active = i === selected;
  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.position.y = MathUtils.damp(
      ref.current.position.y,
      active ? 0.45 : hovered ? 0.18 : 0,
      6,
      dt,
    );
    ref.current.rotation.y = MathUtils.damp(
      ref.current.rotation.y,
      active ? 0 : (1 - i) * 0.22,
      5,
      dt,
    );
    ref.current.position.z = MathUtils.damp(
      ref.current.position.z,
      active ? 0.4 : -0.15,
      5,
      dt,
    );
  });
  return (
    <group ref={ref} position={[(i - 1) * 2, 0, 0]}>
      <RoundedBox
        args={[1.72, 2.35, 0.17]}
        radius={0.09}
        smoothness={3}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
        onClick={() => onSelect?.(i)}
      >
        <meshStandardMaterial
          color={active ? "#47391e" : "#182126"}
          metalness={0.8}
          roughness={0.3}
        />
      </RoundedBox>
      <RoundedBox
        args={[1.65, 2.28, 0.07]}
        position={[0, 0, 0.09]}
        radius={0.06}
        smoothness={2}
      >
        <meshStandardMaterial
          color={active ? "#161913" : "#0b1014"}
          metalness={0.35}
          roughness={0.4}
        />
      </RoundedBox>
      <Html
        position={[0, 0, 0.16]}
        center
        transform
        distanceFactor={6}
        style={{ pointerEvents: "none" }}
      >
        <div className={`podium-label ${active ? "is-active" : ""}`}>
          <span>
            {i === 1 ? "SIGNATURE" : i === 0 ? "ESSENTIAL" : "DEDICATED"}
          </span>
          <b>{i === 0 ? "I" : i === 1 ? "II" : "III"}</b>
          <strong>{plans[i].name}</strong>
          <small>PKR {plans[i].price}</small>
        </div>
      </Html>
      <mesh position={[0, -1.4 - (i === 1 ? 0.12 : 0), 0]}>
        <cylinderGeometry args={[1.02, 1.08, 0.18, 48]} />
        <meshStandardMaterial color="#22292c" metalness={0.9} roughness={0.3} />
      </mesh>
    </group>
  );
}
export default function MembershipPodium({
  selected,
  onSelect,
}: {
  selected: number;
  onSelect?: (i: number) => void;
}) {
  useFrame(({ camera }) => camera.lookAt(0, -0.15, 0));
  return (
    <group rotation={[0, -0.04, 0]}>
      {plans.map((p, i) => (
        <Panel key={p.id} i={i} selected={selected} onSelect={onSelect} />
      ))}
    </group>
  );
}
