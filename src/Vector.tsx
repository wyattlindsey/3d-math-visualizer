import React, { useRef } from 'react';
import { ThreeEvent, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface VectorProps {
  vector: THREE.Vector3;
  color: string;
  onDrag: (newVector: THREE.Vector3) => void;
  isDraggingEnabled: boolean;
}

const Vector: React.FC<VectorProps> = ({
  vector,
  color,
  onDrag,
  isDraggingEnabled,
}) => {
  const lineRef =
    useRef<THREE.Line<THREE.BufferGeometry, THREE.Material | THREE.Material[]>>(
      null
    );

  useFrame(() => {
    if (lineRef.current) {
      const positions = lineRef.current.geometry.attributes.position
        .array as Float32Array;
      positions[3] = vector.x;
      positions[4] = vector.y;
      positions[5] = vector.z;
      lineRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <>
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes.position"
            array={new Float32Array([0, 0, 0, vector.x, vector.y, vector.z])}
            count={2}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial attach="material" color={color} linewidth={2} />
      </line>
      <DraggableHandle
        vector={vector}
        color={color}
        onDrag={onDrag}
        isDraggingEnabled={isDraggingEnabled}
      />
    </>
  );
};

interface VectorProps {
  vector: THREE.Vector3;
  color: string;
  onDrag: (newVector: THREE.Vector3) => void;
  isDraggingEnabled: boolean;
}

const DraggableHandle: React.FC<VectorProps> = ({
  vector,
  color,
  onDrag,
  isDraggingEnabled,
}) => {
  const handleRef = useRef<THREE.Mesh>(null);
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;

  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    if (!isDraggingEnabled) return;
    event.stopPropagation();
    const domElement = event.target as HTMLElement;
    domElement.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: ThreeEvent<PointerEvent>) => {
    if (!isDraggingEnabled || !handleRef.current) return;
    const { x, y } = event.unprojectedPoint;
    const newVector = new THREE.Vector3(
      (x * viewport.width) / aspect,
      -(y * viewport.height) / aspect,
      vector.z
    );
    onDrag(newVector);
  };

  const handlePointerUp = (event: ThreeEvent<PointerEvent>) => {
    if (!isDraggingEnabled) return;
    event.stopPropagation();
    const domElement = event.target as HTMLElement;
    domElement.releasePointerCapture(event.pointerId);
  };

  return (
    <mesh
      ref={handleRef}
      position={vector.toArray()}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <boxGeometry args={[0.2, 0.2, 0.2]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
};

export default Vector;
