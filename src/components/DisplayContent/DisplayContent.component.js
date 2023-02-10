import { View, Text, Image } from 'react-native'
import React, { useState, useEffect } from 'react';
import Video from 'react-native-video';
import styles from './DisplayContent.style';


const Img = ({ src }) => <Image style={styles.image} source={{ uri: `file://${src}` }} />;

const Vid = ({ src, onVideoEnded }) => {
  return (
    <Video source={{ uri: `file://${src}` }}
      onEnd={onVideoEnded}
      style={styles.backgroundVideo}
    />
  )
}

const DisplayContent = ({ items }) => {
  const [index, setIndex] = useState(0);
  let timer = null;

  useEffect(() => {
    handleTime();
  }, []);

  const handleTime = () => {
    timer = setInterval(() => {
      if (!items.length) {
        return;
      }

      setIndex(previous => {
        const next = previous + 1;
        if (items[previous].type == 'image') {
          return next >= items.length ? 0 : next;
        } else {
          clearTimeout(timer);
        }
        return previous;
      });
    }, 5000);
  }


  if (!items.length) {
    return null;
  }

  const onVideoEnded = () => {
    handleTime();
    setIndex(previous => {
      return previous + 1 >= items.length ? 0 : previous + 1;
    });
  }

  return (
    <View style={styles.main}>
      {items[index].type == 'image' ?
        <Img src={items[index].path} /> :
        <Vid src={items[index].path} onVideoEnded={onVideoEnded} />
      }
    </View>
  )
}

export default DisplayContent;