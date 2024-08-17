import React from 'react';
import * as THREE from 'three';
import Vector from './Vector';

const formatNumber = (num: number) =>
  num % 1 === 0 ? num.toFixed(0) : num.toFixed(1);

const DotProductVisualizer: React.FC = () => {
  const vecA = new THREE.Vector3(1, 2, 3);
  const vecB = new THREE.Vector3(4, 5, 6);

  // Calculate midpoint between vecA and vecB for placing the dot product label
  const midpoint = vecA.clone().add(vecB).multiplyScalar(0.5);

  return (
    <>
      <Vector
        vector={vecA}
        color="orange"
        label="Vector A"
        additionalInfo={`${formatNumber(vecA.x)}, ${formatNumber(
          vecA.y
        )}, ${formatNumber(vecA.z)}`}
      />
      <Vector
        vector={vecB}
        color="purple"
        label="Vector B"
        additionalInfo={`${formatNumber(vecB.x)}, ${formatNumber(
          vecB.y
        )}, ${formatNumber(vecB.z)}`}
      />
    </>
  );
};

export default DotProductVisualizer;
