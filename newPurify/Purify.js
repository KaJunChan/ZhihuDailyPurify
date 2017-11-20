import React from 'react';
import {
    View, Image, Text, Dimensions, TouchableNativeFeedback,
    FlatList, TouchableOpacity
} from 'react-native';
import {IndicatorViewPager, PagerDotIndicator} from "rn-viewpager";

const new_purify_url = "https://news-at.zhihu.com/api/4/news/latest";

export default class Purify extends React.Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            stories: [],
            top_stories: [],
        }
    }

    componentWillMount() {
        this.fetchPurify(new_purify_url);
    }


    render() {
        let top_stories = this.state.top_stories;
        if (top_stories !== null && top_stories !== undefined) {
            console.log('top_stories', typeof (top_stories));
            let pageItems = [];
            if (top_stories !== undefined) {
                for (let i in top_stories) {
                    let item = top_stories[i];
                    console.log('image', item.image);
                    pageItems.push(this.renderPage(item));
                }
            }
            return (
                <View style={{flex: 1, backgroundColor: '#F3F3F3'}}>
                    <IndicatorViewPager
                        style={{
                            height: 200,
                        }}
                        indicator={(<PagerDotIndicator pageCount={pageItems.length}/>)}
                    >
                        {
                            pageItems
                        }
                    </IndicatorViewPager>
                    {
                        this.renderPurifyList()
                    }
                </View>
            );
        } else {
            return <View><Text>loading...</Text></View>
        }
    }

    renderPage(item) {
        if (item === undefined) {
            return <View><Text>undefinded</Text></View>
        }
        return (
            <View style={{flex: 1}} key={item.id}>
                <TouchableNativeFeedback
                >
                    <View style={{
                        height: 200, justifyContent: 'flex-end'
                    }}>
                        <Image
                            style={{flex: 1, width: Dimensions.get('window').width, height: 250, position: 'absolute'}}
                            source={{uri: item.image}}
                        />
                        <Text style={{
                            color: 'white',
                            marginHorizontal: 16,
                            fontSize: 18,
                            marginBottom: 20,
                        }}>{item.title}</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        );
    }

    renderPurifyList() {
        let {navigate} = this.props.navigation ? this.props.navigation : null;
        return (
            <View style={{marginHorizontal: 8, marginTop: 8, flex: 1}}>
                <FlatList
                    data={this.state.stories}
                    ListHeaderComponent={
                        <Text style={{color: '#6F6F6F', fontSize: 15, marginVertical: 8, marginLeft: 4}}>今天热闻</Text>
                    }
                    renderItem={({item}) => (
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => {
                                if (navigate != null) {
                                    navigate("Detail", {purifyId: item.id})
                                } else {
                                    console.log('params', 'params is null');
                                }
                            }}
                        >
                            <View style={{
                                height: 100,
                                borderRadius: 5,
                                backgroundColor: 'white',
                                flex: 1,
                                flexDirection: 'row',
                                marginVertical: 4,
                                elevation: 2,
                                paddingVertical: 8,
                                paddingHorizontal: 8,
                            }}
                            >
                                <Text
                                    style={{color: '#333333', fontSize: 16, width: 200}}>{item.title}</Text>
                                <View style={{flex: 1}}/>
                                <Image style={{width: 100, height: 80}} source={{uri: item.images[0]}}/>
                            </View>
                        </TouchableOpacity>
                    )}
                    showsVerticalScrollIndicator={false}
                    style={{
                        flex: 1,
                    }}
                    keyExtractor={(item, index) => item.id}
                />
            </View>
        );
    }

    fetchPurify(new_purify_url) {
        fetch(new_purify_url, {})
            .then((response) => response.json())
            .then((json) => {
                this.setState({
                    stories: json.stories,
                    top_stories: json.top_stories,
                });
            }).done();
    }
}