import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  TouchableHighlight
} from 'react-native';
import { WebBrowser } from 'expo';
import { Constants } from 'expo';
import { MonoText } from '../components/StyledText';
import moment from 'moment';
import 'moment/locale/fr';
import { Header, Card, Button, Icon } from 'react-native-elements';
import firebase from '../Firebase';
import DeliveryCard from '../components/DeliveryCard'
import { YellowBox } from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor() {
    super();
    this.ref = firebase.firestore().collection('delivery');
    this.unsubscribe = null;
    this.state = {
      isLoading: true,
      delivery: {},
      date: undefined
    };
  }

  writeUserData(userId, name, email, admin) {
    firebase.database().ref('users/' + userId).set({
      username: name,
      email: email,
      admin: admin
    });
  }

  getUserData(userId) {
    let userInfo = firebase.database().ref('users/');
    userInfo.on('value', function (snapshot) {
      // updateStarCount(postElement, snapshot.val());
      console.log(snapshot.val())
    });
  }

  createDelivery(deliveryId, address, name, time, duration) {
    firebase.database().ref('delivery/' + deliveryId).set({
      deliveryId: deliveryId,
      address: address,
      name: name,
      time: time,
      duration: duration
    });
  }

  getDelivery() {
    let deliveryInfo = firebase.database().ref('delivery/');
    deliveryInfo.on('value', (data) => {
      this.setState({ delivery: data.val() });
    });
  }


  componentDidMount() {
    this.getDelivery();
    this.setDate();
  }

  goToDelivery(delivery, id){
    this.props.navigation.navigate('Delivery', {delivery: delivery, id: id});
  }

  setDate(){
    setInterval(() => {
      this.setState({date: moment().format('dddd D MMMM HH:mm:ss')})
    }, 1000);
  }

  render() {
    // console.log(this.state.delivery)
    return (
      <View style={styles.container}>
        <View style={styles.statusBar} />
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <Text style={styles.appTitle} >{this.state.date}</Text>
          {Object.keys(this.state.delivery).map(id => this.state.delivery[id].done ? <View key={id}></View> : <TouchableHighlight underlayColor='white' key={id} onPress={() => this.goToDelivery(this.state.delivery[id], id)}><DeliveryCard delivery={this.state.delivery[id]}></DeliveryCard></TouchableHighlight>)}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  appTitle: {
    fontSize: 22,
    color: '#2089dc',
    marginTop: -10,
    textTransform: 'capitalize',
    textAlign: 'center'
  },
  statusBar: {
    backgroundColor: "#2089dc",
    height: Constants.statusBarHeight,
  },
});
