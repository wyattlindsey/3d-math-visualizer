import styled from 'styled-components';

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: #1e1e1e; /* Dark background */
  color: #e0e0e0; /* Light text color */
`;

export const SceneWrapper = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
`;

export const VisualizationContainer = styled.div`
  flex: 1 1 45%;
  min-width: 300px;
  height: 400px;
  background: #2e2e2e; /* Darker container background */
  margin: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3); /* Darker shadow */
  padding: 10px;
  position: relative;
  color: #ffffff; /* White text color for better contrast */
`;
