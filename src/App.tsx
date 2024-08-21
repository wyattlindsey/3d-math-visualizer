import React from 'react';
import styled from 'styled-components';
import Scene from './Scene'; // Assuming Scene.tsx contains your 3D visualization
import Equations from './Equations'; // Component for equations
import { GlobalProvider } from './GlobalContext';
import ViewControls from './ViewControls';

const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;

    @media (max-width: 800px) {
        flex-direction: column;
    }
`;

const VisualizationSection = styled.div`
    flex: 3; /* Increase the flex ratio to give more space to the visualizer */
    min-width: 50%;
    background-color: #1e1e1e;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    @media (max-width: 800px) {
        flex: none;
        min-width: 100%;
        height: 70vh; /* Increase height to ensure visualizer has more space */
    }
`;

const EquationsSection = styled.div`
    padding: 20px;
    background-color: #f5f5f5;
    color: #333;
    font-family: Arial, sans-serif;
    overflow: hidden;

    @media (max-width: 800px) {
        min-width: 100%;
        max-width: 100%;
        padding: 10px;
        font-size: 0.9em;
        height: 30vh; /* Reduce height to give more room to the visualizer */
    }
`;

const App: React.FC = () => {
    return (
        <AppContainer>
            <GlobalProvider>
                <ViewControls />
                <VisualizationSection>
                    <Scene />
                </VisualizationSection>
                <EquationsSection>
                    <Equations />
                </EquationsSection>
            </GlobalProvider>
        </AppContainer>
    );
};

export default App;
