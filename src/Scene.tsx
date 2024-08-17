import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Line } from '@react-three/drei';
import DotProductVisualizer from './DotProductVisualizer';
import CrossProductVisualizer from './CrossProductVisualizer';
import {
  AppContainer,
  SceneWrapper,
  VisualizationContainer,
} from './AppContainer';
import { PlaneProvider } from './PlaneContext';

const Scene: React.FC = () => {
  const [controlsDisabled, setControlsDisabled] = useState(false);

  return (
    <AppContainer>
      <SceneWrapper>
        <VisualizationContainer>
          <Canvas>
            <PerspectiveCamera makeDefault position={[5, 5, 5]} />
            <OrbitControls enabled={!controlsDisabled} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[0, 10, 5]} intensity={1} />

            {/* First Visualizer */}
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
            <PlaneProvider>
              <DotProductVisualizer setControlsDisabled={setControlsDisabled} />
            </PlaneProvider>
          </Canvas>
        </VisualizationContainer>

        <VisualizationContainer>
          <Canvas>
            <PerspectiveCamera makeDefault position={[5, 5, 5]} />
            <OrbitControls enabled={!controlsDisabled} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[0, 10, 5]} intensity={1} />

            {/* Second Visualizer */}
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
            <PlaneProvider>
              <CrossProductVisualizer
                setControlsDisabled={setControlsDisabled}
              />
            </PlaneProvider>
          </Canvas>
        </VisualizationContainer>
      </SceneWrapper>
    </AppContainer>
  );
};

export default Scene;
