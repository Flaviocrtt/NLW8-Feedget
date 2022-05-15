import React from 'react';
import { View, Text} from 'react-native';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { Copyright } from '../Copyright';
import { Option } from '../Option';
import { FeedbackType } from '../Widgets'
import { styles } from './styles';

interface OptionsProps{
  onFeedbackTypeChanged: (feedbackTypeSelected: FeedbackType) => void;
}

export function Options({onFeedbackTypeChanged} : OptionsProps) {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Deixe seu feedback
      </Text>
      <View style={styles.options}>
        {Object.entries(feedbackTypes)
        .map(([key, value])=>(
          <Option 
            key={key}
            image={value.image}
            title={value.title}
            onPress={() => onFeedbackTypeChanged(key as FeedbackType)}
          />
        ))
}
      </View>
      <Copyright/>
    </View>
  );
}