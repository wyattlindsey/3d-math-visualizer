import React, { useState, useEffect } from 'react';
import * as THREE from 'three';
import Vector from './Vector';
import { Line, Text } from '@react-three/drei';

const DotProductVisualizer: React.FC<{
  setControlsDisabled: (isEnabled: boolean) => void;
}> = ({ setControlsDisabled }) => {
  const [vecA, setVecA] = useState(new THREE.Vector3(1, 2, 3));
  const [vecB, setVecB] = useState(new THREE.Vector3(4, 5, 6));
  const [projection, setProjection] = useState(new THREE.Vector3());
  const [dotProduct, setDotProduct] = useState(vecA.dot(vecB));

  const updateDotProduct = () => {
    const dot = vecA.dot(vecB);
    setDotProduct(dot);

    // Calculate the projection of B onto A
    const projectionVector = vecA.clone().multiplyScalar(dot / vecA.lengthSq());

    setProjection(projectionVector);
  };

  useEffect(() => {
    updateDotProduct();
  }, [vecA, vecB]);

  return (
    <>
      <Vector
        vector={vecA}
        color="orange"
        label="Vector A"
        additionalInfo={`${vecA.x.toFixed(2)}, ${vecA.y.toFixed(
          2
        )}, ${vecA.z.toFixed(2)}`}
        onDrag={newVec => {
          setVecA(newVec);
          updateDotProduct();
        }}
        isDraggingEnabled
        setControlsDisabled={setControlsDisabled}
      />
      <Vector
        vector={vecB}
        color="purple"
        label="Vector B"
        additionalInfo={`${vecB.x.toFixed(2)}, ${vecB.y.toFixed(
          2
        )}, ${vecB.z.toFixed(2)}`}
        onDrag={newVec => {
          setVecB(newVec);
          updateDotProduct();
        }}
        isDraggingEnabled
        setControlsDisabled={setControlsDisabled}
      />
      {/* Line representing the projection of B onto A */}
      <Line
        points={[[0, 0, 0], projection.toArray() as [number, number, number]]}
        color="cyan"
        lineWidth={2}
      />
      <Text
        position={projection.clone().multiplyScalar(1.1).toArray()} // Position the text slightly beyond the end of the projection line
        color="white"
        fontSize={0.5}
        anchorX="center"
        anchorY="middle"
      >
        Dot Product: {dotProduct.toFixed(2)}
      </Text>
    </>
  );
};

export default DotProductVisualizer;
