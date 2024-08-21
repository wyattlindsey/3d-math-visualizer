import React, { useContext, useState } from 'react';
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
import { DimensionMode, GlobalContext, ViewMode } from './GlobalContext';
import DotProduct2DVisualizer from './DotProductVisualizer2D';
import CrossProduct2DVisualizer from './CrossProductVisualizer2D';

const Scene: React.FC = () => {
    const global = useContext(GlobalContext);
    const [controlsDisabled, setControlsDisabled] = useState(false);

    if (!global) return null;

    const { dimensionMode, viewMode } = global;

    return (
        <AppContainer>
            <SceneWrapper>
                {viewMode === ViewMode.DotProduct &&
                    dimensionMode === DimensionMode['3D'] && (
                        <VisualizationContainer>
                            <Canvas>
                                <PerspectiveCamera
                                    makeDefault
                                    position={[5, 5, 5]}
                                />
                                <OrbitControls enabled={!controlsDisabled} />
                                <ambientLight intensity={0.5} />
                                <directionalLight
                                    position={[0, 10, 5]}
                                    intensity={1}
                                />

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
                                    <DotProductVisualizer
                                        setControlsDisabled={
                                            setControlsDisabled
                                        }
                                    />
                                </PlaneProvider>
                            </Canvas>
                        </VisualizationContainer>
                    )}

                {viewMode === ViewMode.CrossProduct &&
                    dimensionMode === DimensionMode['3D'] && (
                        <VisualizationContainer>
                            <Canvas>
                                <PerspectiveCamera
                                    makeDefault
                                    position={[5, 5, 5]}
                                />
                                <OrbitControls enabled={!controlsDisabled} />
                                <ambientLight intensity={0.5} />
                                <directionalLight
                                    position={[0, 10, 5]}
                                    intensity={1}
                                />

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
                                        setControlsDisabled={
                                            setControlsDisabled
                                        }
                                    />
                                </PlaneProvider>
                            </Canvas>
                        </VisualizationContainer>
                    )}

                {viewMode === ViewMode.DotProduct &&
                    dimensionMode === DimensionMode['2D'] && (
                        <DotProduct2DVisualizer />
                    )}
                {viewMode === ViewMode.CrossProduct &&
                    dimensionMode === DimensionMode['2D'] && (
                        <CrossProduct2DVisualizer />
                    )}
            </SceneWrapper>
        </AppContainer>
    );
};

export default Scene;
