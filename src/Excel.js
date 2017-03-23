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
import RNFS from 'react-native-fs';
import XLSX from "xlsx";




export default class Excel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            word: "",
            meaning:"",
            excelUrl: ""
        };
        this.pdfDownloadURL ="http://spreadsheetpage.com/downloads/xl/worksheet%20functions.xlsx";
        this.pdfPath = RNFS.DocumentDirectoryPath + "/test.xlsx";

    }



    render() {
        console.log("excelpath",this.pdfPath);
        return (
            <View style={styles.footer}>

                <View style={styles.backButton}>
                    <TouchableOpacity onPress={this.props.onChange}>
                        <Icon name="chevron-down" size={25} color="#fbfff6" />
                    </TouchableOpacity>
                </View>

                <View style={styles.parent}>
                    <View style={{flex:1}}>
                        <Text style={styles.label}>  Enter word of looking for: </Text>
                        <TextInput
                            style={{height: 35}}
                            onSubmitEditing={(event) => this.getMeaning(event.nativeEvent.text)}
                            value={this.state.text}
                        />
                    </View>

                    <View style={{flex:1}}>
                        <Text style={styles.label2}> Its equivalent is: </Text>
                        <Text style={styles.word}>{" "}{this.state.meaning}</Text>
                    </View>
                </View>



            </View>
        )
    }

    // excelParse(){
    //     /* set up XMLHttpRequest */
    //
    //     let url = "http://www.nature.com/authorguide/sdata/Data-Descriptor-tables-template-for-authors.xlsx";
    //
    //     let oReq = new XMLHttpRequest();
    //     oReq.open("GET", url, true);
    //     oReq.responseType = "arraybuffer";
    //
    //
    //     oReq.onload = function(e) {
    //         let arraybuffer = oReq.response;
    //
    //         /* convert data to binary string */
    //         let data = new Uint8Array(arraybuffer);
    //         let arr = [];
    //         for(let i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
    //         let bstr = arr.join("");
    //
    //
    //         /* Call XLSX */
    //         let workbook = XLSX.read(bstr, {type:"binary"});
    //
    //
    //         /* DO SOMETHING WITH workbook HERE */
    //         let excelName= workbook.SheetNames[0];
    //         let workSheet = workbook.Sheets[excelName];
    //         let excelToJson= XLSX.utils.sheet_to_json(workSheet);
    //
    //         console.log("dosya",excelName );
    //         console.log("dosya", excelToJson );
    //         excelToJson.map(get =>{
    //             console.log("map", get);
    //         })
    //     };
    //
    //     oReq.send();
    // }

    excelParse2(){
        // var XLSX = require('xlsx');
        // var xlsx = XLSX.read(RNFS.readFile("/data/user/0/com.myfirstrnproject/files/terimler.xlsx"), {type:'buffer'});
        //
        // /* DO SOMETHING WITH workbook HERE */
        // let excelName= workbook.SheetNames[0];
        // let workSheet = workbook.Sheets[excelName];
        // let excelToJson= XLSX.utils.sheet_to_json(workSheet);
        //
        // console.log("dosya",excelName );
        // console.log("dosya", excelToJson );

    }

    getMeaning(text){
        // let excelToJson =this.excelParse();
        // excelToJson.map(get=> {
        //     for(let text in get."1"){
        //         if(text === get."1"){
        //             this.setState({word: get."1" , meaning:get."2"});
        //         }
        //     }
        // })

    }


    componentDidMount(){
        this.excelParse2();
        const options = {
            fromUrl: this.pdfDownloadURL,
            toFile: this.pdfPath
        };
        RNFS.downloadFile(options).promise.then(res => {
            this.setState({isPdfDownload: true});
            this.pdfDownloadURL = "";
        }).catch(err => {
            ToastAndroid.showWithGravity("Invalid Url", ToastAndroid.LONG, ToastAndroid.CENTER);
        });
    }
}

const styles = StyleSheet.create({
    footer: {
        flex: 4,
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#337ab7",
        justifyContent: "flex-start",
    },
    backButton: {
        marginTop: -6
    },
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