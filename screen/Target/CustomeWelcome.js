import {ImageBackground, ActivityIndicator} from 'react-native';
import React from 'react';
import {useEffect} from 'react';

const CustomeWelcome = props => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (props.onWelcomeComplete) {
        props.onWelcomeComplete();
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [props.onWelcomeComplete]);

  return (
    <ImageBackground
      source={require('../../assets/img/Slice1.jpg')}
      style={{width: '100%', height: '100%', justifyContent: 'center'}}>
      <ActivityIndicator color="gold" size="large" />
    </ImageBackground>
  );
};

export default CustomeWelcome;
