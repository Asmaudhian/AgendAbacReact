import React from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import { Constants } from 'expo';

export default class HistoryScreen extends React.Component {
  static navigationOptions = {
    title: 'Historique',
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.statusBar} />
        <Text style={styles.title}>Historique</Text>
        {/* <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <Text style={styles.appTitle} >{this.state.date}</Text>
          {Object.keys(this.state.delivery).map(id => !this.state.delivery[id].done ? <View key={id}></View> : <TouchableHighlight underlayColor='white' key={id} onPress={() => this.goToDelivery(this.state.delivery[id], id)}><DeliveryCard delivery={this.state.delivery[id]}></DeliveryCard></TouchableHighlight>)}
        </ScrollView> */}
        <Text>Coming Soon !</Text>
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
  title: {
    fontSize: 24,
    marginTop: 20,
    marginBottom: 20,
    marginStart: 15,
    // fontWeight: "bold"
  }
});
