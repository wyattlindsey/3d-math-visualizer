import React, { createContext, useRef } from 'react';
import * as THREE from 'three';

export const PlaneContext = createContext<THREE.Mesh | null>(null);

export const PlaneProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const planeRef = useRef<THREE.Mesh>(null);

  return (
    <PlaneContext.Provider value={planeRef.current}>
      {children}
      <mesh ref={planeRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial visible={false} />
      </mesh>
    </PlaneContext.Provider>
  );
};
