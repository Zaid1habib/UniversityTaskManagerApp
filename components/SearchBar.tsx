import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Alert, Platform } from 'react-native';
import { IconButton, Searchbar } from 'react-native-paper';
import * as Speech from 'expo-speech';
import {
  ExpoSpeechRecognitionModule,
  addSpeechRecognitionListener,
  ExpoSpeechRecognitionResultEvent,
  ExpoSpeechRecognitionErrorEvent,
} from 'expo-speech-recognition';

interface VoiceSearchBarProps {
  onSearch: (query: string) => void;
}

export const VoiceSearchBar: React.FC<VoiceSearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const startListening = async () => {
    try {
      if (!hasPermission) {
        Alert.alert(
          'Permission Required',
          'Please enable microphone access in your device settings to use voice search.'
        );
        return;
      }

      setIsListening(true);
      
      await Speech.speak('Listening...', {
        language: 'en',
        pitch: 1.0,
        rate: 1.0,
      });

      await ExpoSpeechRecognitionModule.startListeningAsync({
        language: 'en-US',
        partialResults: true,
      });

      addSpeechRecognitionListener('result', (event: ExpoSpeechRecognitionResultEvent) => {
        if (event.results && event.results[0]) {
          const text = event.results[0].transcript;
          setSearchQuery(text);
          onSearch(text);
        }
      });

      addSpeechRecognitionListener('error', (error: ExpoSpeechRecognitionErrorEvent) => {
        console.error('Speech recognition error:', error);
        setIsListening(false);
      });

      addSpeechRecognitionListener('end', () => {
        setIsListening(false);
      });

    } catch (error) {
      console.error('Error with speech recognition:', error);
      setIsListening(false);
      Alert.alert('Error', 'Failed to start speech recognition');
    }
  };

  const stopListening = async () => {
    try {
      await ExpoSpeechRecognitionModule.stopListeningAsync();
      setIsListening(false);
    } catch (error) {
      console.error('Error stopping speech recognition:', error);
    }
  };

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search tasks..."
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchBar}
        iconColor={isListening ? '#FF0000' : '#000000'}
      />
      <TouchableOpacity 
        onPress={isListening ? stopListening : startListening}
        style={styles.micButton}
        disabled={!hasPermission}
      >
        <IconButton
          icon={isListening ? 'microphone' : 'microphone-outline'}
          size={24}
          iconColor={isListening ? '#FF0000' : '#000000'}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  searchBar: {
    flex: 1,
    marginRight: 8,
    elevation: 0,
  },
  micButton: {
    marginLeft: 4,
  },
}); 