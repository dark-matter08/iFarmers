import React, { useRef, useState } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity } from 'react-native';
// import { WebView } from 'react-native-webview';
import { Button } from '../../../components/botton.component';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '@react-navigation/native';
interface EditModalProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
}

export const EditModal = ({ visible, setVisible }: EditModalProps) => {
  const [name, setName] = useState('');
  const [type, setType] = useState();
  const [description, setDescription] = useState('');
  const { colors } = useTheme();
  const pickerRef = useRef<Picker<string>>(null);

  function open() {
    pickerRef?.current?.focus();
  }

  function close() {
    pickerRef?.current?.blur();
  }

  const handleSave = () => {
    // Perform save operation with the modal data
    console.log('Name:', name);
    console.log('Type:', type);
    console.log('Description:', description);

    // Close the modal
    setVisible(false);
  };

  return (
    <Modal visible={visible} onRequestClose={() => setVisible(false)}>
      <View>
        <Text>Name:</Text>
        <TextInput value={name} onChangeText={setName} />

        <Text>Type:</Text>

        <TouchableOpacity
          onPress={open}
          style={{
            backgroundColor: colors.background,
          }}>
          <Text>{type ? type : 'Select Type'}</Text>
        </TouchableOpacity>

        <Picker<string>
          ref={pickerRef}
          selectedValue={type}
          onValueChange={(itemValue: any) => setType(itemValue)}>
          <Picker.Item label="Urban Farms" value="urban farms" />
          <Picker.Item label="Food Markets" value="food markets" />
          <Picker.Item label="Restaurants" value="restaurants" />
        </Picker>

        <Text>Description:</Text>
        {/* <WebView
          originWhitelist={['*']}
          source={{
            html: `<html><head></head><body><div id="editor"></div></body></html>`,
          }}
          javaScriptEnabled={true}
          injectedJavaScript={`
            document.querySelector('#editor').addEventListener('input', (event) => {
              window.ReactNativeWebView.postMessage(event.target.innerHTML);
            });
          `}
          onMessage={(event: any) => setDescription(event.nativeEvent.data)}
          style={{ height: 200 }}
        /> */}

        <Text>{description}</Text>

        <Button title="Save" onPress={handleSave} />
        <Button title="Cancel" onPress={() => setVisible(false)} />
      </View>
    </Modal>
  );
};
