import React from 'react';
import { Text, View, TouchableOpacity, TouchableHighlight, StyleSheet } from 'react-native';
import { purple, lightPurp, white } from './../colors'
import { connect } from 'react-redux'
import {fetchData} from './../actions'

//import { NavigationActions } from 'react-navigation'

class Deck extends React.Component {

  render() {
   
    const { deck, navigation } = this.props;
    
    return (
      <View style={styles.deck}>
        <Text style={styles.deckName}>{deck.title}</Text>      
        <Text style={styles.deckCardsNumber}>{deck.questions.length} cards</Text>
        <TouchableOpacity style={[styles.deckBtn, styles.addCardBtn]}
          onPress={() => navigation.navigate('AddCard', {deckId: deck.title})}>
          <Text style={styles.addCardBtnText}>Create New Question</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={deck.questions.length == 0 ? [styles.deckBtn, styles.quizBtn, styles.disabled] : [styles.deckBtn, styles.quizBtn] } 
          disabled={deck.questions.length == 0}
          onPress={() => navigation.navigate('Quiz', {deckId: deck.title})}>
          <Text style={styles.quizBtnText}>Start a Quiz</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

function mapStateToProps(decks, props) {
  return {
    decks,
    deck: decks[props.navigation.state.params.deckId]
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
)(Deck)



const styles = StyleSheet.create({
  deck: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  deckName: {
    fontSize: 34
  },
  deckCardsNumber: {
    color: '#999'
  },
  deckBtn: {
    padding: 10,
    width: 100,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 20
  },
  quizBtn: {
    backgroundColor: purple,   
    borderRadius: 4
  },
  addCardBtn: {
    backgroundColor: white, 
    borderColor: purple
  },
  disabled: {
    backgroundColor: lightPurp, 
  },
  quizBtnText: {
    color: white,
    textAlign: 'center'
  },
  addCardBtnText: {
    color: purple,
    textAlign: 'center'
  }
})