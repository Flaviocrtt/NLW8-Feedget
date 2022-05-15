import { ArrowLeft } from 'phosphor-react-native';
import React from 'react';
import { View, Text, Image} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { theme } from '../../theme';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { ScreenshotButton } from '../ScreenshotButton';
import { SendButton } from '../SendButton';
import { FeedbackType } from '../Widgets';
import { styles } from './styles';

interface FormProps{
  feedbackType: FeedbackType;
}

export function Form({feedbackType}: FormProps) {

  const feedbackTypeInfo = feedbackTypes[feedbackType];
  return (
    <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity>
            <ArrowLeft
            size={24}
            weight='bold'
            color={theme.colors.text_secondary}
            />
          </TouchableOpacity>

          <View style={styles.titleContainer}>
            <Image 
              style={styles.image}
              source={feedbackTypeInfo.image}
            />
            <Text style={styles.titleText}> 
              {feedbackTypeInfo.title}
            </Text>
          </View>

        </View>

        <TextInput
        multiline
        style={styles.input}
        placeholder="Digite oque está acontecendo"
        placeholderTextColor={theme.colors.surface_secondary}
        />

        <View style={styles.footer}>
          <ScreenshotButton
          onTakeShot={() => {}}
          onRemoveShot={() => {}}
          screenshot=""
        />

        <SendButton isLoading={false}/>
		
      </View>
    </View>
  );
}