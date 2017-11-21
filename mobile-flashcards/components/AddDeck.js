import React from 'react';
import {addDeck, _addDeck} from './../actions'
import { connect } from 'react-redux'
import { purple, white, lightPurp, red} from './../colors'
import { Text, View, TouchableOpacity, TextInput,StyleSheet } from 'react-native';

class AddDeck extends React.Component {

  state = {
    input: null
  }

  handleTextChange = (input) => {
    this.setState(() => ({
      input
    }))
  }

  handleAddDeck = () => {
    this.props._addDeck(this.state.input);  
    this.props.navigation.navigate('Deck', {deckId: this.state.input});
    this.setState(() => ({
      input: null
    }));   
  }

  render() {
    const { input } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.question}>What is the title of your new deck?</Text>
        <TextInput
          style={styles.control}
          value={input}
          onChangeText={this.handleTextChange}
        />
        {!input && <Text style={{color: red, fontSize: 10}} >mandatory field</Text>}
        <TouchableOpacity style={!input ? [styles.btn, styles.disabled] : styles.btn} onPress={this.handleAddDeck} disabled={!input}>
          <Text style={{color: white}}>Create Deck</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

function mapStateToProps(decks, props) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {
    addDeck: (data) => dispatch(addDeck(data)), //with AsyncStorage
    _addDeck: (data) => dispatch(_addDeck(data)) //with Redux
  }  
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddDeck)


const styles = StyleSheet.create({
  container: { 
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 30
  },
  question: {
    fontSize: 30, 
    textAlign: 'center',
    marginBottom: 15
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
  disabled:{
    backgroundColor: lightPurp
  }
})
