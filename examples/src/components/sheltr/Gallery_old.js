import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { SharedElement } from './Sheltr';

class Gallery extends Component {
  static propTypes = {
    images: PropTypes.array.isRequired,
  };

  render() {
    const { images, match } = this.props;

    return (
      <Wrapper>
        {images.map(col => (
          <Column key={col.id}>
            {col.images.map(img => (
              <SharedElement sharedId={img.id} startOnClick>
                {({ id, onClick }) => (
                  <ImgWrapper
                    key={img.id}
                    to={`${match.url}/${img.id}`}
                    onClick={onClick}
                  >
                    <Img id={id} src={img.src} />
                  </ImgWrapper>
                )}
              </SharedElement>
            ))}
          </Column>
        ))}
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0 4px;
`;

const Column = styled.div`
  flex: 33.33%;
  max-width: 33.33%;
  padding: 0 4px;

  @media screen and (max-width: 800px) {
    flex: 50%;
    max-width: 50%;
  }

  @media screen and (max-width: 600px) {
    flex: 100%;
    max-width: 100%;
  }
`;

const ImgWrapper = styled(Link)`
  display: block;
  margin-top: 8px;
`;

const Img = styled.img`
  width: 100%;
  height: auto;
  background-color: #eee;
`;

export default Gallery;
