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
import Dictionary from "./Dictionary";


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
        this.pdfDownloadURL = this.props.pdfDownloadURL;
        this.fileName = (this.pdfDownloadURL).replace(/^.*[\\\/]/, '').slice(0, -4);

        this.pdfView = null;
        this.pdfPath = RNFS.DocumentDirectoryPath + "/" + this.fileName + ".pdf";

    }

    render() {
        console.log("download", this.pdfPath);

        return (
            <View style={{flex:1}}>

                <View style={styles.header}>
                    {this.renderFileName()}

                    {this.renderPageCount()}

                    {this.addExcelFile()}
                </View>

                {this.state.isPdfDownload ?
                    <PDFView ref={(pdf)=>{this.pdfView = pdf;}}
                             key="sop"
                             path={this.pdfPath}
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


    renderFooter() {
        console.log("main",this.state.durum);
        if (this.state.durum === "main") {
            return (
                <View ref="footer" style={styles.footer}>


                        <View>
                            <TouchableOpacity onPress={()=> this.setState({durum:"dictionary"})}>
                                <Text style={styles.backButton}>{"+"}</Text>
                            </TouchableOpacity>
                        </View>

                        <View>
                            <TouchableOpacity onPress={this.renderExcelFile}>
                                <Text style={styles.backButton}>{"+"}</Text>
                            </TouchableOpacity>
                        </View>


                </View>
            );
        }

         if (this.state.durum === "dictionary") {
            return (
                <Dictionary onChange={this.changeToMainFooter}/>
            );
        }

         if (this.state.durum === "excel") {
            return (
                null
            );
        }
    }


    changeToMainFooter=()=>{
        this.setState({durum: "main"})
    };


    renderExcelFile() {
        this.setState({durum: "excel"});
    }


    addExcelFile() {
        return (
            <View style={{marginRight:10}}>
                <TouchableOpacity onPress={Actions.pop}>
                    <Text style={styles.backButton}>{"+"}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    renderItems() {
        let args = [];
        for (let i = 1; i <= this.state.pageCount; i++) {
            args.push(<Picker.Item key={i.toString()} label={i.toString()} color="black" value={i}/>)
        }
        return args;
    }

    renderTextInput(text) {
        let text1 = parseInt(text);
        if (1 <= text1 <= this.state.pageCount) {
            setTimeout(() => {
                this.setState({pageNumber: text1});
            }, 500)
        }
        else return null;
    }


    renderFileName() {
        if (this.state.isPdfDownload) {
            return (
                <View style={{flexDirection: "row", alignItems: "center",}}>
                    <TouchableOpacity onPress={Actions.pop}>
                        <Text style={styles.backButton}>{"←"}</Text>
                    </TouchableOpacity>
                    <Text style={styles.fileName}>{(this.fileName).toUpperCase()}</Text>
                </View>
            );
        }
        else {
            return (
                <View style={{flexDirection: "row", alignItems: "center",}}>
                    <TouchableOpacity onPress={Actions.pop}>
                        <Text style={styles.backButton}>{"←"}</Text>
                    </TouchableOpacity>
                </View>
            );
        }

    }

    renderPageCount() {
        if (this.state.isPdfDownload) {
            return (
                <View style={styles.deneme}>
                    <View>
                        <Text style={styles.fileName}>{this.state.pageCount + " /"}</Text>
                    </View>
                    <View>
                        <Picker
                            style={{width:50,height:20}}
                            selectedValue={this.state.pageNumber}
                            onValueChange={(text) => this.renderTextInput(text)}
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

    zoom(val = 1) {
        // this.pdfView && setTimeout(() => {
        //     this.pdfView.setNativeProps({zoom: val});
        // }, 3000);
    }

    componentDidMount() {
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
    header: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#15c7ff",
        justifyContent: "space-between",
    },
    footer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#15c7ff",
        justifyContent: "space-between",
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
        fontSize: 16,
        marginLeft: 10
    },
    backButton: {
        color: "#fbfff6",
        fontWeight: "bold",
        fontSize: 30,
        marginBottom: 8
    },

    deneme: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#15c7ff",
    }
});