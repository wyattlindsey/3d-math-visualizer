import React, { useState, useEffect, useContext, useCallback } from 'react';
import * as THREE from 'three';
import Vector from './Vector';
import { Line } from '@react-three/drei';
import { GlobalContext } from './GlobalContext';

const DotProductVisualizer: React.FC<{
    setControlsDisabled: (isEnabled: boolean) => void;
}> = ({ setControlsDisabled }) => {
    const [vecA, setVecA] = useState(new THREE.Vector3(1, 2, 3));
    const [vecB, setVecB] = useState(new THREE.Vector3(4, 5, 6));
    const [projection, setProjection] = useState(new THREE.Vector3());
    const global = useContext(GlobalContext);

    const updateDotProduct = useCallback(() => {
        const dot = vecA.dot(vecB);
        global?.setDotProduct(dot);

        // Calculate the projection of B onto A
        const projectionVector = vecA
            .clone()
            .multiplyScalar(dot / vecA.lengthSq());

        setProjection(projectionVector);
    }, [global, setProjection, vecA, vecB]);

    useEffect(() => {
        updateDotProduct();
        global?.setDotVecA(vecA);
        global?.setDotVecB(vecB);
    }, [global, vecA, vecB, updateDotProduct]);

    if (!global) return null;

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
                points={[
                    [0, 0, 0],
                    projection.toArray() as [number, number, number],
                ]}
                color="cyan"
                lineWidth={2}
            />
        </>
    );
};

export default DotProductVisualizer;
