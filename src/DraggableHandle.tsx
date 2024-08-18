import React, { useState, useRef, useContext } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useGesture } from '@use-gesture/react';
import { PlaneContext } from './PlaneContext';

interface VectorProps {
  vector: THREE.Vector3;
  color: string;
  onDrag: (newVector: THREE.Vector3) => void;
  setControlsDisabled: (disabled: boolean) => void;
  isDraggingEnabled?: boolean;
}

const DraggableHandle: React.FC<VectorProps> = ({
  vector,
  color,
  onDrag,
  setControlsDisabled,
  isDraggingEnabled = true,
}) => {
  const { raycaster } = useThree();
  const planeContext = useContext(PlaneContext);
  const handleRef = useRef<THREE.Mesh>(null);

  const bind = useGesture(
    {
      onDrag: ({ event, memo }) => {
        event.stopPropagation();
        if (
          !isDraggingEnabled ||
          !planeContext ||
          !planeContext.planeRef ||
          !handleRef.current
        )
          return;

        if (!memo) {
          // Set the plane at the intersection point
          planeContext.setPlaneAtIntersection(raycaster);
          memo = true;
        }

        const intersects = raycaster.intersectObject(
          planeContext.planeRef.current!
        );
        if (intersects.length > 0) {
          const intersectionPoint = intersects[0].point;
          handleRef.current.position.copy(intersectionPoint);
          onDrag(intersectionPoint.clone());
        }

        setControlsDisabled(true);

        return memo;
      },
      onDragEnd: () => {
        setControlsDisabled(false);
      },
    },
    { enabled: isDraggingEnabled }
  );

  return (
    //@ts-ignore
    <mesh {...bind()} ref={handleRef} position={vector.toArray()}>
      <boxGeometry args={[0.2, 0.2, 0.2]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
};

export default DraggableHandle;
