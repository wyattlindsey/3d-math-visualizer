import React, { useContext } from 'react';
import styled from 'styled-components';
import { DimensionMode, GlobalContext, ViewMode } from './GlobalContext';

const ViewControls = () => {
    const global = useContext(GlobalContext);

    if (!global) return null;

    const { dimensionMode, setDimensionMode, setViewMode, viewMode } = global;

    return (
        <Container>
            <Instructions>
                <Paragraph>
                    Drag the handles to see the effect of moving a vector
                </Paragraph>
                {dimensionMode === DimensionMode['3D'] && (
                    <Paragraph>Click and drag to rotate the view.</Paragraph>
                )}
                {dimensionMode === DimensionMode['3D'] && (
                    <Paragraph>Scroll to zoom in and out.</Paragraph>
                )}
            </Instructions>

            <ControlsWrapper>
                <DimensionSwitch>
                    <input
                        type="radio"
                        id="3D"
                        name="dimension"
                        checked={dimensionMode === DimensionMode['3D']}
                        onChange={() => setDimensionMode(DimensionMode['3D'])}
                    />
                    <label htmlFor="3D">3D</label>
                    <input
                        type="radio"
                        id="2D"
                        name="dimension"
                        checked={dimensionMode === DimensionMode['2D']}
                        onChange={() => setDimensionMode(DimensionMode['2D'])}
                    />
                    <label htmlFor="2D">2D</label>
                </DimensionSwitch>
                <VisualizerSwitch>
                    <input
                        type="radio"
                        id="dot"
                        name="product"
                        checked={viewMode === ViewMode.DotProduct}
                        onChange={() => setViewMode(ViewMode.DotProduct)}
                    />
                    <label htmlFor="dot">Dot Product</label>
                    <input
                        type="radio"
                        id="cross"
                        name="product"
                        checked={viewMode === ViewMode.CrossProduct}
                        onChange={() => setViewMode(ViewMode.CrossProduct)}
                    />
                    <label htmlFor="cross">Cross Product</label>
                </VisualizerSwitch>
            </ControlsWrapper>
        </Container>
    );
};

export default ViewControls;

const Container = styled.div`
    display: flex;
    flex-direction: row;
    background-color: #f5f5f5;
    color: #333;
    font-family: Arial, sans-serif;
    font-size: 1.2em;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    margin: 20px;
`;

const Instructions = styled.div`
    margin-bottom: 20px;
    width: 100%;
`;

const Paragraph = styled.p`
    margin: 5px 0;
`;

const ControlsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: flex-end;
`;

const VisualizerSwitch = styled.div`
    display: flex;
    flex-direction: column;

    input {
        display: none;
    }

    label {
        background-color: #e0e0e0;
        color: #333;
        padding: 10px 20px;
        border-radius: 5px;
        margin: 5px;
        cursor: pointer;
        width: 100%;
        text-align: center;
    }

    input:checked + label {
        background-color: #333;
        color: #e0e0e0;
    }
`;

const DimensionSwitch = styled(VisualizerSwitch)`
    margin-right: 64px;
`;
