import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Line } from '@react-three/drei';
import DotProductVisualizer from './DotProductVisualizer';
import CrossProductVisualizer from './CrossProductVisualizer';
import {
  AppContainer,
  SceneWrapper,
  VisualizationContainer,
} from './AppContainer';

const Scene: React.FC = () => {
  return (
    <AppContainer>
      <SceneWrapper>
        <VisualizationContainer>
          <Canvas>
            <PerspectiveCamera makeDefault position={[5, 5, 5]} />
            <OrbitControls />
            <ambientLight intensity={0.5} />
            <directionalLight position={[0, 10, 5]} intensity={1} />
            <Line
              points={[
                [0, 0, 0],
                [5, 0, 0],
              ]}
              color="red"
              lineWidth={2}
            />
            <Line
              points={[
                [0, 0, 0],
                [0, 5, 0],
              ]}
              color="green"
              lineWidth={2}
            />
            <Line
              points={[
                [0, 0, 0],
                [0, 0, 5],
              ]}
              color="blue"
              lineWidth={2}
            />
            <DotProductVisualizer />
          </Canvas>
        </VisualizationContainer>
        <VisualizationContainer>
          <Canvas>
            <PerspectiveCamera makeDefault position={[5, 5, 5]} />
            <OrbitControls />
            <ambientLight intensity={0.5} />
            <directionalLight position={[0, 10, 5]} intensity={1} />
            <Line
              points={[
                [0, 0, 0],
                [5, 0, 0],
              ]}
              color="red"
              lineWidth={2}
            />
            <Line
              points={[
                [0, 0, 0],
                [0, 5, 0],
              ]}
              color="green"
              lineWidth={2}
            />
            <Line
              points={[
                [0, 0, 0],
                [0, 0, 5],
              ]}
              color="blue"
              lineWidth={2}
            />
            <CrossProductVisualizer />
          </Canvas>
        </VisualizationContainer>
      </SceneWrapper>
    </AppContainer>
  );
};

export default Scene;
