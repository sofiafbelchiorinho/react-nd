import React from 'react';
import { Text, View, FlatList, StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native'
import {fetchData} from './../actions'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import Deck from '../components/Deck'

class DeckList extends React.Component {

  getKey = (item, index) => {
    return item.title
  }
  
  renderItem = ({item}) => {
    return (
    <TouchableOpacity 
      style={styles.deckItem} key={item.title} 
      onPress={() => this.props.navigation.navigate('Deck',  {deckId: item.title})} >
      <View>
        <Text style={styles.deckName}>{item.title}</Text>   
        <Text style={styles.deckCardsNumber}>{item.questions.length} cards</Text>   
      </View>  
    </TouchableOpacity>)
  }
  
  render() {
    const {decks} = this.props
    return (
      <View style={{flex: 1}}>
        <FlatList data={decks} renderItem={this.renderItem} keyExtractor={this.getKey}/>
      </View>
    );
  }
}

function mapStateToProps(data) {
  let decks = [];
  Object.keys(data).map((key, index) => {
    let deck = data[key];
    decks.push(deck)
  });

  return {
    decks
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchData: (data) => dispatch(fetchData(data))
  }  
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckList)


//styles
const styles = StyleSheet.create({
  deckItem: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 30,
    paddingBottom: 30,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  deckName: {
    fontSize: 20,
    color: '#000',
    alignSelf: 'center',
  },
  deckCardsNumber: {
    color: '#999',
    alignSelf: 'center'
  }
})
