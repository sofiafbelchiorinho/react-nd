import React from 'react';
import {addCard, _addCard} from './../actions'
import { connect } from 'react-redux'
import { purple, lightPurp, white, red} from './../colors'
import { Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

class AddCard extends React.Component {

  state = {
    question: null,
    answer: null
  }

  handleQuestionChange = (question) => {
    this.setState(() => ({ question }))
  }

  handleAnswerChange = (answer) => {
    this.setState(() => ({ answer }))
  }

  handleAddCard = () => {
    const { deck } = this.props
    const { question, answer } = this.state;    
    this.props._addCard(deck, { question, answer});
    this.props.navigation.navigate('Deck', {deckId: deck.title});
    this.setState(() => ({
      question: null,
      answer: null
    }))   
   
  }

  render() {
    const { question, answer } = this.state;
    return (
      <View style={styles.container}>
        <TextInput style={styles.control} placeholder="Enter the question" value={question} onChangeText={this.handleQuestionChange} />
        {!question && <Text style={{color: red, fontSize: 10}} >mandatory field</Text>}
        <TextInput style={styles.control} placeholder="Enter the answer" value={answer} onChangeText={this.handleAnswerChange} />
        {!answer && <Text style={{color: red, fontSize: 10}} >mandatory field</Text>}
        <TouchableOpacity 
            style={(!question || !answer) ? [styles.btn, styles.disabled] : styles.btn} 
            onPress={this.handleAddCard} 
            disabled={!question || !answer}>
          <Text style={{color: white}}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

function mapStateToProps(decks, props) {
  const deck = decks[props.navigation.state.params.deckId];
  return {
    deck
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addCard: (deck, card) => dispatch(addCard(deck, card)), //with AsyncStorage
    _addCard: (deck, card) => dispatch(_addCard(deck, card)) //with Redux
  }  
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCard)


const styles = StyleSheet.create({
  container: { 
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 30
  },
  control: {
    padding: 10
  },
  btn: {
    padding: 10,
    width: 100,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 4,
    alignSelf: 'center', 
    backgroundColor: purple
  },
  disabled:  {
    backgroundColor: lightPurp
  }
})
