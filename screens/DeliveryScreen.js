import React from 'react';
import { ScrollView, StyleSheet, Text, View, Linking, ToastAndroid } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import DeliveryCard from '../components/DeliveryCard'
import moment from 'moment';
import 'moment/locale/fr';
import firebase from '../Firebase';
import { Constants } from 'expo';
import { bold } from 'ansi-colors';
moment.locale('fr')

export default class DeliveryScreen extends React.Component {
    static navigationOptions = {
        title: 'Détails livraison'
    };

    constructor() {
        super();
        this.state = {
            delivery: undefined,
            done: undefined
        }
    }

    componentDidMount() {
        console.log(this.props.navigation.getParam('delivery'))
        this.setState({ delivery: this.props.navigation.getParam('delivery'), done: this.props.navigation.getParam('delivery').done })
    }


    goToAddress(address) {
        // let validAddress = encodeUri(address)
        Linking.openURL('https://waze.com/ul?q=222+rue+du+jardin+public,+33300+Bordeaux&navigate=yes ');
    }

    callNumber(phone) {
        console.log(phone)
        Linking.openURL('tel:' + phone)
    }

    finishedDelivery = () => {
        console.log(this.props.navigation.getParam('id'))
        firebase.database().ref('delivery/' + this.props.navigation.getParam('id')).update({
            done: true
          });
        this.setState({done: true});
        console.log(this.state.done)
        ToastAndroid.show('Livraison terminée !', ToastAndroid.SHORT);
    }

    render() {

        return !this.state.delivery ? <View></View> : (
            <ScrollView style={styles.container}>
                <DeliveryCard delivery={this.state.delivery}></DeliveryCard>
                <View style={styles.titleContainer}>
                    <Icon
                        name="message"
                        color="black"
                        iconStyle={{ marginEnd: 10 }}
                    />
                    <Text style={styles.commentTitle}>Remarques</Text>
                </View>
                <Text style={styles.comment}>{this.state.delivery.comment}</Text>
                <Button
                    title={this.state.done ? "Livraison terminée" : "Terminer la livraison"}
                    disabled={this.state.done}
                    buttonStyle={this.state.done ? styles.done : styles.notDone}
                    onPress={this.finishedDelivery}
                    icon={
                        <Icon
                            name="done"
                            size={15}
                            color={this.state.done ? "grey" : "white"}
                            iconStyle={{ marginStart: 10 }}
                        />
                    }
                    iconRight
                />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
    buttonTitle: {
        fontSize: 13
    },
    button: {
        marginTop: 5
    },
    deliveryHour: {
        fontSize: 12,
    },
    deliveryTitle: {
        fontWeight: "bold",
        color: "#000000",
        fontSize: 16
    },
    commentTitle: {
        fontWeight: 'bold'
    },
    titleContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        marginStart: 15,
        marginTop: 20
    },
    comment: {
        marginTop: 10,
        marginStart: 15
    },
    done: {
        marginTop: 30,
        backgroundColor: "grey"
    },
    notDone: {
        marginTop: 30
    }
});