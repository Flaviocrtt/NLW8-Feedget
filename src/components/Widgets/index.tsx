import React, {useRef} from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { ChatTeardropDots } from 'phosphor-react-native';
import { TouchableOpacity, View } from 'react-native';
import { theme } from '../../theme';
import { styles } from './styles';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import { Options } from '../Options';

function Widgets() {
  const bottomSheetRef = useRef <BottomSheet>(null);

  function handleOpen(){
    bottomSheetRef.current?.expand();
  }
  return (
    <>
      <TouchableOpacity 
        style={styles.button}
        onPress={handleOpen}
      >
        <ChatTeardropDots 
        size={24} 
        weight="bold" 
        color={theme.colors.text_on_brand_color}

        />
      </TouchableOpacity>

      <BottomSheet 
        ref={bottomSheetRef}
        snapPoints={[1,280]}
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
      >
        <Options/>
      </BottomSheet>
    </>
  );
}

export default gestureHandlerRootHOC(Widgets);

/*

expo-app-loading is deprecated in favor of expo-splash-screen: use SplashScreen.preventAutoHideAsync() and SplashScren.hideAsync() instead. https://docs.expo.dev/versions/latest/sdk/splash-screen/
*/