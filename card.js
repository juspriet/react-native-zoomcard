import React from 'react';
import {
    Text,
    View,
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Easing
} from 'react-native';
import {WindowDimensions} from './constants';

export default class Card extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            cardOffsetYAnim: new Animated.Value(0),
            deployed: false,
            imageHeightAnim: new Animated.Value(100),
            cardWidthAnim: new Animated.Value(WindowDimensions.width - 20),
            cardMarginLeftAnim: new Animated.Value(10),
            cardBorderRadiusAnim: new Animated.Value(10),
            cardPosition: new Animated.Value({})
        };

        this._getDetailedCard = this
            ._getDetailedCard
            .bind(this);
    }

    _getDetailedCard() {

        if (!this.state.deployed) {

            this
                .refs
                .container
                .measure((fx, fy, width, height, px, py) => {

                    Image.getSize(this.props.item.url, (width, height) => {

                        
                        if (width !== 0) {
                            Animated.parallel([
                                Animated.timing(this.state.imageHeightAnim, {
                                    toValue: WindowDimensions.width * height / width,
                                    duration: 300
                                }),
                                Animated.timing(this.state.cardWidthAnim, {
                                    toValue: WindowDimensions.width,
                                    duration: 300
                                }),
                                Animated.timing(this.state.cardMarginLeftAnim, {
                                    toValue: 0,
                                    duration: 300
                                }),
                                Animated.timing(this.state.cardBorderRadiusAnim, {
                                    toValue: 0,
                                    duration: 300
                                }),
                                Animated.timing(this.state.cardOffsetYAnim, {
                                    toValue: -py,
                                    duration: 300
                                })
                            ]).start();
                        }
                    });
                });

            this.setState({deployed: true});
        } else {
            Animated.parallel([
                Animated.timing(this.state.imageHeightAnim, {
                    toValue: 100,
                    duration: 300
                }),
                Animated.timing(this.state.cardWidthAnim, {
                    toValue: WindowDimensions.width - 20,
                    duration: 300
                }),
                Animated.timing(this.state.cardMarginLeftAnim, {
                    toValue: 10,
                    duration: 300
                }),
                Animated.timing(this.state.cardBorderRadiusAnim, {
                    toValue: 10,
                    duration: 300
                }),
                Animated.timing(this.state.cardOffsetYAnim, {
                    toValue: 0,
                    duration: 300
                })
            ]).start();

            this.setState({deployed: false});
        }
    }

    render() {
        return (
            <Animated.View
                style={{
                width: this.state.cardWidthAnim,
                marginLeft: this.state.cardMarginLeftAnim,
                transform: [
                    {
                        translateY: this.state.cardOffsetYAnim
                    }
                ]
            }}>
                <View style={styles.cardBorder}></View>

                <TouchableOpacity
                    ref="container"
                    activeOpacity={0.9}
                    onPress={this._getDetailedCard}>

                    <Animated.View
                        style={{
                        backgroundColor: "#fff",
                        borderRadius: this.state.cardBorderRadiusAnim,
                        overflow: 'hidden',
                        paddingBottom: 7
                    }}>

                        <Animated.Image
                            source={{
                            uri: this.props.item.url
                        }}
                            resizeMode='cover'
                            style={{
                            height: this.state.imageHeightAnim
                        }}/>

                        <View style={styles.titleView}>
                            <Text style={styles.title}>{this.props.item.title}</Text>
                        </View>

                        <View style={styles.commentView}>
                            <Text style={styles.comment} numberOfLines={3}>
                                {this.props.item.comment}
                            </Text>
                        </View>

                    </Animated.View>

                </TouchableOpacity>
            </Animated.View>
        );
    }

}

const styles = StyleSheet.create({
    commentView: {
        padding: 10
    },
    comment: {
        fontSize: 16,
        textAlign: 'justify'
    },
    titleView: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10
    },
    title: {
        fontSize: 21,
        color: '#33B8C7',
        fontWeight: '400'
    },
    cardBorder: {
        backgroundColor: 'rgba(255,255,255,0.5)',
        height: 8,
        marginTop: 10,
        marginLeft: 6,
        marginRight: 6,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    }
});