import React, { Component } from 'react';
import styled from 'styled-components';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import Playground from './components/Playground';
import SheltrExamples from './components/sheltr';

const NavControls = () => (
  <Route
    path="/"
    exact
    children={({ match, history }) =>
      match ? null : (
        <NavControlsWrapper>
          <Link to="/">
            <ButtonLink>Home</ButtonLink>
          </Link>
          <div style={{ width: 16 }} />
          <ButtonLink onClick={history.goBack}>Back</ButtonLink>
        </NavControlsWrapper>
      )
    }
  />
);

class App extends Component {
  render() {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Wrapper>
          <NavControls />
          <Content>
            <Route exact path="/" component={Playground} />
            <Route path="/shared-element-transitions" component={SheltrExamples} />
          </Content>
        </Wrapper>
      </BrowserRouter>
    );
  }
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100%;
  min-height: 100vh;
  padding: 32px 0px;
  background-color: #dfe3e8;
`;

const Content = styled.div`
  max-width: 800px;
  background-color: #fff;
  margin: 0px auto;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  position: relative;
`;

const NavControlsWrapper = styled.div`
  max-width: 800px;
  margin: 0px auto 16px auto;
  display: flex;
`;

const ButtonLink = styled.button`
  color: #637381;
  border-radius: 999px;
  background-color: #fff;
  border: none;
  height: 40px;
  padding: 0px 24px;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.1);
  font-weight: 700;
`;

export default App;
