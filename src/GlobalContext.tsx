import React, { createContext, useState } from 'react';
import * as THREE from 'three';

export enum ViewMode {
    DotProduct,
    CrossProduct,
}

export enum DimensionMode {
    '2D',
    '3D',
}

interface GlobalContextType {
    /* vectors */
    dotVecA: THREE.Vector3;
    setDotVecA: (vec: THREE.Vector3) => void;
    dotVecA2D: THREE.Vector2;
    setDotVecA2D: (vec: THREE.Vector2) => void;
    dotVecB: THREE.Vector3;
    setDotVecB: (vec: THREE.Vector3) => void;
    dotVecB2D: THREE.Vector2;
    setDotVecB2D: (vec: THREE.Vector2) => void;
    dotProduct: number;
    setDotProduct: (dotProduct: number) => void;
    dotProduct2D: number;
    setDotProduct2D: (dotProduct: number) => void;
    crossVecA: THREE.Vector3;
    setCrossVecA: (vec: THREE.Vector3) => void;
    crossVecA2D: THREE.Vector2;
    setCrossVecA2D: (vec: THREE.Vector2) => void;
    crossVecB: THREE.Vector3;
    setCrossVecB: (vec: THREE.Vector3) => void;
    crossVecB2D: THREE.Vector2;
    setCrossVecB2D: (vec: THREE.Vector2) => void;
    crossProduct: THREE.Vector3;
    setCrossProduct: (vec: THREE.Vector3) => void;
    crossProduct2D: number;
    setCrossProduct2D: (crossProduct: number) => void;

    /* app state */
    viewMode: ViewMode;
    setViewMode: (viewMode: ViewMode) => void;
    dimensionMode: DimensionMode;
    setDimensionMode: (dimensionMode: DimensionMode) => void;
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
    const [dotVecA2D, setDotVecA2D] = useState(
        new THREE.Vector2(dVecA.x, dVecA.y)
    );
    const [dotVecB2D, setDotVecB2D] = useState(
        new THREE.Vector2(dVecB.x, dVecB.y)
    );
    const [dotProduct, setDotProduct] = useState(dVecA.dot(dVecB));
    const [dotProduct2D, setDotProduct2D] = useState(
        dVecA.x * dVecB.x + dVecA.y * dVecB.y
    );
    const [crossVecA, setCrossVecA] = useState(cVecA);
    const [crossVecB, setCrossVecB] = useState(cVecB);
    const [crossVecA2D, setCrossVecA2D] = useState(
        new THREE.Vector2(cVecA.x, cVecA.y)
    );
    const [crossVecB2D, setCrossVecB2D] = useState(
        new THREE.Vector2(cVecB.x, cVecB.y)
    );
    const [crossProduct, setCrossProduct] = useState(
        new THREE.Vector3().crossVectors(cVecA, cVecB)
    );
    const [crossProduct2D, setCrossProduct2D] = useState(
        crossVecA2D.x * crossVecB2D.y - crossVecA2D.y * crossVecB2D.x
    );
    const [viewMode, setViewMode] = useState(ViewMode.DotProduct);
    const [dimensionMode, setDimensionMode] = useState(DimensionMode['3D']);

    const value = {
        dotVecA,
        setDotVecA: (a: THREE.Vector3) => setDotVecA(a),
        dotVecB,
        setDotVecB: (b: THREE.Vector3) => setDotVecB(b),
        dotVecA2D,
        setDotVecA2D: (a: THREE.Vector2) => setDotVecA2D(a),
        dotVecB2D,
        setDotVecB2D: (b: THREE.Vector2) => setDotVecB2D(b),
        dotProduct,
        setDotProduct: (dotProduct: number) => setDotProduct(dotProduct),
        dotProduct2D,
        setDotProduct2D: (dotProduct: number) => setDotProduct2D(dotProduct),
        crossVecA,
        setCrossVecA: (a: THREE.Vector3) => setCrossVecA(a),
        crossVecB,
        setCrossVecB: (b: THREE.Vector3) => setCrossVecB(b),
        crossVecA2D,
        setCrossVecA2D: (a: THREE.Vector2) => setCrossVecA2D(a),
        crossVecB2D,
        setCrossVecB2D: (b: THREE.Vector2) => setCrossVecB2D(b),
        crossProduct,
        setCrossProduct: (v: THREE.Vector3) => setCrossProduct(v),
        crossProduct2D,
        setCrossProduct2D: (crossProduct: number) =>
            setCrossProduct2D(crossProduct),
        viewMode,
        setViewMode: (viewMode: ViewMode) => setViewMode(viewMode),
        dimensionMode,
        setDimensionMode: (dimensionMode: DimensionMode) =>
            setDimensionMode(dimensionMode),
    };

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    );
};
