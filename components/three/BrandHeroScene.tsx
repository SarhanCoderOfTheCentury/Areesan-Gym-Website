"use client";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Shape, Path, Group, MathUtils } from "three";
export function BrandMark({ scale = 1 }: { scale?: number }) {
  const shape = useMemo(() => {
    const s = new Shape();
    s.moveTo(0, 1.1);
    s.lineTo(1.05, -0.85);
    s.lineTo(0, -0.37);
    s.lineTo(-1.05, -0.85);
    s.closePath();
    const hole = new Path();
    hole.moveTo(0, 0.51);
    hole.lineTo(-0.5, -0.46);
    hole.lineTo(0, 0.02);
    hole.lineTo(0.5, -0.46);
    hole.closePath();
    s.holes.push(hole);
    return s;
  }, []);
  return (
    <mesh scale={scale} position={[0, 0, -0.1]}>
      <extrudeGeometry
        args={[
          shape,
          {
            depth: 0.18,
            bevelEnabled: true,
            bevelSegments: 3,
            steps: 1,
            bevelSize: 0.045,
            bevelThickness: 0.045,
          },
        ]}
      />
      <meshStandardMaterial color="#dab156" metalness={0.9} roughness={0.23} />
    </mesh>
  );
}
export function Stage({
  radius = 2.1,
  y = -1.85,
}: {
  radius?: number;
  y?: number;
}) {
  return (
    <group position={[0, y, 0]}>
      <mesh>
        <cylinderGeometry args={[radius, radius + 0.1, 0.16, 64]} />
        <meshStandardMaterial
          color="#171c20"
          metalness={0.85}
          roughness={0.35}
        />
      </mesh>
      <mesh position={[0, 0.09, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius - 0.06, 0.012, 8, 100]} />
        <meshBasicMaterial color="#dfbd6c" />
      </mesh>
      <mesh position={[0, -0.13, 0]}>
        <cylinderGeometry args={[radius + 0.04, radius + 0.14, 0.1, 64]} />
        <meshStandardMaterial color="#4a3d24" metalness={0.9} roughness={0.4} />
      </mesh>
    </group>
  );
}
export default function BrandHeroScene({ compact }: { compact: boolean }) {
  const floating = useRef<Group>(null);
  const rings = useRef<Group>(null);
  const particles = useMemo(
    () =>
      new Float32Array(
        Array.from(
          { length: (compact ? 25 : 65) * 3 },
          (_, i) => Math.sin(i * 93.37) * (i % 3 === 1 ? 3.3 : 3.8),
        ),
      ),
    [compact],
  );
  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (floating.current) {
      floating.current.position.y = 0.2 + Math.sin(t * 0.65) * 0.1;
      floating.current.rotation.y = MathUtils.damp(
        floating.current.rotation.y,
        state.pointer.x * 0.25 + Math.sin(t * 0.25) * 0.1,
        3,
        delta,
      );
      floating.current.rotation.x = MathUtils.damp(
        floating.current.rotation.x,
        -state.pointer.y * 0.09,
        3,
        delta,
      );
    }
    if (rings.current) rings.current.rotation.y += delta * 0.07;
    state.camera.position.x = MathUtils.damp(
      state.camera.position.x,
      state.pointer.x * 0.35,
      2,
      delta,
    );
    state.camera.lookAt(0, -0.2, 0);
  });
  return (
    <group>
      {[-1, 1].map((side) => (
        <mesh
          key={side}
          position={[side * 1.8, 0.5, -1.8]}
          rotation={[0, 0, side * -0.35]}
        >
          <planeGeometry args={[0.025, 5]} />
          <meshBasicMaterial color="#d9b75e" transparent opacity={0.13} />
        </mesh>
      ))}
      <group ref={floating}>
        <BrandMark scale={1.25} />
      </group>
      <group ref={rings} position={[0, 0.05, -0.05]}>
        <mesh rotation={[0.9, 0.35, 0.35]}>
          <torusGeometry args={[2.05, 0.035, 12, 120]} />
          <meshStandardMaterial
            color="#c19b48"
            metalness={0.95}
            roughness={0.23}
          />
        </mesh>
        <mesh rotation={[-0.4, 0.9, -0.6]}>
          <torusGeometry args={[2.32, 0.018, 8, 120]} />
          <meshStandardMaterial
            color="#dfbf73"
            metalness={0.9}
            roughness={0.25}
          />
        </mesh>
        <mesh rotation={[0.8, -0.4, 0.8]}>
          <torusGeometry args={[2.52, 0.007, 6, 120]} />
          <meshBasicMaterial color="#6e5b36" />
        </mesh>
        <mesh position={[2.03, 0.05, 0]}>
          <sphereGeometry args={[0.08, 14, 14]} />
          <meshStandardMaterial
            emissive="#dbab48"
            emissiveIntensity={1.2}
            color="#edc570"
            metalness={0.5}
          />
        </mesh>
      </group>
      <Stage />
      {[-1, 1].map((side) => (
        <group
          key={side}
          position={[side * 2.2, -1.3, -0.3]}
          rotation={[0, 0, side * -0.3]}
        >
          {[0, 1, 2].map((i) => (
            <mesh
              key={i}
              rotation={[Math.PI / 2, 0, 0]}
              position={[0, 0, i * 0.12]}
            >
              <cylinderGeometry
                args={[0.42 - i * 0.06, 0.42 - i * 0.06, 0.09, 32]}
              />
              <meshStandardMaterial
                color={i === 1 ? "#9d7b39" : "#20262b"}
                metalness={0.85}
                roughness={0.32}
              />
            </mesh>
          ))}
        </group>
      ))}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particles, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#e4c575"
          size={0.024}
          transparent
          opacity={0.62}
          sizeAttenuation
        />
      </points>
    </group>
  );
}
