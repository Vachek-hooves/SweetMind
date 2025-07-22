import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const FavoriteButton = ({ isFavorite, onPress, isQuoteCard }) => {
    return (
        <TouchableOpacity
          style={[styles.iconButton, isFavorite && styles.iconButtonActive]}
          onPress={onPress}>
          <Icon
            name="thumbs-up"
            size={24}
            color={isFavorite ? 'rgba(255, 104, 168, 1)' : '#fff'}
          />
        </TouchableOpacity>
      );
}

export default FavoriteButton

const styles = StyleSheet.create({
  
      iconButton: {
      padding: 8,
      marginHorizontal: 5,
      borderWidth: 1,
      borderRadius: 12,
      paddingHorizontal: 22,
      borderColor: '#fff',
    },
    iconButtonActive: {
      backgroundColor: '#fff',
      borderColor: '#fff',
    },
  });