// https://github.com/meliorence/react-native-snap-carousel
// bunu hem news hemde category için kullanabiliriz,
// npm install --save react-native-snap-carousel

import { View, Text, Dimensions, StyleSheet } from "react-native";
import React, { useContext, useState } from "react";
import { NewsContext } from "../API/Context";
import Carousel from "react-native-snap-carousel";
import SingleNews from "../components/SingleNews";

const NewsScreen = () => {
  //context'den news'i getirelim
  const {
    news: { articles },
  } = useContext(NewsContext);
  // console.log(articles);
  // terminalde dönen verileri gördük,
  const [activeIndex, setActiveIndex] = useState();
  const windowHeight = Dimensions.get("window").height;
  return (
    <View style={styles.carousel}>
      {articles && (
        <Carousel
          layout={"stack"}
          // layout={"default"}
          data={articles.slice(0, 10)}
          sliderHeight={300}
          itemHeight={windowHeight}
          vertical={true}
          renderItem={({ item, index }) => (
            <SingleNews item={item} index={index} />
          )}
          onSnapToItem={(index) => setActiveIndex(index)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  carousel: {
    flex: 1,
    backgroundColor: "black",
    transform: [{ scaleY: -1 }],
  },
});

export default NewsScreen;
