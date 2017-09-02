import React from 'react';
import styled from 'styled-components';
import oc from 'open-color'

const Wrapper = styled.div`
  height: 4rem;
  background: ${oc.orange[6]};
  border-bottom: 2px solid ${oc.orange[8]};

  color: white;
  font-weight: 500;
  font-size: 1.5rem;

  display: flex;
  /*flex-direction: column;*/
  align-items: center;
  justify-content: center;
`;

const Header = () => {
  return (
    <Wrapper>
      주소록
    </Wrapper>
  )
}

export default Header
