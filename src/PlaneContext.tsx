import React, { createContext, useRef, useContext, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Define the shape of the context value
interface PlaneContextType {
  planeRef: React.RefObject<THREE.Mesh>;
  setPlaneAtIntersection: (raycaster: THREE.Raycaster) => void;
}

// Create the context with the correct type
export const PlaneContext = createContext<PlaneContextType | null>(null);

export const PlaneProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const planeRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();

  // Update the plane's orientation and position based on the camera
  const updatePlane = (intersectionPoint: THREE.Vector3) => {
    if (planeRef.current) {
      // Position the plane at the intersection point
      planeRef.current.position.copy(intersectionPoint);

      // Align the plane to face the camera
      planeRef.current.quaternion.copy(camera.quaternion);

      // Optionally scale the plane to cover more area if needed
      planeRef.current.scale.set(10, 10, 1);
    }
  };

  // Function to be called when dragging starts
  const setPlaneAtIntersection = (raycaster: THREE.Raycaster) => {
    const intersects = raycaster.intersectObject(planeRef.current!);
    if (intersects.length > 0) {
      const intersectionPoint = intersects[0].point;
      updatePlane(intersectionPoint);
    }
  };

  return (
    <PlaneContext.Provider value={{ planeRef, setPlaneAtIntersection }}>
      {children}
      <mesh ref={planeRef} visible={false}>
        <planeGeometry args={[1000, 1000]} />
        <meshBasicMaterial visible={false} />
      </mesh>
    </PlaneContext.Provider>
  );
};
