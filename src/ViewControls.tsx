import React, { useContext } from 'react';
import styled from 'styled-components';
import { GlobalContext, ViewMode } from './GlobalContext';

const ViewControls = () => {
    const global = useContext(GlobalContext);

    if (!global) return null;

    const { setViewMode, viewMode } = global;

    return (
        <Container>
            <Instructions>
                <h2>View Controls</h2>
                <Paragraph>Click and drag to rotate the view.</Paragraph>
                <Paragraph>Scroll to zoom in and out.</Paragraph>
            </Instructions>
            <Switch>
                <input
                    type="radio"
                    id="dot"
                    name="product"
                    checked={viewMode === ViewMode.DotProduct}
                    onChange={() => setViewMode(ViewMode.DotProduct)}
                    value="dot"
                />
                <label htmlFor="dot">Dot Product</label>
                <input
                    type="radio"
                    id="cross"
                    name="product"
                    checked={viewMode === ViewMode.CrossProduct}
                    onChange={() => setViewMode(ViewMode.CrossProduct)}
                    value="cross"
                />
                <label htmlFor="cross">Cross Product</label>
            </Switch>
        </Container>
    );
};

export default ViewControls;

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: space-between;
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
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 20px;
`;

const Paragraph = styled.p`
    margin: 5px 0;
`;

const Switch = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-left: auto;

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
