import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const propTypes = {
  something: PropTypes.any,
};

const Playground = () => (
  <Wrapper>
    <Heading>Playground</Heading>
    <Link to="/shared-element-transitions">Shared Element Transitions</Link>
  </Wrapper>
);

const Wrapper = styled.div`
  flex: 1;
  padding: 16px;
`;

const Heading = styled.h1`
  margin-top: 0px;
  font-size: 32px;
`;

Playground.propTypes = propTypes;

export default Playground;
