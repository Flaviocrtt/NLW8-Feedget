import React from 'react';
import { Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';

import { styles } from './styles';

interface SendButtonProps{
    isLoading: boolean;
}
export function SendButton({ isLoading, ...rest }: SendButtonProps) {
  return (
    <TouchableOpacity 
    style={styles.container}
    {...rest}
    >
        {
            isLoading?
            <ActivityIndicator color={theme.colors.text_on_brand_color}/>
            :
            <Text style={styles.texto}>
                Enviar feedback
            </Text>
        }

    </TouchableOpacity>
  );
}