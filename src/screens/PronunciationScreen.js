import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import { MaterialIcons } from '@expo/vector-icons';

const PronunciationScreen = ({ navigation }) => {
  const [recording, setRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [isAdvanced, setIsAdvanced] = useState(false);
  const [wordData, setWordData] = useState({ word: '', ipa: '' });

  useEffect(() => {
    // Simulating fetching data from a server
    fetchWordData();
  }, []);

  const fetchWordData = async () => {
    // This is a simulation of an API call
    // In a real app, you would fetch this data from your server
    setTimeout(() => {
      setWordData({ word: 'thank', ipa: '/θæŋk/' });
    }, 1000);
  };

  const startRecording = async () => {
    // ... (previous recording logic remains the same)
  };

  const stopRecording = async () => {
    // ... (previous recording logic remains the same)
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="close" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBar}>
            <View style={styles.progress} />
          </View>
        </View>
      </View>
      
      <View style={styles.difficultyButtons}>
        <TouchableOpacity 
          style={[styles.difficultyButton, !isAdvanced && styles.activeButton]} 
          onPress={() => setIsAdvanced(false)}
        >
          <Text style={[styles.difficultyButtonText, !isAdvanced && styles.activeButtonText]}>Thông thường</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.difficultyButton, isAdvanced && styles.activeButton]} 
          onPress={() => setIsAdvanced(true)}
        >
          <Text style={[styles.difficultyButtonText, isAdvanced && styles.activeButtonText]}>Nâng cao</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <View style={styles.instructionArea}>
          <View style={styles.girlIconContainer}>
            <MaterialIcons name="face" size={60} color="#FF69B4" />
          </View>
          <View style={styles.instructionText}>
            <Text style={styles.instruction}>Đến lượt bạn!</Text>
            <Text style={styles.subInstruction}>Tap the 🎙 and record your voice.</Text>
          </View>
        </View>
        
        <View style={styles.textBox}>
          <Text style={styles.textToSpeak}>{wordData.word}</Text>
          <Text style={styles.ipaText}>{wordData.ipa}</Text>
          <Text style={styles.transcription}>{transcription}</Text>
        </View>
        
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <MaterialIcons name="volume-up" size={24} color="#007AFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <MaterialIcons name="cloud-queue" size={24} color="#007AFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <MaterialIcons name="playlist-add" size={24} color="#007AFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.translationBox}>
          <Text style={styles.translation}>Cảm ơn</Text>
        </View>
      </View>

      <View style={styles.recordButtonContainer}>
        <TouchableOpacity
          style={[styles.recordButton, recording && styles.recordingButton]}
          onPress={recording ? stopRecording : startRecording}
        >
          <MaterialIcons 
            name={recording ? "stop" : "mic"} 
            size={40} 
            color={recording ? "white" : "red"} 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  closeButton: {
    padding: 5,
  },
  progressBarContainer: {
    flex: 1,
    marginLeft: 10,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progress: {
    width: '30%',
    height: '100%',
    backgroundColor: 'green',
  },
  difficultyButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  difficultyButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 5,
  },
  difficultyButtonText: {
    fontSize: 16,
    color: '#666',
  },
  activeButton: {
    backgroundColor: '#007AFF',
  },
  activeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  instructionArea: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  instructionText: {
    flex: 1,
  },
  instruction: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subInstruction: {
    fontSize: 16,
  },
  textBox: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  textToSpeak: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  transcription: {
    fontSize: 18,
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  translationBox: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  translation: {
    fontSize: 18,
  },
  recordButtonContainer: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 40,
  },
  recordButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordingButton: {
    backgroundColor: 'red',
  },
  girlIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFF0F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  ipaText: {
    fontSize: 18,
    color: '#666',
    marginTop: 5,
  },
});

export default PronunciationScreen;