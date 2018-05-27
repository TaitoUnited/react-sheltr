import React, { Component } from 'react';
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';
import Sheltr from 'react-sheltr';

import ItemList from './ItemList';
import ItemDetails from './ItemDetails';
import Gallery from './Gallery';
import ExamplesList from './ExamplesList';

class SheltrExamples extends Component {
  state = {
    items: [
      {
        id: 'item_1',
        title: 'Flip with the new React Context API!',
        text:
          'Market metrics growth hacking product management gamification backing creative prototype return on investment. Ownership prototype venture termsheet strategy startup network effects. Iteration long tail ownership virality buzz burn rate release entrepreneur direct mailing seed round business-to-consumer network effects. Hypotheses assets virality android angel investor partnership innovator seed round marketing non-disclosure agreement creative twitter.',
        image: 'https://source.unsplash.com/NqReTJfnAT0/800x600',
      },
      {
        id: 'item_2',
        title: 'I think it is pretty neat :)',
        text:
          'Mass market launch party growth hacking traction social proof incubator iPhone alpha angel investor non-disclosure agreement channels graphical user interface seed money innovator. MVP virality low hanging fruit network effects. Paradigm shift beta partner network channels A/B testing return on investment pitch rockstar churn rate iPhone growth hacking responsive web design business-to-consumer prototype.',
        image: 'https://source.unsplash.com/B3xZzHI88Ik/800x600',
      },
      {
        id: 'item_3',
        title: 'I turned myself into a Flip, Morty!',
        text:
          'Incubator iteration rockstar alpha social proof stock stealth. Stock iPhone ecosystem monetization churn rate strategy ownership. First mover advantage graphical user interface beta equity infrastructure focus. Hypotheses success innovator vesting period crowdsource rockstar angel investor long tail social proof. Startup investor disruptive prototype interaction design founders equity direct mailing customer paradigm shift series A financing first mover advantage. Leverage facebook first mover advantage pivot entrepreneur disruptive research & development release growth hacking user experience creative freemium funding marketing. ',
        image: 'https://source.unsplash.com/sKn-Yy4BRtY/800x600',
      },
      {
        id: 'item_4',
        title: 'Wubba lubba dub dub!',
        text:
          'Accelerator hackathon ownership stealth responsive web design scrum project customer network effects metrics termsheet burn rate growth hacking influencer. Metrics first mover advantage handshake stealth disruptive value proposition founders niche market incubator beta user experience launch party venture market. Focus vesting period release partnership business model canvas user experience.',
        image: 'https://source.unsplash.com/Cegipir4rcI/800x600',
      },
    ],
    imagesByCol: [
      {
        id: 'col1',
        images: [
          { id: 'col1_img1', src: 'https://source.unsplash.com/J8Xk29918Kw' },
          { id: 'col1_img2', src: 'https://source.unsplash.com/Awcs6QfEr74' },
          { id: 'col1_img3', src: 'https://source.unsplash.com/OWsdJ-MllYA' },
          { id: 'col1_img4', src: 'https://source.unsplash.com/NqReTJfnAT0' },
        ],
      },
      {
        id: 'col2',
        images: [
          { id: 'col2_img1', src: 'https://source.unsplash.com/JdUlf2Q5_-o' },
          { id: 'col2_img2', src: 'https://source.unsplash.com/w7Z0fiZw4Mw' },
          { id: 'col2_img3', src: 'https://source.unsplash.com/vCS3buYs5EA' },
          { id: 'col2_img4', src: 'https://source.unsplash.com/SPmrJ2Zve6c' },
        ],
      },
      {
        id: 'col3',
        images: [
          { id: 'col3_img1', src: 'https://source.unsplash.com/9NS86KxBTAA' },
          { id: 'col3_img2', src: 'https://source.unsplash.com/hY5OUxg_Zgc' },
          { id: 'col3_img3', src: 'https://source.unsplash.com/0WAJhFK7Q9o' },
          { id: 'col3_img4', src: 'https://source.unsplash.com/urFw0pB8cgw' },
        ],
      },
    ],
  };

  getImage = (imagesByCol, id) => {
    let image;
    imagesByCol.forEach(({ images }) => {
      images.forEach(img => {
        if (img.id === id) image = img;
      })
    });
    return image;
  }

  render() {
    const { items, imagesByCol } = this.state;

    return (
      <Wrapper>
        <Sheltr delay={200}>
          <Switch>
            {/* Gallery example */}
            <Route
              path="/gallery"
              render={props => <Gallery {...props} images={imagesByCol} />}
            />

            {/* Item List example */}
            <Route
              path="/list/:id"
              render={({ match: { params }, ...rest }) => (
                <ItemDetails
                  {...rest}
                  item={items.find(i => i.id === params.id)}
                />
              )}
            />
            <Route
              path="/list"
              render={props => <ItemList {...props} items={items} />}
            />

            <Route component={ExamplesList} />
          </Switch>
        </Sheltr>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  flex: 1;
`;

export default SheltrExamples;
