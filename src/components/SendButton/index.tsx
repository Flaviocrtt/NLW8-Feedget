import React from 'react';
import { Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';

import { styles } from './styles';

interface SendButtonProps{
    isLoading: boolean;
    sendFeedback: () => void;
}
export function SendButton({ isLoading, sendFeedback, ...rest }: SendButtonProps) {
  return (
    <TouchableOpacity 
    onPress={sendFeedback}
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