import React from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Animated
} from 'react-native';
import {WindowDimensions} from './constants';
import Card from './card';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      parts: [
        {
          id: 1,
          title: "Jolie fleur",
          comment: "Merci, les félicitations nous font toujours plaisir.  Bonne journée.",
          url: "https://www.popvox.fr/popvox/img/photos/2017/9/11/7e6219f403782d8b1919fad99499a6" +
              "da.jpg"
        }, {
          id: 2,
          title: "Lorem ipsum",
          comment: "Circa hos dies Lollianus primae lanuginis adulescens, Lampadi filius ex praefect" +
              "o, exploratius causam Maximino spectante, convictus codicem noxiarum artium nond" +
              "um per aetatem firmato consilio descripsisse, exulque mittendus, ut sperabatur, " +
              "patris inpulsu provocavit ad principem, et iussus ad eius comitatum duci, de fum" +
              "o, ut aiunt, in flammam traditus Phalangio Baeticae consulari cecidit funesti ca" +
              "rnificis manu.",
          url: "https://www.popvox.fr/popvox/img/photos/2017/8/24/c50543d8b25b592be7289bf9821db4" +
              "f0.jpg"
        }
      ]
    };

    this._renderItem = this
      ._renderItem
      .bind(this);
  }



  _renderItem({item}) {
    return (
      <Card item={item}/> 
    );
  }

  render() {
    return (<FlatList
      style={styles.list}
      ref={(ref) => { this.flatListRef = ref; }}
      showsVerticalScrollIndicator={false}
      renderItem={this._renderItem}
      data={this.state.parts}
      keyExtractor={item => item.id}/>);
  }
}

const styles = StyleSheet.create({
  list: {
    paddingTop: 50,
    backgroundColor: "#86D6DD",
  }
});