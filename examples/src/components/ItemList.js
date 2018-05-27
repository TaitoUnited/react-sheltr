import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { SharedElement } from 'react-sheltr';

class ItemList extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    sheltr: PropTypes.object,
  };

  static defaultProps = {
    items: [],
  };

  render() {
    const { items, match } = this.props;

    return (
      <Wrapper>
        {items.map(item => {
          return (
            <SharedElement sharedId={item.id}>
              {({ onClick, ...rest }) => (
                <Item
                  key={item.id}
                  onClick={onClick}
                  to={`${match.url}/${item.id}`}
                >
                  <Thumbnail {...rest} src={item.image} />
                  <ItemContent>
                    <Title>{item.title}</Title>
                    <Text>{item.text.substring(0, 40)}...</Text>
                  </ItemContent>
                </Item>
              )}
            </SharedElement>
          );
        })}
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Item = styled(Link)`
  display: flex;
  flex-direction: row;
  padding: 16px;
  border-bottom: 1px solid #eee;
  text-decoration: none;

  &:active {
    background-color: #f5f5f5;
  }
`;

const Thumbnail = styled.img`
  width: 120px;
  height: 90px;
  background: #eee;

  @media screen and (max-width: 600px) {
    width: 80px;
    height: 60px;
  }
`;

// const ThumbnailRect = styled.div`
//   width: 90px;
//   height: 90px;
//   background-image: url(${props => props.src});
//   background-position: center center;
//   background-size: cover;

//   @media screen and (max-width: 600px) {
//     width: 80px;
//     height: 60px;
//   }
// `;

const ItemContent = styled.div`
  flex: 1;
  margin-left: 16px;
`;

const Title = styled.h2`
  margin: 0px 0px 8px 0px;
  font-size: 20px;
  color: #222;

  @media screen and (max-width: 600px) {
    font-size: 18px;
  }
`;

const Text = styled.span`
  font-size: 16px;
  color: #444;
`;

// export default withSheltr(ItemList);
export default ItemList;
