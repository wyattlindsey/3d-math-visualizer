import React from 'react';
import { Line, Text } from '@react-three/drei';
import * as THREE from 'three';

interface VectorProps {
  vector: THREE.Vector3;
  color: string;
  label: string;
  additionalInfo: string;
}

const Vector: React.FC<VectorProps> = ({
  vector,
  color,
  label,
  additionalInfo,
}) => {
  return (
    <>
      <Line
        points={[[0, 0, 0], vector.toArray() as [number, number, number]]}
        color={color}
        lineWidth={2}
      />
      <Text
        position={vector.clone().multiplyScalar(1.2).toArray()}
        color={color}
        fontSize={0.2}
        anchorX="center"
        anchorY="middle"
      >
        {label} ({additionalInfo})
      </Text>
    </>
  );
};

const formatNumber = (num: number) =>
  num % 1 === 0 ? num.toFixed(0) : num.toFixed(1);

const DotProductVisualizer: React.FC = () => {
  const vecA = new THREE.Vector3(1, 2, 3);
  const vecB = new THREE.Vector3(4, 5, 6);

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
