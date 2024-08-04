import React, { useState, useEffect, useCallback, useContext } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import { router, useNavigation, useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { AppContext } from "./AppContext";

const index = () => {
  const [data, setData] = useState([]);
  const [cardList, setCardlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const { listData, setListData } = useContext(AppContext);

  useEffect(() => {
    const fetchData = async () => {
      // make yourself own api from mockapi webiste
      // replace product resource json data from api_data.json file
      try {
        const response = await fetch(
          "https://66ae0579b18f3614e3b68948.mockapi.io/products"
        ); // Replace with your API URL
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addCard = (dataCard) => {
    const foundCard = cardList.find((card) => card.id === dataCard.id);
    if (!foundCard) {
      setCardlist([...cardList, { ...dataCard, qty: 1 }]);
    }
  };
  const checkOut = () => {
    if (cardList.length > 0) {
      setListData(cardList);
      router.navigate("/checkout");
    } else {
      Alert.alert("Warnings", "You must choose at least one product", [
        { text: "Okay", onPress: () => {} },
      ]);
    }
  };

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        headerRight: () => (
          <View>
            <TouchableOpacity style={styles.cardContainer} onPress={checkOut}>
              <Ionicons name="basket" size={30} color="black" />
              <Text> {cardList.length} </Text>
            </TouchableOpacity>
          </View>
        ),
      });
    }, [checkOut])
  );

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View>
              <Text style={styles.cardTitle}>{item.name}</Text>
            </View>
            <View style={styles.cardBody}>
              <Image
                resizeMethod="stretch"
                style={styles.photo}
                source={{ uri: item.photo }}
              />
              <View style={styles.cardBottom}>
                <Text>Price: ${item.price}</Text>
                <Text
                  style={styles.amount}
                  onPress={() => {
                    addCard(item);
                  }}
                >
                  ADDED TO CART
                </Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  photo: {
    width: 150,
    height: 200,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    elevation: 3,
    borderRadius: 25,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardBody: {
    alignItems: "center",
    justifyContent: "space-around",
  },
  cardBottom: {
    flexDirection: "row",
    padding: 12,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 20,
  },
  amount: {
    backgroundColor: "black",
    padding: 8,
    color: "white",
    borderRadius: 8,
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  cardTitle: {
    fontSize: 25,
    fontWeight: "900",
    marginBottom: 10,
  },
});

export default index;
