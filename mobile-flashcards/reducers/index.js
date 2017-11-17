import { 
  ADD_DECK, 
  ADD_CARD
} from '../actions'

const initialState = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}

export default function decks(state = initialState, action){
  const {deck, card, data} = action
  switch (action.type) {
    case ADD_DECK:
      return {
        ...state,
        [deck]: {
          title: deck,
          questions: []
        }
      }  
    case ADD_CARD: 
      return {
        ...state,
        [deck.title]: {
          ...state[deck.title],
          questions: [
            ...state[deck.title].questions,
            card
          ],
          
        }
      }  
    default:
      return state
  }
}