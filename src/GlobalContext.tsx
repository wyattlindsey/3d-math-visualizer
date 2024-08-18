import React, { createContext, useState } from 'react';
import * as THREE from 'three';

interface GlobalContextType {
  dotVecA: THREE.Vector3;
  setDotVecA: (vec: THREE.Vector3) => void;
  dotVecB: THREE.Vector3;
  setDotVecB: (vec: THREE.Vector3) => void;
  dotProduct: number;
  setDotProduct: (dotProduct: number) => void;
  crossVecA: THREE.Vector3;
  setCrossVecA: (vec: THREE.Vector3) => void;
  crossVecB: THREE.Vector3;
  setCrossVecB: (vec: THREE.Vector3) => void;
  crossProduct: THREE.Vector3;
  setCrossProduct: (vec: THREE.Vector3) => void;
}

// Create the context with the correct type
export const GlobalContext = createContext<GlobalContextType | null>(null);

export const GlobalProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const dVecA = new THREE.Vector3(1, 2, 3);
  const dVecB = new THREE.Vector3(4, 5, 6);
  const cVecA = new THREE.Vector3(1, 2, 0);
  const cVecB = new THREE.Vector3(0, 1, 1);

  const [dotVecA, setDotVecA] = useState(dVecA);
  const [dotVecB, setDotVecB] = useState(dVecB);
  const [dotProduct, setDotProduct] = useState(dVecA.dot(dVecB));
  const [crossVecA, setCrossVecA] = useState(cVecA);
  const [crossVecB, setCrossVecB] = useState(cVecB);
  const [crossProduct, setCrossProduct] = useState(
    new THREE.Vector3().crossVectors(cVecA, cVecB)
  );

  const value = {
    dotVecA,
    setDotVecA: (a: THREE.Vector3) => setDotVecA(a),
    dotVecB,
    setDotVecB: (b: THREE.Vector3) => setDotVecB(b),
    dotProduct,
    setDotProduct: (dotProduct: number) => setDotProduct(dotProduct),
    crossVecA,
    setCrossVecA: (a: THREE.Vector3) => setCrossVecA(a),
    crossVecB,
    setCrossVecB: (b: THREE.Vector3) => setCrossVecB(b),
    crossProduct,
    setCrossProduct: (v: THREE.Vector3) => setCrossProduct(v),
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
