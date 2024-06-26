import { useFonts } from 'expo-font';
import { Stack,SplashScreen } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';
import GlobalProvider from '../context/GlobalProvider'

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded, error] = useFonts({
    'PlayfairDisplay-Black': require('../assets/fonts/PlayfairDisplay-Black.ttf'),
    'PlayfairDisplay-BlackItalic': require('../assets/fonts/PlayfairDisplay-BlackItalic.ttf'),
    'PlayfairDisplay-Bold': require('../assets/fonts/PlayfairDisplay-Bold.ttf'),
    'PlayfairDisplay-BoldItalic': require('../assets/fonts/PlayfairDisplay-BoldItalic.ttf'),
    'PlayfairDisplay-ExtraBold': require('../assets/fonts/PlayfairDisplay-ExtraBold.ttf'),
    'PlayfairDisplay-ExtraBoldItalic': require('../assets/fonts/PlayfairDisplay-ExtraBoldItalic.ttf'),
    'PlayfairDisplay-Italic': require('../assets/fonts/PlayfairDisplay-Italic.ttf'),
    'PlayfairDisplay-Medium': require('../assets/fonts/PlayfairDisplay-Medium.ttf'),
    'PlayfairDisplay-MediumItalic': require('../assets/fonts/PlayfairDisplay-MediumItalic.ttf'),
    'PlayfairDisplay-Regular': require('../assets/fonts/PlayfairDisplay-Regular.ttf'),
    'PlayfairDisplay-SemiBold': require('../assets/fonts/PlayfairDisplay-SemiBold.ttf'),
    'PlayfairDisplay-SemiBoldItalic': require('../assets/fonts/PlayfairDisplay-SemiBoldItalic.ttf'), 
  });

  useEffect(() => {
    if (error){
      throw error;
    }
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded,error]);


  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <GlobalProvider>
    
    <Stack>
      <Stack.Screen name='index' options={{headerShown: false}}/>
      <Stack.Screen name="(auth)" options={{headerShown: false}}/>
      <Stack.Screen name="(student)" options={{headerShown: false}}/>
      <Stack.Screen name="(teacher)" options={{headerShown: false}}/>
      <Stack.Screen name="(hod)" options={{headerShown: false}}/>
    </Stack>
     </GlobalProvider>
    
  );
}
