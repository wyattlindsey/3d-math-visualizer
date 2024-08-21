import React, { useContext, useEffect, useState } from 'react';
import * as THREE from 'three';
import Vector from './Vector';
import { GlobalContext } from './GlobalContext';

const CrossProductVisualizer: React.FC<{
    setControlsDisabled: (isEnabled: boolean) => void;
}> = ({ setControlsDisabled }) => {
    const global = useContext(GlobalContext);

    const updateCrossProduct = () => {
        setCrossProduct(new THREE.Vector3().crossVectors(vecA, vecB));
    };

    if (!global) return null;
    const {
        crossVecA: vecA,
        crossVecB: vecB,
        setCrossVecA: setVecA,
        setCrossVecB: setVecB,
        crossProduct,
        setCrossProduct,
    } = global;

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
                    updateCrossProduct();
                }}
                isDraggingEnabled={true}
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
                    updateCrossProduct();
                }}
                isDraggingEnabled={true}
                setControlsDisabled={setControlsDisabled}
            />
            <Vector
                vector={crossProduct}
                color="cyan"
                label="Cross Product"
                additionalInfo={`${crossProduct.x.toFixed(
                    2
                )}, ${crossProduct.y.toFixed(2)}, ${crossProduct.z.toFixed(2)}`}
                onDrag={() => {}}
                isDraggingEnabled={false}
                setControlsDisabled={setControlsDisabled}
            />
        </>
    );
};

export default CrossProductVisualizer;
