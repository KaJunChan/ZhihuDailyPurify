'use strict'
import React from 'react';
import {Image, Text, View, WebView, Dimensions} from "react-native";

const {width, height} = Dimensions.get('window');
export default class Detail extends React.Component<{}> {
    constructor(props) {
        super(props);
        let purifyId = this.props.navigation.state.params.purifyId ?
            this.props.navigation.state.params.purifyId : null;
        this.state = {
            purifyId: purifyId,
            detail: {},
        }
    }

    componentWillMount() {
        fetch("https://news-at.zhihu.com/api/4/news/" + this.state.purifyId, {})
            .then((response) => response.json())
            .then((json) => {
                this.setState({
                    detail: json,
                })
            })
    }

    render() {
        let {detail} = this.state;
        return (
            <View style={{flex: 1}}>
                <View style={{justifyContent: 'flex-end',}}>
                    <Image
                        style={{width: width, height: 250,}}
                        source={{uri: detail.image}}
                    />
                    <Text style=
                              {{
                                  fontSize: 16,
                                  color: 'white',
                                  fontWeight: 'bold',
                                  position: 'absolute',
                                  marginBottom: 20,
                              }}
                    >
                        {detail.title}
                    </Text>
                </View>

                <WebView
                    style={{flex: 1}}
                    source={{html: detail.body}}
                    scalesPageToFit={true}
                    domStorageEnabled={true}
                    javaScriptEnabled={true}
                    mixedContentMode={'compatibility'}
                />
            </View>
        );
    }
}