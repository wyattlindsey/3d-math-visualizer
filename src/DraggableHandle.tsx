import React, { useState, useRef, useContext } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useGesture } from '@use-gesture/react';
import { PlaneContext } from './PlaneContext'; // Adjust the import path accordingly

interface VectorProps {
  vector: THREE.Vector3;
  color: string;
  onDrag: (newVector: THREE.Vector3) => void;
  setControlsDisabled: (disabled: boolean) => void;
}

const DraggableHandle: React.FC<VectorProps> = ({
  vector,
  color,
  onDrag,
  setControlsDisabled,
}) => {
  const { raycaster } = useThree();
  const planeRef = useContext(PlaneContext);
  const [boxPosition, setBoxPosition] = useState(vector);

  const bind = useGesture(
    {
      onDrag: () => {
        setControlsDisabled(true);
        if (!planeRef) return;

        const intersects = raycaster.intersectObject(planeRef);
        if (intersects.length > 0) {
          const intersection = intersects[0];
          const newPosition = new THREE.Vector3(
            intersection.point.x,
            intersection.point.y,
            intersection.point.z
          );
          setBoxPosition(newPosition);
          onDrag(newPosition);
        }
      },
      onDragEnd: () => {
        setControlsDisabled(false);
      },
    },
    { enabled: true }
  );

  return (
    //@ts-ignore Ignores type error on next line
    <mesh {...bind()} position={boxPosition.toArray()}>
      <boxGeometry args={[0.2, 0.2, 0.2]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
};

export default DraggableHandle;
