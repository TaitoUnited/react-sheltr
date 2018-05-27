import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SharedElement } from './Sheltr';

const propTypes = {
  hideImage: PropTypes.func.isRequired,
  image: PropTypes.shape({
    id: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
  }).isRequired,
};

const GalleryItem = ({ image, hideImage }) => (
  <Wrapper onClick={hideImage}>
    <SharedElement sharedId={image.id} startOnUnmount completeOnUnmount>
      {sheltrProps => <Img src={image.src} {...sheltrProps} />}
    </SharedElement>
  </Wrapper>
);

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 32px;
`;

const Img = styled.img`
  max-width: 100%;
  max-height: 90vh;
  height: auto;
`;

GalleryItem.propTypes = propTypes;

export default GalleryItem;
