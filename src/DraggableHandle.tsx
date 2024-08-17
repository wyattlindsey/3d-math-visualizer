import React, { useState, useRef } from 'react';
import { ThreeEvent, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useGesture } from '@use-gesture/react';

interface VectorProps {
  vector: THREE.Vector3;
  color: string;
  onDrag: (newVector: THREE.Vector3) => void;
  isDraggingEnabled: boolean;
  setControlsDisabled?: (disabled: boolean) => void;
}

const DraggableHandle: React.FC<VectorProps> = ({
  vector,
  color,
  onDrag,
  isDraggingEnabled,
  setControlsDisabled = () => {},
}) => {
  const { raycaster, camera, gl } = useThree();
  const [boxPosition, setBoxPosition] = useState(vector.clone());
  const handleRef = useRef<THREE.Mesh>(null);

  const bind = useGesture(
    {
      onDrag: ({ event }) => {
        event.stopPropagation();
        if (!isDraggingEnabled || !handleRef.current) return;

        // Cast a ray from the camera to the mouse pointer to find the intersection point with the dragging plane
        const intersects = raycaster.intersectObject(handleRef.current);
        if (intersects.length > 0) {
          const intersectionPoint = intersects[0].point;
          setBoxPosition(intersectionPoint);
          onDrag(intersectionPoint.clone());
        }
        setControlsDisabled(true);
      },
      onDragEnd: () => {
        setControlsDisabled(false);
      },
    },
    { enabled: isDraggingEnabled }
  );

  const gestureHandlers = bind();

  // onClick handler with the correct event type
  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    console.log('Box clicked:', event);
  };

  return (
    <mesh
      ref={handleRef}
      position={boxPosition.toArray()}
      onClick={handleClick}
      //   onPointerDown={gestureHandlers.onPointerDown}
      //   onPointerMove={gestureHandlers.onPointerMove}
      //   onPointerUp={gestureHandlers.onPointerUp}
    >
      <boxGeometry args={[0.2, 0.2, 0.2]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
};

export default DraggableHandle;
