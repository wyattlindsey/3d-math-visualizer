import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface DraggableHandle2DProps {
    position: THREE.Vector3;
    onDrag: (event: { point: { x: number; y: number } }) => void;
    color: string;
}

const DraggableHandle2D: React.FC<DraggableHandle2DProps> = ({
    position,
    onDrag,
    color,
}) => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.position.copy(position);
        }
    });

    const handlePointerDown = (event: any) => {
        event.stopPropagation();
        event.target.setPointerCapture(event.pointerId);
    };

    const handlePointerMove = (event: any) => {
        if (event.buttons === 1) {
            // Check if left mouse button is held down
            const x = event.unprojectedPoint.x;
            const y = event.unprojectedPoint.y;
            onDrag({ point: { x, y } });
        }
    };

    const handlePointerUp = (event: any) => {
        event.stopPropagation();
        event.target.releasePointerCapture(event.pointerId);
    };

    return (
        <mesh
            ref={meshRef}
            position={position}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
        >
            <circleGeometry args={[0.1, 32]} />
            <meshBasicMaterial color={color} />
        </mesh>
    );
};

export default DraggableHandle2D;
