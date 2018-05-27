import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};

const SheltrExamples = ({ match }) => (
  <Wrapper>
    <ExampleItem to={`${match.url}/list`}>Simple List</ExampleItem>
    <ExampleItem to={`${match.url}/gallery`}>Image Gallery</ExampleItem>
  </Wrapper>
);

const Wrapper = styled.div`
  padding: 8px;
  display: flex;
  flex-wrap: wrap;
`;

const ExampleItem = styled(Link)`
  flex: 1;
  padding: 40px 0px;
  margin: 8px;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  text-transform: uppercase;
  text-decoration: none;
  font-weight: 700;
  color: #637381;

  @media screen and (max-width: 600px) {
    flex: 100%;
    max-width: 100%;
  }
`;

SheltrExamples.propTypes = propTypes;

export default SheltrExamples;
