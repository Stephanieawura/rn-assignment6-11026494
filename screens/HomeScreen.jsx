import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logo from '../assets/Logo.png';
import addCircleIcon from '../assets/add_circle.png'; 
import filterIcon from '../assets/Filter.png'; 
import listViewIcon from '../assets/Listview.png';

const products = [
  { id: '1', name: 'Office Wear', description: 'reversible angora cardigan', price: 120, image: require('../assets/dress1.png') },
  { id: '2', name: 'Black', description: 'reversible angora cardigan', price: 120, image: require('../assets/dress2.png') },
  { id: '3', name: 'Church Wear', description: 'reversible angora cardigan', price: 120, image: require('../assets/dress3.png') },
  { id: '4', name: 'Lamerei', description: 'reversible angora cardigan', price: 120, image: require('../assets/dress4.png') },
  { id: '5', name: '21WN', description: 'reversible angora cardigan', price: 120, image: require('../assets/dress5.png') },
  { id: '6', name: 'Lopo', description: 'reversible angora cardigan', price: 120, image: require('../assets/dress6.png') },
];

const HomeScreen = ({ navigation }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const loadCart = async () => {
      const storedCart = await AsyncStorage.getItem('cart');
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    };
    loadCart();
  }, []);

  const addToCart = async (product) => {
    const itemInCart = cart.some(item => item.id === product.id);
    if (!itemInCart) {
      const updatedCart = [...cart, product];
      setCart(updatedCart);
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  // Update cart on navigation focus
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const storedCart = await AsyncStorage.getItem('cart');
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.icon}>
          <Image source={require('../assets/Menu.png')} style={styles.iconImage} />
        </TouchableOpacity>
        <Image source={logo} style={styles.logoImage} />
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.icon}>
            <Image source={require('../assets/Search.png')} style={styles.iconImage} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Cart')}>
            <Image source={require('../assets/shoppingBag.png')} style={styles.iconImage} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.storyContainer}>
        <Text style={styles.storyHeader}>OUR STORY</Text>
        <View style={styles.filterListIcons}>
          <TouchableOpacity style={styles.icon}>
            <Image source={listViewIcon} style={styles.iconImage} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon}>
            <Image source={filterIcon} style={styles.iconImage} />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <ImageBackground source={item.image} style={styles.image}>
              <TouchableOpacity onPress={() => addToCart(item)} style={styles.plusIconContainer}>
                <Image source={addCircleIcon} style={styles.plusIcon} />
              </TouchableOpacity>
            </ImageBackground>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productDescription}>{item.description}</Text>
            <Text style={styles.price}>${item.price}</Text>
          </View>
        )}
      />
      <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={styles.cartButton}>
        <Text style={styles.cartButtonText}>Go to Cart ({cart.length})</Text>
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 10,
  },
  icon: {
    marginHorizontal: 5,
  },
  iconImage: {
    width: 24,
    height: 24,
  },
  storyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 20,
  },
  storyHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  filterListIcons: {
    flexDirection: 'row',
    marginLeft: 'auto',
  },
  productContainer: {
    flex: 1,
    margin: 10,
  },
  image: {
    width: '100%',
    height: 200,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  plusIconContainer: {
    padding: 6,
    margin: 10,
  },
  plusIcon: {
    tintColor: '#00000',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  productDescription: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
  price: {
    fontSize: 16,
    color: '#ff4500',
    marginTop: 5,
    textAlign: 'center',
  },
  cartButton: {
    marginTop: 20,
    backgroundColor: '#000',
    padding: 15,
    alignItems: 'center',
  },
  cartButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default HomeScreen;
