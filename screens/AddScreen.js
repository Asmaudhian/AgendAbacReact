import React from 'react';
import { Text, View, StyleSheet, Picker, DatePickerAndroid, ToastAndroid } from 'react-native';
import { Input, Button, Icon, Divider } from 'react-native-elements';
import moment from 'moment';
import 'moment/locale/fr';
import firebase from '../Firebase';
import { Constants } from 'expo';
import { createStackNavigator, createAppContainer } from 'react-navigation';

const hours = [
  '08',
  '09',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18'
]

const min = [
  '00',
  '15',
  '30',
  '45'
]

export default class AddScreen extends React.Component {
  static navigationOptions = {
    title: 'Ajouer une livraison',
    header: null
  };

  constructor() {
    super();
    this.state = {
      date: '',
      hour: hours[0],
      min: min[0],
      name: '',
      address: '',
      duration: undefined,
      phone: undefined,
      comment: ''
    }
  }

  sendDelivery = () => {
    let date = this.state.date + ' ' + this.state.hour + ':' + this.state.min;
    firebase.database().ref('delivery/').push({
      time: moment(date).unix(),
      name: this.state.name,
      duration: this.state.duration,
      address: this.state.address,
      comment: this.state.comment,
      phone: this.state.phone,
      done: false
    });
    this.setState({
      date: '',
      hour: hours[0],
      min: min[0],
      name: '',
      address: '',
      duration: undefined,
      phone: undefined,
      comment: ''
    });
    ToastAndroid.show('Livraison ajoutée', ToastAndroid.SHORT);
    this.props.navigation.navigate('Home');
  }

  writeUserData(userId, name, email, admin) {
    firebase.database().ref('users/' + userId).set({
      username: name,
      email: email,
      admin: admin
    });
  }

  openCalendar = async () => {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        date: new Date(),
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        let correctMonth = month;
        if (String(correctMonth).length < 2){
          correctMonth = '0' + String(correctMonth)
        }
        let correctDay = day;
        if (String(correctDay).length < 2){
          correctDay = '0' + String(correctDay)
        }
        this.setState({date: year + '-' + correctMonth + '-' + correctDay})
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }

  render() {
    return (
      <View>
        <View style={styles.statusBar} />
        <Text style={styles.title}>Ajouter une livraison</Text>
        {/* <Divider style={{ backgroundColor: 'grey' }} /> */}
        <Input
          placeholder='Nom'
          inputContainerStyle={styles.input}
          value={this.state.name}
          onChangeText={(value) => this.setState({name: value})}
          leftIcon={
            <Icon
              name="person"
              color="grey"
              iconStyle={{ marginEnd: 10 }}
            />
          }
        />
        <Input
          placeholder='Adresse'
          inputContainerStyle={styles.input}
          value={this.state.address}
          onChangeText={(value) => this.setState({address: value})}
          leftIcon={
            <Icon
              name="domain"
              color="grey"
              iconStyle={{ marginEnd: 10 }}
            />
          }
        />
        <Input
          placeholder='Durée (min)'
          inputContainerStyle={styles.input}
          keyboardType="numeric"
          value={this.state.duration}
          onChangeText={(value) => this.setState({duration: value})}
          leftIcon={
            <Icon
              name="av-timer"
              color="grey"
              iconStyle={{ marginEnd: 10 }}
            />
          }
        />
        <Input
          placeholder='Téléphone'
          inputContainerStyle={styles.input}
          keyboardType="numeric"
          value={this.state.phone}
          onChangeText={(value) => this.setState({phone: value})}
          leftIcon={
            <Icon
              name="phone"
              color="grey"
              iconStyle={{ marginEnd: 10 }}
            />
          }
        />
        <Input
          placeholder='Remarque'
          inputContainerStyle={styles.input}
          value={this.state.comment}
          onChangeText={(value) => this.setState({comment: value})}
          leftIcon={
            <Icon
              name="message"
              color="grey"
              iconStyle={{ marginEnd: 10 }}
            />
          }
        />
        <Input
          placeholder='Date (AAAA-MM-JJ)'
          inputContainerStyle={styles.input}
          value={this.state.date}
          onChangeText={(value) => this.setState({date: value})}
          onFocus={this.openCalendar}
          leftIcon={
            <Icon
              name="today"
              color="grey"
              iconStyle={{ marginEnd: 10 }}
            />
          }
        />
        <View style={styles.hourDate}>
          <Icon
            name="access-time"
            color="grey"
            iconStyle={styles.hourIcon}
          />
          <Picker
            selectedValue={this.state.hour}
            style={{ height: 50, width: 100 }}
            onValueChange={(selectedHour, itemIndex) =>
              this.setState({ hour: selectedHour })
            }>
            {hours.map(hour => <Picker.Item key={hour} label={hour + 'h'} value={hour}></Picker.Item>)}
          </Picker>
          <Picker
            selectedValue={this.state.min}
            style={{ height: 50, width: 100 }}
            onValueChange={(selectedMin, itemIndex) =>
              this.setState({ min: selectedMin })
            }>
            {min.map(mins => <Picker.Item key={mins} label={mins} value={mins}></Picker.Item>)}
          </Picker>
        </View>
        <Button
          title="Envoyer"
          buttonStyle={styles.send}
          onPress={this.sendDelivery}
          icon={
            <Icon
              name="send"
              size={15}
              color="white"
              iconStyle={{ marginStart: 10 }}
            />
          }
          iconRight
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  hourDate: {
    flexDirection: "row",
    alignSelf: "flex-start",
    marginTop: 15,
  },
  input: {
    marginTop: 20
  },
  send: {
    marginTop: 15,
    alignSelf: "flex-end",
    marginEnd: 15,

  },
  hourIcon: {
    marginTop: 12,
    marginStart: 25,
    marginEnd: 5
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
