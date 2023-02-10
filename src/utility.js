import AsyncStorage from '@react-native-async-storage/async-storage';

const storeLocalData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    // saving error
  }
}


const getLocalData = async key => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
}

export {
  storeLocalData,
  getLocalData,
}
