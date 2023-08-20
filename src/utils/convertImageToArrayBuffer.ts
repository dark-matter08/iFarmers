import * as FileSystem from 'expo-file-system';
import { decode } from 'react-native-base64';
export const convertImageToArrayBuffer = async (imageUri: string) => {
  console.log(imageUri);
  const fileInfo = await FileSystem.getInfoAsync(imageUri);
  if (!fileInfo.exists) {
    throw new Error('Image file does not exist');
  }

  const response = await FileSystem.readAsStringAsync(imageUri, {
    encoding: FileSystem.EncodingType.Base64,
  });
  // Convert the base64 string to an ArrayBuffer
  const binaryString = decode(response);
  const length = binaryString.length;
  const bytes = new Uint8Array(length);

  for (let i = 0; i < length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  const arrayBuffer = bytes.buffer;

  // Return the ArrayBuffer
  return arrayBuffer;
};
