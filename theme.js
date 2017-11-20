'use strict'

import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default class Theme extends Component<{}> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>
                    {this.props.theme_id}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});