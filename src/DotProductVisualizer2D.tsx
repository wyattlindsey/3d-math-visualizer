import React, { useState, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrthographicCamera, Line, Text } from '@react-three/drei';
import * as THREE from 'three';
import DraggableHandle2D from './DraggableHandle2D';

const DotProduct2DVisualizer = () => {
    const [vecA, setVecA] = useState(new THREE.Vector2(1, 2));
    const [vecB, setVecB] = useState(new THREE.Vector2(3, 1));

    const dotProduct = useMemo(() => {
        return vecA.dot(vecB);
    }, [vecA, vecB]);

    const handleDrag = (
        event: { point: { x: any; y: any } },
        setVector: {
            (value: React.SetStateAction<THREE.Vector2>): void;
            (value: React.SetStateAction<THREE.Vector2>): void;
            (arg0: THREE.Vector2): void;
        }
    ) => {
        const { x, y } = event.point;
        setVector(new THREE.Vector2(x, y));
    };

    return (
        <Canvas>
            <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={100} />
            <gridHelper args={[10, 10, `gray`, `gray`]} />
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
                onDrag={(event: { point: { x: number; y: number } }) =>
                    handleDrag(event, setVecA)
                }
                color="orange"
            />
            <DraggableHandle2D
                position={new THREE.Vector3(vecB.x, vecB.y, 0)}
                onDrag={(event: { point: { x: number; y: number } }) =>
                    handleDrag(event, setVecB)
                }
                color="purple"
            />
            <Text
                position={new THREE.Vector3(0, -1, 0)}
                fontSize={0.5}
                color="white"
                anchorX="center"
                anchorY="middle"
            >
                Dot Product: {dotProduct.toFixed(1)}
            </Text>
        </Canvas>
    );
};

export default DotProduct2DVisualizer;
