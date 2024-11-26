import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';

export const formatTime = seconds => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const useTimer = (taskTimer, setTaskTimer) => {
  useEffect(() => {
    let timer;
    if (taskTimer.isActive && taskTimer.timeLeft > 0) {
      timer = setInterval(() => {
        setTaskTimer(prev => ({...prev, timeLeft: prev.timeLeft - 1}));
      }, 1000);
    } else if (taskTimer.timeLeft === 0) {
      setTaskTimer(prev => ({...prev, isActive: false, taskContent: null}));
    }

    return () => clearInterval(timer);
  }, [taskTimer.isActive, taskTimer.timeLeft]);
};