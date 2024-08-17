import React, { FC } from 'react';
import * as THREE from 'three';
import Vector from './Vector';

interface IVisualizerProps {
  setControlsDisabled: (disabled: boolean) => void;
}

const formatNumber = (num: number) =>
  num % 1 === 0 ? num.toFixed(0) : num.toFixed(1);

const CrossProductVisualizer: FC<IVisualizerProps> = ({
  setControlsDisabled,
}) => {
  const vecA = new THREE.Vector3(1, 2, 0);
  const vecB = new THREE.Vector3(0, 1, 1);

  const crossProduct = new THREE.Vector3().crossVectors(vecA, vecB);

  return (
    <>
      <Vector
        vector={vecA}
        color="orange"
        label="Vector A"
        additionalInfo={`${formatNumber(vecA.x)}, ${formatNumber(
          vecA.y
        )}, ${formatNumber(vecA.z)}`}
        setControlsDisabled={setControlsDisabled}
      />
      <Vector
        vector={vecB}
        color="purple"
        label="Vector B"
        additionalInfo={`${formatNumber(vecB.x)}, ${formatNumber(
          vecB.y
        )}, ${formatNumber(vecB.z)}`}
      />
      <Vector
        vector={crossProduct}
        color="cyan"
        label="Cross Product"
        additionalInfo={`${formatNumber(crossProduct.x)}, ${formatNumber(
          crossProduct.y
        )}, ${formatNumber(crossProduct.z)}`}
        setControlsDisabled={setControlsDisabled}
      />
    </>
  );
};

export default CrossProductVisualizer;
