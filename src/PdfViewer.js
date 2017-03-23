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
    ToastAndroid,
    BackAndroid
} from 'react-native';

import PDFView from 'react-native-pdf-view';
import RNFS from 'react-native-fs';
import {Clipboard} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Dictionary from "./Dictionary";
import Excel from "./Excel";
import Icon from 'react-native-vector-icons/FontAwesome';


export default class PdfViewer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isPdfDownload: false,
            pageCount: 0,
            pageNumber: 1,
            mode: Picker.MODE_DIALOG,
            durum: "main"
        };
        this.pdfPathFromDevice= this.props.pdfPathFromDevice || undefined;
        this.pdfDownloadURL = this.props.pdfDownloadURL || undefined;
        this.fileName = (this.pdfDownloadURL ===undefined ? this.pdfPathFromDevice : this.pdfDownloadURL).replace(/^.*[\\\/]/, '').slice(0, -4);

        this.pdfPathFromUrl= RNFS.DocumentDirectoryPath + "/" + this.fileName + ".pdf";

        this.pdfView = null;

    }

    render() {
        console.log("path",this.pdfPathFromUrl);
        return (
            <View style={{flex:1}}>

                <View style={[styles.header,this.state.durum =="main"? {flex: 1}: {flex: 1.2}]}>
                    {this.renderFileName()}

                    {this.renderPageCount()}

                    {this.addExcelFile()}
                </View>

                {this.state.isPdfDownload ?
                    <PDFView ref={(pdf)=>{this.pdfView = pdf;}}
                             key="sop"
                             path={this.pdfPathFromDevice === undefined ? this.pdfPathFromUrl : this.pdfPathFromDevice}
                             pageNumber={this.state.pageNumber}
                             onLoadComplete={(pageCount)=>{
                         this.setState({pageCount: pageCount});
                         this.zoom();
                     }}
                             style={styles.pdf}/> :

                    <View style={styles.loading}>
                        <Text>Waiting For Pdf</Text>
                    </View>}

                {this.renderFooter()}

            </View>
        )
    }

    renderFileName() {
        if (this.state.isPdfDownload) {
            return (
                <View style={[styles.headerItems,{flex:2,justifyContent: "flex-start"}]}>
                    <View style={{flex:1}}>
                        <TouchableOpacity onPress={Actions.pop}>
                            <Icon name="chevron-left" size={20} color="#fbfff6" />
                        </TouchableOpacity>
                    </View>
                    <View style={{justifyContent: "flex-start",flex:5}}>
                        <Text style={styles.fileName}>{(this.fileName).toUpperCase()}</Text>
                    </View>
                </View>
            );
        }
        else {
            return (
                <View style={[styles.headerItems,{flex:2,justifyContent: "flex-start"}]}>
                    <TouchableOpacity onPress={Actions.pop}>
                        <Icon name="chevron-left" size={20} color="#fbfff6" />
                    </TouchableOpacity>
                </View>
            );
        }

    }

    renderPageCount() {
        if (this.state.isPdfDownload) {
            return (
                <View style={[styles.headerItems,{flex:1.5,justifyContent: "center"}]}>
                    <View>
                        <Text style={styles.fileName}>{this.state.pageCount + " /"}</Text>
                    </View>
                    <View>
                        <Picker
                            style={{width:50,height:20}}
                            selectedValue={this.state.pageNumber}
                            onValueChange={(text) => this.renderPageNumber(text)}
                            mode="dropdown">
                            {this.renderItems()}
                        </Picker>
                    </View>

                </View>

            );
        }
        else {
            return null;
        }
    }
    renderItems() {
        let args = [];
        for (let i = 1; i <= this.state.pageCount; i++) {
            args.push(<Picker.Item key={i.toString()} label={i.toString()} color="black" value={i}/>)
        }
        return args;
    }
    renderPageNumber(text) {
        let text1 = parseInt(text);
        if (1 <= text1 <= this.state.pageCount) {
            setTimeout(() => {
                this.setState({pageNumber: text1});
            }, 500)
        }
        else return null;
    }

    addExcelFile() {
        return (
            <View style={[styles.headerItems,{flex:2,justifyContent:"flex-end"}]}>
                <TouchableOpacity onPress={Actions.pop}>
                    <Icon name="plus-square-o" size={30} color="#fbfff6" />
                </TouchableOpacity>
            </View>
        );
    }

    renderFooter() {
        if (this.state.durum === "main") {
            return (
                <View ref="footer" style={styles.footer}>

                        <View >
                            <TouchableOpacity onPress={()=> this.setState({durum:"dictionary"})}>
                                <Icon name="book" size={30} color="#fbfff6" />
                            </TouchableOpacity>
                        </View>


                        <View >
                            <TouchableOpacity onPress={()=> this.setState({durum:"excel"})}>
                                <Icon name="file-excel-o" size={30} color="#fbfff6" />
                            </TouchableOpacity>
                        </View>

                </View>
            );
        }

         if (this.state.durum === "dictionary") {
            return (
                <Dictionary ref="dictionary" onChange={this.changeToMainFooter}/>
            );
        }

         if (this.state.durum === "excel") {
            return (
                <Excel ref="excel" onChange={this.changeToMainFooter}/>
            );
        }
    }

    changeToMainFooter=()=>{
        this.setState({durum: "main"})
    };



    zoom(val = 1) {
        // this.pdfView && setTimeout(() => {
        //     this.pdfView.setNativeProps({zoom: val});
        // }, 1500);
    }


    onBackPress(){
        if(this.refs.dictionary || this.refs.excel) {
            if (this.state.durum !== "main") {
                this.setState({durum: "main"});
                return true;
            }
        }
        else return false;
    }

    downloadFileToDevice(){
        if(this.pdfDownloadURL !== undefined) {
            const options = {
                fromUrl: this.pdfDownloadURL,
                toFile: this.pdfPathFromUrl
            };
            RNFS.downloadFile(options).promise.then(res => {
                this.setState({isPdfDownload: true});
                this.pdfDownloadURL = "";
            }).catch(err => {
                ToastAndroid.showWithGravity("Invalid Url", ToastAndroid.LONG, ToastAndroid.CENTER);
            });
        }
        if(this.pdfPathFromDevice !==undefined)
            this.setState({isPdfDownload: true});

    }
    componentWillUnmount(){
        BackAndroid.removeEventListener('hardwareBackPress', this.onBackPress.bind(this));
    }


    componentDidMount() {
        console.log("downloadurl" , this.pdfDownloadURL);
        BackAndroid.addEventListener('hardwareBackPress', this.onBackPress.bind(this));
        this.downloadFileToDevice();
    }
}
const styles = StyleSheet.create({
    header: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#1E88E5",
        justifyContent: "space-between",
    },
    footer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#1E88E5",
        justifyContent: "space-around",
    },
    loading: {
        flex: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pdf: {
        flex: 14
    },
    fileName: {
        color: "#fbfff6",
        fontWeight: "bold",
        fontSize: 16
    },
    headerItems: {
        flexDirection: "row",
        alignItems: "center",
    }
});