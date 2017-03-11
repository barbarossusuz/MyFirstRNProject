'use strict';
import React, {Component} from 'react';

import {
    StyleSheet,
    Text,
    View,
    TextInput,
    AppRegistry,
    Picker,
    TouchableOpacity,
    ToastAndroid
} from 'react-native';

import PDFView from 'react-native-pdf-view';
import RNFS from 'react-native-fs';
import {Clipboard} from 'react-native';
import {Actions} from 'react-native-router-flux';


export default class PdfViewer extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }



    render() {
        return (
            <View style={styles.footer}>

                <View>
                    <TouchableOpacity onPress={this.props.onChange}>
                        <Text style={styles.backButton}>{"←"}</Text>
                    </TouchableOpacity>
                </View>
                <Text>deneme</Text>
            </View>
        )
    }


}

const styles = StyleSheet.create({
    footer: {
        flex: 5,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#15c7ff",
        justifyContent: "space-between",
    },
    backButton: {
        color: "#fbfff6",
        fontWeight: "bold",
        fontSize: 30,
        marginBottom: 8
    },
});