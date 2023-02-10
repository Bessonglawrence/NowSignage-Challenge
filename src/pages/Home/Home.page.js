import { Alert, SafeAreaView, ActivityIndicator, StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react';
import RNFetchBlob from 'rn-fetch-blob';
import Auth from '../../components/Auth/Auth.component';
import DisplayContent from '../../components/DisplayContent/DisplayContent.component';
import { getLocalData, storeLocalData } from '../../utility';
import styles from './Home.style';

let documentDir = RNFetchBlob.fs.dirs.DocumentDir;

const Home = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [totalItems, setTotalItems] = useState(null);
  let url = 'https://api.jsonbin.io/v3/b/63c95c3bdfc68e59d586aaed';

  useEffect(() => {
    if (!isAuth) {
      return;
    }

    getLocalData('ITEMS')
      .then(local_items => {
        if (!local_items || !local_items.length) {
          fetchItems();
        } else {
          setItems(local_items);
          setTotalItems(local_items.length);
        }
      })
      .catch(err => fetchItems())
  }, [isAuth]);

  const fetchItems = () => {
    setLoading(true);
    fetch(url)
      .then(res => res.json())
      .then(responseJson => {
        setTotalItems(responseJson.record.items.length);
        responseJson.record.items.map(item => downloadData(item));
      })
      .finally(fin => setLoading(false));
  }

  useEffect(() => {
    items.length && storeLocalData('ITEMS', items);
  }, [items]);

  const downloadData = ({ url, type }) => {
    const urlArray = url.split('/');
    const fileName = urlArray[urlArray.length - 1];
    let downloadToPath = `${documentDir}/download/${fileName}`;

    RNFetchBlob
      .config({ fileCache: true, path: downloadToPath })
      .fetch('GET', url, {})
      .then((res) => {
        const newItem = { type, path: res.data };
        setItems(previous => [...previous, newItem]);
      })
      .catch(error => Alert.alert('Error', error.message));
  }

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar backgroundColor={"#1f2426"} barStyle={"light-content"} />
      {!isAuth ?
        <Auth onSuccess={() => setIsAuth(true)} /> :
        <>
          {loading && <ActivityIndicator size={40} />}
          {totalItems == items.length && <DisplayContent items={items} />}
        </>
      }
    </SafeAreaView>
  )
}

export default Home;