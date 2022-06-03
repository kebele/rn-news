import { View, Text, useWindowDimensions } from "react-native";
import React, { useContext, useState } from "react";
import { SceneMap, TabView } from "react-native-tab-view";
import DiscoverScreen from "../Screens/DiscoverScreen";
import NewsScreen from "../Screens/NewsScreen";
import TopNavigation from "./TopNavigation";
import { NewsContext } from "../API/Context";

const InshortTabs = () => {
  const layout = useWindowDimensions();
  // tabları tanımlamak
  // 6 index stat'ini contaxt'e taşıdım, şimdi Context'de index'in dağıtımını yaptık nasıl alacağız, useContext ile
  //   const { index, setIndex } = useContext(NewsContext) burada context olarak NewsContext den index ve setİndex'i getir dedik
  //   const [index, setIndex] = useState(1);
  const { index, setIndex } = useContext(NewsContext);
  // routes
  const [routes] = useState([
    { key: "first", title: "discover" },
    { key: "second", title: "news" },
  ]);

  const renderScene = SceneMap({
    first: DiscoverScreen,
    second: NewsScreen,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={() => <TopNavigation index={index} setIndex={setIndex} />}
    />
  );
};

export default InshortTabs;
