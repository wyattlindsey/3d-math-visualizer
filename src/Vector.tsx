import React, { useRef, useEffect, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Line } from '@react-three/drei';
import DraggableHandle from './DraggableHandle';

interface VectorProps {
  vector: THREE.Vector3;
  color: string;
  label: string;
  additionalInfo: string;
  onDrag: (newVector: THREE.Vector3) => void;
  isDraggingEnabled: boolean;
  setControlsDisabled: (disabled: boolean) => void;
}

const Vector: React.FC<VectorProps> = ({
  vector,
  color,
  label,
  additionalInfo,
  onDrag,
  isDraggingEnabled,
  setControlsDisabled = () => {},
}) => {
  const lineRef = useRef<any>(null);
  const prevVector = useRef<THREE.Vector3>(vector.clone());

  const handleDrag = useCallback(
    (newPosition: THREE.Vector3) => {
      if (!isDraggingEnabled) return;
      vector.copy(newPosition);
      onDrag(newPosition);
    },
    [vector, onDrag, isDraggingEnabled]
  );

  // Update only when vector changes
  useEffect(() => {
    if (lineRef.current) {
      const positions = lineRef.current.geometry.attributes.position
        .array as Float32Array;
      if (!prevVector.current.equals(vector)) {
        positions[3] = vector.x;
        positions[4] = vector.y;
        positions[5] = vector.z;
        lineRef.current.geometry.attributes.position.needsUpdate = true;
        prevVector.current.copy(vector); // Update the previous vector
      }
    }
  }, [vector]);

  return (
    <>
      <Line
        ref={lineRef}
        points={[[0, 0, 0], vector.toArray() as [number, number, number]]}
        color={color}
        lineWidth={2}
      />
      {isDraggingEnabled && (
        <DraggableHandle
          vector={vector}
          color={color}
          onDrag={handleDrag}
          setControlsDisabled={setControlsDisabled}
        />
      )}
    </>
  );
};

export default Vector;
