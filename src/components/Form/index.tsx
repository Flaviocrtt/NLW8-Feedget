import React, { useState } from 'react';
import { View, Text, Image} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { ArrowLeft } from 'phosphor-react-native';
import { captureScreen } from 'react-native-view-shot';

import { theme } from '../../theme';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { ScreenshotButton } from '../ScreenshotButton';
import { SendButton } from '../SendButton';
import { FeedbackType } from '../Widgets';
import { styles } from './styles';
import { api } from '../../libs/api';

import {FileInfo, readAsStringAsync} from 'expo-file-system'

interface FormProps{
	feedbackType: FeedbackType;
	onFeedbackSent: () => void;
	onFeedbackCanceled: () => void;
}

export function Form({feedbackType, onFeedbackSent, onFeedbackCanceled: onFeedbackCanceled}: FormProps) {

	const [screenshot, setScreenshot] = useState<string | null>(null);
	const [isSendingFeedback, setisSendingFeedback ] = useState(false);
	const [comment, setComment] = useState('');

	function handleScreenshot(){
		captureScreen({
			format: 'jpg',
			quality:0.7
		})
		.then(uri => setScreenshot(uri))
		.catch(error => console.log(error));
	}

	function handleScreenshotRemove(){
		setScreenshot(null);
	}

	async function handleSendFeedback(){
		if(isSendingFeedback){
			return;
		}

		setisSendingFeedback(true);

		const base64string = screenshot && await readAsStringAsync(screenshot, {encoding:'base64'})

		try {
			await api.post('/feedbacks', {
				type:feedbackType,
				comment,
				screenshot: `data:image/png;base64,${base64string}`
			});

			onFeedbackSent();

		} catch (error) {
			console.log(error);
			setisSendingFeedback(false);
		}
	}

	const feedbackTypeInfo = feedbackTypes[feedbackType];
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity onPress={onFeedbackCanceled}>
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
				onChangeText={setComment}
				style={styles.input}
				placeholder="Digite oque está acontecendo"
				placeholderTextColor={theme.colors.surface_secondary}
			/>

			<View style={styles.footer}>
				<ScreenshotButton
				onTakeShot={handleScreenshot}
				onRemoveShot={handleScreenshotRemove}
				screenshot={screenshot}
				/>

				<SendButton sendFeedback={handleSendFeedback} isLoading={isSendingFeedback}/>
			
			</View>
		</View>
	);
}