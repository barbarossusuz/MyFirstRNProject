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

import Icon from 'react-native-vector-icons/FontAwesome';
import {Clipboard} from 'react-native';

export default class Dictionary extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ingText: "",
            turkText:"",
            dicType: true
        };
    }



    render() {
        return (
            <View style={styles.footer}>

                <View style={styles.backButton}>
                    <TouchableOpacity onPress={this.props.onChange}>
                        <Icon name="angle-double-down" size={35} color="#fbfff6" />
                    </TouchableOpacity>
                </View>

                {/*<View style={styles.changeButton}>*/}
                    {/*<TouchableOpacity >*/}
                        {/*<Icon name="info" size={20} color="#fbfff6" />*/}
                    {/*</TouchableOpacity>*/}
                    {/*<Text style={styles.label2}>  Cevir </Text>*/}
                {/*</View>*/}

                <View style={styles.parent}>
                    <View style={{flex:1}}>
                    <Text style={styles.label}>  Type something in English: </Text>
                    <TextInput
                        style={{height: 35}}
                        onSubmitEditing={(event) => {event.nativeEvent.text.indexOf(" ") > 0 ?
                        this.transltr(event.nativeEvent.text) : this.cevir(event.nativeEvent.text)}}
                        value={this.state.text}
                    />
                    </View>
                    <View style={{flex:1}}>
                    <Text style={styles.label2}> Its Turkish equivalent is: </Text>
                    <Text style={styles.word}>{" "}{this.state.turkText}</Text>
                    </View>
                </View>



            </View>
        )
    }


    cevir(text){
        this.setState({turkText:""});
        console.log("cevir",text);
        //https://translation.googleapis.com/language/translate/v2?key=AIzaSyBMzJKS2dAXIQURxPda8KwJwQW7QoBQkAs&source=en&target=de&q=Hello%20world&q=My%20name%20is%20Jeff

        fetch("http://cevir.ws/v1?q="+ text +"&m=5&p=exact&l=en")
            .then((response) => response.json())
            .then((responseJson) => {
            console.log("responsejson",responseJson);

            if(responseJson.control.results!=0){
            if(responseJson.word["0"].desc){
                let s =responseJson.word["0"].desc;
                this.setState({turkText: s});
            } else this.setState({turkText: "No Result!"})

            }else this.setState({turkText: "No Result!"})

            })
            .catch((error) => {
                console.error(error);
            });
    }
    transltr(text){
        this.setState({turkText:""});
        console.log("transltr",text);
        //TODO ingilizceden türkçe olmuyor site de sorun var
        fetch("http://www.transltr.org/api/translate?text="+ text +"&to=eng&from=tr")
            .then((response) => response.json())
            .then((responseJson) => {
                console.log("responsejson",responseJson);

                if(responseJson){
                    if(responseJson.translationText){
                        let s =responseJson.translationText;
                        this.setState({turkText: s});
                    } else this.setState({turkText: "Bir şeyler yanlış gitti, daha sonra tekrar deneyiniz. :: Try again later."})

                }else this.setState({turkText: "No Result!"})

            })
            .catch((error) => {
                console.error(error);
            });
    }
    componentDidMount(){
    }
}

const styles = StyleSheet.create({
    footer: {
        flex: 4,
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#15c7ff",
        justifyContent: "flex-start",
    },
    backButton: {
        marginTop: -8
    },
    // changeButton: {
    //     marginTop: -20,
    //     alignItems: "center",
    //     alignSelf: "flex-start"
    // },
    // For the container View
    parent: {
        flexDirection: "row"
    },
    // For the Text label
    label: {
        color: "#fbfff6",
        fontWeight: 'bold'
    },
    label2: {
        fontWeight: 'bold'
    },

    // For the Text meaning
    word: {
        fontSize: 12,
        fontStyle: 'italic'
    }
});