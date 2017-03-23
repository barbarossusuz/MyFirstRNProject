'use strict';
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

import { Router, Scene } from 'react-native-router-flux';

import WelcomePage from "./src/WelcomePage";
import PdfViewer from "./src/PdfViewer";
import Dictionary from "./src/Dictionary";



class MyFirstRNProject extends Component {


    render() {
        return (
            <Router >
                <Scene key="root">
                    <Scene key="welcomePage"  component={WelcomePage} hideNavBar={true}  initial={true} />
                    <Scene key="pdfViewer" component={PdfViewer} hideNavBar={true}  />
                    <Scene key="dictionaru" component={Dictionary} hideNavBar={true}  />
                </Scene>
            </Router>
        )
    }


}
const styles = StyleSheet.create({});

AppRegistry.registerComponent('MyFirstRNProject', () => MyFirstRNProject);

