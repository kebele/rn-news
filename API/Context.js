import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { getNewsAPI, getSourceAPI } from "./api";

// 1 context oluştur NewsContext adında
export const NewsContext = createContext();

// 2 context provider oluştur, yani bütün app'ı sarmalayacak yapı içine children alacak
const Context = ({ children }) => {
  // 5 state leri oluşturalım, yani app'içinden ulaşılmasını istediğimiz state'ler, func'lar vb burada olacak ve burada olanları value ile App'a sunacağız
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState("general");
  // 6 index state'ini InshortTabs'dan buraya getirdim
  const [index, setIndex] = useState(1);
  // 11 source'lar için state
  const [source, setSource] = useState();
  // refresh
  //   const [refresh, setRefresh] = useState(false);
  const [darkTheme, setDarkTheme] = useState(true);

  // 9   api'den news'leri çekelim, API(api.js'de) ve news ve index statelerini değiştirelim
  const fetchNews = async (reset = category) => {
    const { data } = await axios.get(getNewsAPI(reset));
    console.log("category :", category);
    // console.log(data);
    setNews(data);
    setIndex(1);
  };

  // 12 source'ları api.js'den çekelim
  const fetchNewsFromSource = async () => {
    try {
      const { data } = await axios.get(getSourceAPI(source));

      setNews(data);
      setIndex(1);
    } catch (error) {
      console.log(error);
    }
  };

  // 10 useEffect ile nez aman veri çekileceğini vb. ayarlayalım, her kategori değiştiğinde yeniden fetch yapılacak
  useEffect(() => {
    fetchNews();
    // setRefresh(false);
  }, [category]);
  // 13 useEffect ile her source değiştiğinde yeni source'dan verileri çeksin ve sonrada context'den bunu app'a dağıtalım, sonrada discoverScreen'den context ile bağlantıyı kurup setSource'u orada yapalım
  useEffect(() => {
    fetchNewsFromSource();
  }, [source]);

  // 7 şimdi bunları nasıl bütün app'a dağıtacağız, bunun için NewsContext.Provider'a value verip neleri bütün app'ın kullanmasını/ulaşmasını istiyorsak oraya koyacağız, yani bunları App'a provide edeceğiz

  return (
    <NewsContext.Provider
      value={{
        news,
        index,
        setIndex,
        fetchNews,
        setCategory,
        category,
        setSource,
        // refresh,
        // setRefresh,
        darkTheme,
        setDarkTheme,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};

// 3 export et
export default Context;

// App.js'e gidip bütün App'ı context iine al, böylelikle app içinde heryerden Context'e ulaşılabilsin
