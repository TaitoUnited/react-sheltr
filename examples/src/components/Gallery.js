import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SharedElement } from '@taito/react-sheltr';
import GalleryItem from './GalleryItem';

class Gallery extends Component {
  static propTypes = {
    images: PropTypes.array.isRequired,
  };

  state = {
    activeImage: null,
  };

  hideActiveImage = () => {
    this.setState({ activeImage: null });
  };

  render() {
    const { activeImage } = this.state;
    const { images } = this.props;

    return (
      <Wrapper>
        {images.map(col => (
          <Column key={col.id}>
            {col.images.map(img => (
              <SharedElement sharedId={img.id}>
                {({ onClick: sheltrClickHandler, ...otherSheltrProps }) => (
                  <Img
                    {...otherSheltrProps}
                    src={img.src}
                    key={img.id}
                    onClick={() => {
                      sheltrClickHandler();
                      this.setState({ activeImage: img });
                    }}
                  />
                )}
              </SharedElement>
            ))}
          </Column>
        ))}

        {activeImage && (
          <GalleryItem image={activeImage} hideImage={this.hideActiveImage} />
        )}
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

const Img = styled.img`
  margin-top: 8px;
  width: 100%;
  height: auto;
  background-color: #eee;
`;

export default Gallery;
