import React, { useState } from 'react';
import { Pressable, TextInput, View, Text } from 'react-native'
import styles from './Auth.style';

const Auth = ({ onSuccess }) => {
  const [code, setCode] = useState('');

  const login = () => {
    if (code == '00000') {
      onSuccess();
    } else {
      alert('Invalid passcode');
    }
  }

  return (
    <View style={styles.main}>
      <Text style={styles.heading}>WELCOME TO AdsMan</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor={'#b2bec3'}
        value={code}
        onChangeText={setCode}
        placeholder='Enter your passcode'
        keyboardType='numeric'
      />
      <Pressable style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
    </View>
  )
}

export default Auth;