import React from 'react';
import styled from 'styled-components';

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
`;

const formatNumber = (num: number) =>
  num % 1 === 0 ? num.toFixed(0) : num.toFixed(1);

const Equations: React.FC = () => {
  // Example vectors
  const vecA = { x: 1, y: 2, z: 3 };
  const vecB = { x: 4, y: 5, z: 6 };

  const dotProduct = vecA.x * vecB.x + vecA.y * vecB.y + vecA.z * vecB.z;

  const crossProduct = {
    x: vecA.y * vecB.z - vecA.z * vecB.y,
    y: vecA.z * vecB.x - vecA.x * vecB.z,
    z: vecA.x * vecB.y - vecA.y * vecB.x,
  };

  return (
    <div>
      <h2>Dot Product Equation</h2>
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
          <ColorText color="black">{dotProduct}</ColorText>
        </EquationRow>
        <EquationRow>
          <ColorText color="orange">{formatNumber(vecA.x)}</ColorText>
          <span>*</span>
          <ColorText color="purple">{formatNumber(vecB.x)}</ColorText>
          <span>+</span>
          <ColorText color="orange">{formatNumber(vecA.y)}</ColorText>
          <span>*</span>
          <ColorText color="purple">{formatNumber(vecB.y)}</ColorText>
          <span>+</span>
          <ColorText color="orange">{formatNumber(vecA.z)}</ColorText>
          <span>*</span>
          <ColorText color="purple">{formatNumber(vecB.z)}</ColorText>
          <span>=</span>
          <ColorText color="black">{dotProduct}</ColorText>
        </EquationRow>
      </EquationContainer>

      <h2>Cross Product Equation</h2>
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
          <span>(</span>
          <ColorText color="cyan">{crossProduct.x}</ColorText>
          <span>,</span>
          <ColorText color="cyan">{crossProduct.y}</ColorText>
          <span>,</span>
          <ColorText color="cyan">{crossProduct.z}</ColorText>
          <span>)</span>
        </EquationRow>
        <EquationRow>
          <ColorText color="orange">{formatNumber(vecA.y)}</ColorText>
          <span>*</span>
          <ColorText color="purple">{formatNumber(vecB.z)}</ColorText>
          <span>-</span>
          <ColorText color="orange">{formatNumber(vecA.z)}</ColorText>
          <span>*</span>
          <ColorText color="purple">{formatNumber(vecB.y)}</ColorText>
          <span>,</span>
          <ColorText color="orange">{formatNumber(vecA.z)}</ColorText>
          <span>*</span>
          <ColorText color="purple">{formatNumber(vecB.x)}</ColorText>
          <span>-</span>
          <ColorText color="orange">{formatNumber(vecA.x)}</ColorText>
          <span>*</span>
          <ColorText color="purple">{formatNumber(vecB.z)}</ColorText>
          <span>,</span>
          <ColorText color="orange">{formatNumber(vecA.x)}</ColorText>
          <span>*</span>
          <ColorText color="purple">{formatNumber(vecB.y)}</ColorText>
          <span>-</span>
          <ColorText color="orange">{formatNumber(vecA.y)}</ColorText>
          <span>*</span>
          <ColorText color="purple">{formatNumber(vecB.x)}</ColorText>
          <span>=</span>
          <span>(</span>
          <ColorText color="cyan">{crossProduct.x}</ColorText>
          <span>,</span>
          <ColorText color="cyan">{formatNumber(crossProduct.y)}</ColorText>
          <span>,</span>
          <ColorText color="cyan">{formatNumber(crossProduct.z)}</ColorText>
          <span>)</span>
        </EquationRow>
      </EquationContainer>
    </div>
  );
};

export default Equations;
