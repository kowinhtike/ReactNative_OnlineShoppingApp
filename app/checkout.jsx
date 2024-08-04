import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "./AppContext";
import { Ionicons } from "@expo/vector-icons";

const checkout = () => {
  const { listData, setListData } = useContext(AppContext);
  const [cardlist, setCardlist] = useState(listData);

  const [totalAmount, setTotalAmount] = useState(0);
  const [orderDetails, setOrderDetails] = useState("");

  const calculateTotal = (list) => {
    return list.reduce((sum, item) => sum + item.price * item.qty, 0);
  };

  const formatOrderDetails = (list) => {
    return list
      .map((item, index) => {
        const itemTotal = item.price * item.qty;
        return `${index + 1}. ${item.name} $${item.price} (${
          item.qty
        } qty) $${itemTotal}`;
      })
      .join("\n ");
  };

  useEffect(() => {
    setTotalAmount(calculateTotal(cardlist));
    setOrderDetails(formatOrderDetails(cardlist));
  }, [cardlist]);

  const increase = (item, index) => {
    const updatedList = cardlist.map((cardItem, cardIndex) =>
      cardIndex === index ? { ...cardItem, qty: cardItem.qty + 1 } : cardItem
    );
    setCardlist(updatedList);
  };

  const decrease = (item, index) => {
    const updatedList = cardlist.map((cardItem, cardIndex) =>
      cardIndex === index ? { ...cardItem, qty: cardItem.qty - 1 } : cardItem
    );
    setCardlist(updatedList);
  };

  const pressChekOut = () => {
    Alert.alert(
      "Your Order Details",
      orderDetails + "\n\n Total Amount : " + totalAmount + "$",
      [{ text: "Okay", onPress: () => {} }]
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={cardlist}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
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
                <Ionicons
                  name="remove"
                  size={30}
                  color="red"
                  onPress={() => {
                    decrease(item, index);
                  }}
                />
                <Text>{item.qty}</Text>
                <Ionicons
                  name="add"
                  size={30}
                  color="green"
                  onPress={() => {
                    increase(item, index);
                  }}
                />
                <Text style={styles.amount}>
                  Total : ${item.price * item.qty}
                </Text>
              </View>
            </View>
          </View>
        )}
      />
      <TouchableOpacity onPress={pressChekOut}>
        <View style={styles.checkoutContainer}>
          <Text style={styles.checkout}> Check Out ${totalAmount} </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default checkout;

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
    backgroundColor: "white",
    padding: 8,
    color: "black",
    fontWeight: "900",
    borderRadius: 5,
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
  checkoutContainer: {
    backgroundColor: "black",
    padding: 12,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  checkout: {
    color: "white",
  },
});
