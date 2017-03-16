'use strict';
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    ToastAndroid
} from 'react-native';

import {Actions} from 'react-native-router-flux';


export default class WelcomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }

    }

    render() {
        return (
            <View style={styles.container}>


                <View style={styles.header}>
                </View>

                <View style={styles.footer}>

                    <View  style={{marginTop: 70}}>
                        <Button
                            onPress={this.onPressSubmitButtons}
                            title="Please Click To Select Pdf"
                            color="#129cff"
                            accessibilityLabel="Select Pdf From Device"
                        />
                    </View>

                    <Text
                        style={{marginTop: 25,color: "white", fontWeight: "bold", fontSize: 20}}>OR</Text>

                    <View  style={{marginTop: 110}}>
                        <Text
                            style={{color: "white", fontWeight: "bold", fontSize: 16}}>Please Write Pdf Url Here :</Text>
                        <TextInput
                            style={{height: 40}}
                            autoCorrect={false}
                            onSubmitEditing={(event) => this.onSubmitEdditing(event.nativeEvent.text)}
                            keyboardType="web-search"
                        />
                    </View>

                </View>


            </View>

        )
    }

    onSubmitEdditing(text){
        if(text.replace(/^.*[\\\/]/, '').slice(-4) ===".pdf"){
        Actions.pdfViewer({pdfDownloadURL: text});
        }
        else {
            ToastAndroid.showWithGravity("Entered url does not contain .pdf extension", ToastAndroid.LONG, ToastAndroid.TOP);
            return null;
        }
    }
    onPressSubmitButtons() {
        let text = "http://www.pdf995.com/samples/pdf.pdf";
        console.log("button", text);
        if(text.replace(/^.*[\\\/]/, '').slice(-4) ===".pdf"){
            Actions.pdfViewer({pdfDownloadURL: text});
        }
        else {
            ToastAndroid.showWithGravity("Selected file is not a pdf file", ToastAndroid.LONG, ToastAndroid.TOP);
            return null;
        }
    }

}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#15c7ff",
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
    },
    header: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#15c7ff"
    },
    footer: {
        flex: 14,
        alignItems: "center"
    }
});