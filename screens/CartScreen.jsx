import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import removeIcon from '../assets/remove.png';
import cartIcon from '../assets/shoppingBag.png'; 
import checkoutImage from '../assets/checkout.png'; 
import logoImage from '../assets/Logo.png';
import searchImage from '../assets/Search.png';

const CartScreen = ({ navigation }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const storedCart = await AsyncStorage.getItem('cart');
        if (storedCart) {
          setCart(JSON.parse(storedCart));
        }
      } catch (error) {
        console.error('Error loading cart from AsyncStorage:', error);
      }
    };
    loadCart();
  }, []);

  const removeFromCart = async (productId) => {
    try {
      const updatedCart = cart.filter(item => item.id !== productId);
      setCart(updatedCart);
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.productName}>{item.name.toUpperCase()}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>
      <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.removeButton}>
        <Image source={removeIcon} style={styles.removeIcon} />
      </TouchableOpacity>
    </View>
  );

  const calculateTotal = () => {
    let total = cart.reduce((acc, item) => acc + item.price, 0);
    return total.toFixed(2);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImage} style={styles.logoImage} />
        <TouchableOpacity style={styles.icon}>
          <Image source={searchImage} style={styles.iconImage} />
        </TouchableOpacity>
      </View>
      <Image source={checkoutImage} style={styles.checkoutImage} />
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={renderCartItem}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>EST. TOTAL</Text>
        <Text style={styles.totalPrice}>${calculateTotal()}</Text>
      </View>
      <TouchableOpacity style={styles.checkoutButton}>
        <Image source={cartIcon} style={styles.cartIcon} />
        <Text style={styles.checkoutButtonText}>CHECKOUT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoImage: {
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -60 }],
    resizeMode: 'contain',
  },
  icon: {
    marginLeft: 'auto',
  },
  iconImage: {
    width: 24,
    height: 24,
    marginRight: 5,
  },
  checkoutImage: {
    width: 200,
    height: 50,
    alignSelf: 'center',
    marginVertical: 20,
    resizeMode: 'contain',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
  },
  image: {
    width: 100,
    height: 150,
    marginRight: 20,
  },
  details: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productDescription: {
    fontSize: 14,
    color: '#888',
  },
  price: {
    fontSize: 16,
    color: '#ff4500',
    marginTop: 5,
  },
  removeButton: {
    padding: 10,
  },
  removeIcon: {
    width: 24,
    height: 24,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff4500',
  },
  checkoutButton: {
    flexDirection: 'row',
    backgroundColor: '#000',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
  },
  cartIcon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
});

export default CartScreen;
