import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { blue, white, red, green, pink, orange, purple } from './../colors'
import { setLocalNotification, clearLocalNotification } from '../utils/helpers'
import { connect } from 'react-redux'
import {fetchData} from './../actions'

class Quiz extends React.Component {

  state = {
    currentQuestion: 0,
    wrongAnswers: 0,
    rightAnswers: 0,
    showAnswer: false
  }

  giveAnswer = (type) => {
    if(type === 'right'){
      this.incrementRightAnswers();
    }else if(type === 'wrong'){
      this.incrementWrongAnswers();
    }  
  }
   
  peekAnswer = () => {
    this.setState((prevState) => {
      return{
        ...prevState,
        showAnswer: !prevState.showAnswer
      }
    })
  }

  incrementRightAnswers = () => {
    this.setState((prevState) => {
      return{
        ...prevState,
        rightAnswers: prevState.rightAnswers + 1,
        currentQuestion: prevState.currentQuestion + 1
      }
    })
  }

  incrementWrongAnswers = () => {
    this.setState((prevState) => {
      return{
        ...prevState,
        wrongAnswers: prevState.wrongAnswers + 1,
        currentQuestion: prevState.currentQuestion + 1
      }
    })
  }

  restartQuiz = () => {
    this.setState({
      currentQuestion: 0,
      wrongAnswers: 0,
      rightAnswers: 0,
      showAnswer: false
    });
  }

  render() {
    const { deck, questions } = this.props;
    const { currentQuestion, showAnswer } = this.state;
    const question = questions[currentQuestion];

    if(!question){
      let score = Math.round(((this.state.rightAnswers / this.props.questions.length) * 100), 2);
      let endMsg = score > 80 ?  `Congratulations! Your on your way to master ${this.props.deck.title}` : `Nice try! Keep on studying ${this.props.deck.title}`; 
      clearLocalNotification().then(setLocalNotification());

      return (<ScrollView>
        <View style={styles.results}>
          <Text>Your score is: {score} %</Text>     
          <Text style={{marginBottom: 20}}>{endMsg}</Text>
          <TouchableOpacity  
              style={[styles.quizBtn, {backgroundColor: purple}]} 
              onPress={() => this.restartQuiz()}> 
            <Text style={{color: white}}>Restart Quiz</Text>    
          </TouchableOpacity>
        </View>
      </ScrollView>)
    }else{
      return (<View  style={styles.quiz}>              
      <ScrollView> 
        <Text style={styles.progress}>{currentQuestion+1}/{questions.length}</Text>
        <View>        
          <View style={{flex: 1}}>
            { !showAnswer && 
              <View style={styles.card}>
                <Text style={styles.question}>{question.question}</Text>
                <TouchableOpacity  
                    style={styles.redLinkBtn}
                    onPress={() => this.peekAnswer()}> 
                  <Text style={{color: red}}>Answer</Text>    
                </TouchableOpacity>
              </View>
            }
            { showAnswer && 
              <View style={styles.card}>
                <Text style={styles.question}>{question.answer}</Text>
                <TouchableOpacity  
                    style={styles.redLinkBtn}
                    onPress={() => this.peekAnswer()}> 
                  <Text style={{color: red}}>Question</Text>    
                </TouchableOpacity>
              </View>
            }   
            <TouchableOpacity 
                style={[styles.quizBtn, styles.correctBtn]}
                onPress={() => this.giveAnswer('right')} >
              <Text style={{color: white}}>Correct</Text>    
            </TouchableOpacity>
            <TouchableOpacity 
                style={[styles.quizBtn, styles.wrongBtn]} 
                onPress={() => this.giveAnswer('wrong')} >
              <Text style={{color: white}}>Wrong</Text>    
            </TouchableOpacity>
          </View>           
        </View>  
      </ScrollView>        
    </View>)
    }
  }
}

function mapStateToProps(decks, props) {
  const deck = decks[props.navigation.state.params.deckId];
  return {
    deck,
    questions: deck.questions.map((question, index) => {
      return {
        ...question,
        number: index
      }
    })
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
)(Quiz)

const styles = StyleSheet.create({
  quiz: { 
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch', 
    padding: 10
  },
  results: { 
    backgroundColor: white,
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 15,
    margin: 10,
    borderRadius: 4,
  },
  card:{
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'stretch',
    backgroundColor: white,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
    padding: 15,
    borderRadius: 4
  },
  progress:{ 
    flex: 1,
    alignItems: 'flex-start'
  },
  question:{
    fontSize: 20,
    alignSelf: 'center',
    marginBottom: 10
  },
  quizBtn: {
    padding: 10,
    width: 100,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 4,
    alignSelf: 'center', 
  },
  redLinkBtn:{
    alignSelf: 'center',
  },
  correctBtn: {
    backgroundColor: green,    
  },
  wrongBtn: {
    backgroundColor: red,
  },
  cardFront:{
    flex: 1,
  },
  cardBack: {
    flex: 1,
  }
})
