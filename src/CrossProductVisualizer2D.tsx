import React, { useState, useMemo, useEffect, useContext } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrthographicCamera, Line, Text } from '@react-three/drei';
import * as THREE from 'three';
import DraggableHandle2D from './DraggableHandle2D';
import { GlobalContext } from './GlobalContext';

const CrossProduct2DVisualizer = () => {
    const [vecA, setVecA] = useState(new THREE.Vector2(1, 2));
    const [vecB, setVecB] = useState(new THREE.Vector2(3, 1));

    const global = useContext(GlobalContext);

    const crossProduct = useMemo(() => {
        return vecA.x * vecB.y - vecA.y * vecB.x;
    }, [vecA, vecB]);

    useEffect(() => {
        global?.setCrossVecA2D(vecA);
        global?.setCrossVecB2D(vecB);
        global?.setCrossProduct2D(crossProduct);
    }, [global, vecA, vecB]);

    const handleDrag = (
        event: { point: { x: number; y: number } },
        setVector: React.Dispatch<React.SetStateAction<THREE.Vector2>>
    ) => {
        const { x, y } = event.point;
        setVector(new THREE.Vector2(x, y));
    };

    return (
        <Canvas>
            <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={100} />
            <gridHelper args={[10, 10, 'gray', 'gray']} />
            <Line
                points={[
                    [0, 0],
                    [vecA.x, vecA.y],
                ]}
                color="orange"
                lineWidth={2}
            />
            <Line
                points={[
                    [0, 0],
                    [vecB.x, vecB.y],
                ]}
                color="purple"
                lineWidth={2}
            />
            <DraggableHandle2D
                position={new THREE.Vector3(vecA.x, vecA.y, 0)}
                onDrag={event => handleDrag(event, setVecA)}
                color="orange"
            />
            <DraggableHandle2D
                position={new THREE.Vector3(vecB.x, vecB.y, 0)}
                onDrag={event => handleDrag(event, setVecB)}
                color="purple"
            />
            {/* Visualize the cross product as a line extending in the Z-axis */}
            <Line
                points={[
                    [0, 0, 0],
                    [0, 0, crossProduct],
                ]}
                color="cyan"
                lineWidth={2}
            />
            <Text
                position={new THREE.Vector3(0, -1, 0)}
                fontSize={0.5}
                color="white"
                anchorX="center"
                anchorY="middle"
            >
                Cross Product: {crossProduct.toFixed(1)}
            </Text>
        </Canvas>
    );
};

export default CrossProduct2DVisualizer;
