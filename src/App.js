import React, { Component } from 'react';
import List from './List'
import './App.css';

const newRandomCard = () => {
  const id = Math.random().toString(36).substring(2, 4)
    + Math.random().toString(36).substring(2, 4);
  return {
    id,
    title: `Random Card ${id}`,
    content: 'lorem ipsum',
  }
}

class App extends Component {
  static defaultProps = {
    store: {
      lists: [],
      allCards: {},
    }
  };

  state = {
      lists: this.props.store.lists,
      allCards: this.props.store.allCards
  }

  handleDelete = (listId, cardId) => {
    const lists = this.state.lists.map(list => {
      list.cardIds = list.cardIds.filter(id => id !== cardId)
      return list
    })

    const allCards = Object.entries(this.state.allCards).reduce(
      (newObj, [key, value]) =>
          key === cardId ? newObj : {...newObj, [key]: value},
      {}
    )

    this.setState(
      {
        lists,
        allCards
      }
    )
  }

  addRandomCard = (listId) => {
    const lists = this.state.lists
    const listIdx = lists.findIndex(list => list.id === listId)
    const list = lists[listIdx]

    const newCard = newRandomCard();

    list.cardIds.push(newCard.id)
    lists.splice(listIdx, 1, list)

    this.setState({
      lists,
      allCards : {
        ...this.state.allCards,
        [newCard.id]: newCard
      }
    })
  }

  render() {
    const store = this.state
    return (
      <main className='App'>
        <header className='App-header'>
          <h1>Trelloyes!</h1>
        </header>
        <div className='App-list'>
          {store.lists.map(list => (
            <List
              key={list.id}
              id={list.id}
              header={list.header}
              cards={list.cardIds.map(id => store.allCards[id])}
              handleDelete={this.handleDelete}
              addRandomCard={this.addRandomCard}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;
