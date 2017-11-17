import { AsyncStorage } from 'react-native'

export const FLASHCARDS_STORAGE_KEY = 'FLASHCARDS_STORAGE_KEY'
export const ADD_DECK = "ADD_DECK";
export const ADD_CARD = "ADD_CARD";

export function _addDeck(deck) {
  return {
    type: ADD_DECK,
    deck
  }
}

export function _addCard(deck, card) {
  return {
    type: ADD_CARD,
    card,
    deck
  }
}

export function addCard (card) {
  return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
    [key]: {
      questions: {
        ...this,
        card
      }
    }
  }))
  .then(() => {
    dispatch(_addCard(card));
  })
}

export function addDeck(deck) {
  return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
    [key]: entry
  }))
  .then(() => {
    dispatch(_addDeck(deck));
  })
}