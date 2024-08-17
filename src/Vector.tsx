import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Line, Text } from '@react-three/drei';
import DraggableHandle from './DraggableHandle';

interface VectorProps {
  vector: THREE.Vector3;
  color: string;
  label: string;
  additionalInfo: string;
  onDrag?: (newVector: THREE.Vector3) => void;
  isDraggingEnabled?: boolean;
  setControlsDisabled?: (disabled: boolean) => void;
}

const Vector: React.FC<VectorProps> = ({
  vector,
  color,
  label,
  additionalInfo,
  onDrag = () => {},
  isDraggingEnabled = true,
  setControlsDisabled = () => {},
}) => {
  const lineRef = useRef<THREE.Line>(null);

  // Update the position of the line's endpoint dynamically
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

  const handleDrag = (newPosition: THREE.Vector3) => {
    vector.copy(newPosition);
    onDrag(newPosition);
  };

  return (
    <>
      <Line
        // ref={lineRef}
        points={[[0, 0, 0], vector.toArray() as [number, number, number]]}
        color={color}
        lineWidth={2}
      />
      <Text
        position={vector.clone().multiplyScalar(1.2).toArray()}
        color={color}
        fontSize={0.2}
        anchorX="center"
        anchorY="middle"
      >
        {label} ({additionalInfo})
      </Text>
      <DraggableHandle
        vector={vector}
        color={color}
        onDrag={handleDrag}
        setControlsDisabled={setControlsDisabled}
      />
    </>
  );
};

export default Vector;
