import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions, Linking } from 'react-native';
import { Header, Card, Button, Icon } from 'react-native-elements';
import moment from 'moment';
import 'moment/locale/fr';

moment.locale('fr')
// import console = require('console');

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu hehe',
// });

export default class DeliveryCard extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    goToAddress() {
        const url = 'maps://app?saddr=Cupertino&San+Francisco';
        Linking.canOpenURL(url)
            .then((supported) => {
                console.log(supported)
                if (supported) {
                    return Linking.openURL(url)
                        .catch(() => null);
                }
            });
        // Linking.openURL('maps://app?saddr=Cupertino&San+Francisco').catch((err) => console.log(err))
    }

    render() {
        console.log(this.props.delivery)
        return (
            <View>
                <Card>
                    <View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={styles.deliveryTitle}>{this.props.delivery.name}</Text>
                            <Text style={styles.deliveryHour} >{moment.unix(this.props.delivery.time).format('LT')} - {this.props.delivery.duration} min</Text>
                        </View>
                        <Text style={styles.name}>{this.props.delivery.address}</Text>
                        <View style={{ flexDirection: "row", alignSelf: "flex-end" }}>
                            <Button
                                buttonStyle={styles.button}
                                titleStyle={styles.buttonTitle}
                                title="APPELER"
                                type="clear"
                                icon={{
                                    name: "phone",
                                    size: 13,
                                    color: "#2089dc"
                                }}
                            />
                            <Button
                                buttonStyle={styles.button}
                                titleStyle={styles.buttonTitle}
                                title="Y ALLER"
                                type="clear"
                                onPress={() => {
                                    this.goToAddress();
                                }}
                                icon={{
                                    name: "directions",
                                    size: 13,
                                    color: "#2089dc"
                                }}
                            />
                        </View>
                    </View>
                </Card>
            </View>
        );
    }

}

const styles = StyleSheet.create({
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
    }
});
