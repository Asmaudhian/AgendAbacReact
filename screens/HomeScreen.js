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
} from 'react-native';
import { WebBrowser } from 'expo';
import { Constants } from 'expo';
import { MonoText } from '../components/StyledText';
import moment from 'moment';
import 'moment/locale/fr';
import { Header, Card, Button, Icon } from 'react-native-elements';
import firebase from '../Firebase';
import DeliveryCard from '../components/DeliveryCard'
// import console = require('console');

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
      delivery: {}
    };
    console.ignoredYellowBox = [
      'Setting a timer'
    ];
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
    // this.getUserData(1);
    // this.createDelivery(4, '222 rue du jardin public, 33300 Bordeaux', 'Barbe', 1569849465, 45);
    this.getDelivery();
    // this.writeUserData(2, 'User', 'user@user.com', false);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.statusBar} />
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <Text style={styles.appTitle} >{moment().format('LLLL')}</Text>
          {Object.keys(this.state.delivery).map(id => <DeliveryCard key={id} delivery={this.state.delivery[id]}></DeliveryCard>)}
        </ScrollView>
        {/* 
        <View style={styles.tabBarInfoContainer}>
          <Text style={styles.tabBarInfoText}>This is a tab bar. You can edit it in:</Text>

          <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
            <MonoText style={styles.codeHighlightText}>navigation/MainTabNavigator.js</MonoText>
          </View>
        </View> */}
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
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
