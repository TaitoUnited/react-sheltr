import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const propTypes = {
  something: PropTypes.any,
};

const MusicPlayer = ({ tracks, currentTrack, selectTrack }) => (
  <Wrapper>
    <Playlist tracks={tracks} onTrackSelect={selectTrack} />
    <TrackControls track={currentTrack} />
  </Wrapper>
);

const Wrapper = styled.div`

`;

MusicPlayer.propTypes = propTypes;

export default MusicPlayer;
