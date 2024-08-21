import React, { useContext } from 'react';
import styled from 'styled-components';
import { GlobalContext, ViewMode } from './GlobalContext';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

const EquationContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
`;

const EquationRow = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 5px;
    font-size: 1.2em;
`;

const ColorText = styled.span<{ color: string }>`
    color: ${props => props.color};
    margin: 0 5px;
    font-weight: bold;
`;

const Answer = styled.span`
    color: black;
    margin-left: 5px;
    font-weight: bold;
`;

const formatNumber = (num: number) =>
    num % 1 === 0 ? num.toFixed(0) : num.toFixed(1);

const Equations: React.FC = () => {
    const global = useContext(GlobalContext);
    if (!global) return null;

    const { dotVecA, dotVecB, crossVecA, crossVecB, viewMode } = global;

    const dotProduct =
        dotVecA.x * dotVecB.x + dotVecA.y * dotVecB.y + dotVecA.z * dotVecB.z;

    const crossProduct = {
        x: crossVecA.y * crossVecB.z - crossVecA.z * crossVecB.y,
        y: crossVecA.z * crossVecB.x - crossVecA.x * crossVecB.z,
        z: crossVecA.x * crossVecB.y - crossVecA.y * crossVecB.x,
    };

    return (
        <Container>
            {viewMode === ViewMode.DotProduct && (
                <>
                    <EquationContainer>
                        <EquationRow>
                            <ColorText color="orange">Aₓ</ColorText>
                            <span>*</span>
                            <ColorText color="purple">Bₓ</ColorText>
                            <span>+</span>
                            <ColorText color="orange">Aᵧ</ColorText>
                            <span>*</span>
                            <ColorText color="purple">Bᵧ</ColorText>
                            <span>+</span>
                            <ColorText color="orange">A𝓏</ColorText>
                            <span>*</span>
                            <ColorText color="purple">B𝓏</ColorText>
                            <span>=</span>
                            <ColorText color="black">Dot Product</ColorText>
                        </EquationRow>
                        <EquationRow>
                            <ColorText color="orange">
                                {formatNumber(dotVecA.x)}
                            </ColorText>
                            <span>*</span>
                            <ColorText color="purple">
                                {formatNumber(dotVecB.x)}
                            </ColorText>
                            <span>+</span>
                            <ColorText color="orange">
                                {formatNumber(dotVecA.y)}
                            </ColorText>
                            <span>*</span>
                            <ColorText color="purple">
                                {formatNumber(dotVecB.y)}
                            </ColorText>
                            <span>+</span>
                            <ColorText color="orange">
                                {formatNumber(dotVecA.z)}
                            </ColorText>
                            <span>*</span>
                            <ColorText color="purple">
                                {formatNumber(dotVecB.z)}
                            </ColorText>
                            <span>=</span>
                            <ColorText color="black">
                                {formatNumber(dotProduct)}
                            </ColorText>
                        </EquationRow>
                    </EquationContainer>
                </>
            )}

            {viewMode === ViewMode.CrossProduct && (
                <>
                    <EquationContainer>
                        <EquationRow>
                            <ColorText color="orange">Aᵧ</ColorText>
                            <span>*</span>
                            <ColorText color="purple">B𝓏</ColorText>
                            <span>-</span>
                            <ColorText color="orange">A𝓏</ColorText>
                            <span>*</span>
                            <ColorText color="purple">Bᵧ</ColorText>
                            <span>,</span>
                            <ColorText color="orange">A𝓏</ColorText>
                            <span>*</span>
                            <ColorText color="purple">Bₓ</ColorText>
                            <span>-</span>
                            <ColorText color="orange">Aₓ</ColorText>
                            <span>*</span>
                            <ColorText color="purple">B𝓏</ColorText>
                            <span>,</span>
                            <ColorText color="orange">Aₓ</ColorText>
                            <span>*</span>
                            <ColorText color="purple">Bᵧ</ColorText>
                            <span>-</span>
                            <ColorText color="orange">Aᵧ</ColorText>
                            <span>*</span>
                            <ColorText color="purple">Bₓ</ColorText>
                            <span>=</span>
                            <span> </span>
                            <Answer>{` Cross Product`}</Answer>
                        </EquationRow>
                        <EquationRow>
                            <ColorText color="orange">
                                {formatNumber(crossVecA.y)}
                            </ColorText>
                            <span>*</span>
                            <ColorText color="purple">
                                {formatNumber(crossVecB.z)}
                            </ColorText>
                            <span>-</span>
                            <ColorText color="orange">
                                {formatNumber(crossVecA.z)}
                            </ColorText>
                            <span>*</span>
                            <ColorText color="purple">
                                {formatNumber(crossVecB.y)}
                            </ColorText>
                            <span>,</span>
                            <ColorText color="orange">
                                {formatNumber(crossVecA.z)}
                            </ColorText>
                            <span>*</span>
                            <ColorText color="purple">
                                {formatNumber(crossVecB.x)}
                            </ColorText>
                            <span>-</span>
                            <ColorText color="orange">
                                {formatNumber(crossVecA.x)}
                            </ColorText>
                            <span>*</span>
                            <ColorText color="purple">
                                {formatNumber(crossVecB.z)}
                            </ColorText>
                            <span>,</span>
                            <ColorText color="orange">
                                {formatNumber(crossVecA.x)}
                            </ColorText>
                            <span>*</span>
                            <ColorText color="purple">
                                {formatNumber(crossVecB.y)}
                            </ColorText>
                            <span>-</span>
                            <ColorText color="orange">
                                {formatNumber(crossVecA.y)}
                            </ColorText>
                            <span>*</span>
                            <ColorText color="purple">
                                {formatNumber(crossVecB.x)}
                            </ColorText>
                            <span>=</span>
                            <Answer>
                                <span>(</span>
                                <ColorText color="black">
                                    {formatNumber(crossProduct.x)}
                                </ColorText>
                                <span>,</span>
                                <ColorText color="black">
                                    {formatNumber(crossProduct.y)}
                                </ColorText>
                                <span>,</span>
                                <ColorText color="black">
                                    {formatNumber(crossProduct.z)}
                                </ColorText>
                                <span>)</span>
                            </Answer>
                        </EquationRow>
                    </EquationContainer>
                </>
            )}
        </Container>
    );
};

export default Equations;
