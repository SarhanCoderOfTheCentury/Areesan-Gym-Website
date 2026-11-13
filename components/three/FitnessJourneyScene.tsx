"use client";
import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { CatmullRomCurve3, Vector3, MathUtils } from "three";
const points = [
  new Vector3(-2.4, -0.35, 0.4),
  new Vector3(-0.8, 0.3, -0.2),
  new Vector3(0.8, -0.1, 0.3),
  new Vector3(2.4, 0.45, -0.1),
];
export default function FitnessJourneyScene({
  progress,
}: {
  progress: number;
}) {
  const curve = useMemo(() => new CatmullRomCurve3(points), []);
  useFrame(({ camera }, dt) => {
    camera.position.x = MathUtils.damp(
      camera.position.x,
      (progress - 0.5) * 1.4,
      3,
      dt,
    );
    camera.position.z = MathUtils.damp(camera.position.z, 7.5, 3, dt);
    camera.lookAt((progress - 0.5) * 0.5, -0.2, 0);
  });
  return (
    <group rotation={[0.15, -0.12, 0]}>
      <mesh>
        <tubeGeometry args={[curve, 80, 0.025, 8, false]} />
        <meshStandardMaterial color="#9c7a35" metalness={0.8} roughness={0.3} />
      </mesh>
      {points.map((p, i) => (
        <group key={i} position={p}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.44, 0.04, 12, 48]} />
            <meshStandardMaterial
              color={Math.round(progress * 3) === i ? "#f2d386" : "#625230"}
              metalness={0.8}
              roughness={0.25}
              emissive="#b38b33"
              emissiveIntensity={Math.round(progress * 3) === i ? 0.35 : 0}
            />
          </mesh>
          <mesh position={[0, -0.18, 0]}>
            <cylinderGeometry args={[0.47, 0.52, 0.15, 40]} />
            <meshStandardMaterial
              color="#1c2429"
              metalness={0.8}
              roughness={0.25}
            />
          </mesh>
          <mesh position={[0, 0.25, 0]}>
            <octahedronGeometry
              args={[Math.round(progress * 3) === i ? 0.22 : 0.13]}
            />
            <meshStandardMaterial
              color="#f0cd76"
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
          {Array.from({ length: i + 1 }, (_, k) => (
            <mesh key={k} position={[(k - i / 2) * 0.12, -0.45, 0.4]}>
              <sphereGeometry args={[0.025, 8, 8]} />
              <meshBasicMaterial color="#c9a45a" />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}
