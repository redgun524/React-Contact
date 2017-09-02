import React, { Component } from 'react';
import Header from './components/Header';
import ViewSelector from './components/ViewSelector';
import Container from './components/Container';
import FloatingButton from './components/FloatingButton';
import ContactModal from './components/ContactModal';
import Dimmed from './components/Dimmed';
import ContactList from './components/ContactList';
import shortid from 'shortid'
import Input from './components/Input'
import FavoriteList from './components/FavoriteList';

import oc from 'open-color';

function generateRandomColor() {
    const colors = [
        'gray',
        'red',
        'pink',
        'grape',
        'violet',
        'indigo',
        'blue',
        'cyan',
        'teal',
        'green',
        'lime',
        'yellow',
        'orange'
    ];

    // 0 부터 12까지 랜덤 숫자
    const random = Math.floor(Math.random() * 13);

    return oc[colors[random]][6];
}

class App extends Component {
  state = {
    view: 'favorite',
    modal: {
      visible: false,
      mode: null
      /*name, phone, color ...*/
    },
    search: '',
    contacts: [
      {
          "id": "SyKw5cyAl",
          "name": "김민준",
          "phone": "010-0000-0000",
          "color": "#40c057",
          "favorite": true
      },
      {
          "id": "r1s_9c10l",
          "name": "아벳",
          "phone": "010-0000-0001",
          "color": "#12b886",
          "favorite": true
      },
      {
          "id": "BJcFqc10l",
          "name": "베티",
          "phone": "010-0000-0002",
          "color": "#fd7e14",
          "favorite": false
      },
      {
          "id": "BJUcqqk0l",
          "name": "찰리",
          "phone": "010-0000-0003",
          "color": "#15aabf",
          "favorite": false
      },
      {
          "id": "rJHoq91Cl",
          "name": "데이비드",
          "phone": "010-0000-0004",
          "color": "#e64980",
          "favorite": false
      }
    ]
  }

  handleSelectView = (view) => this.setState({view})

  modalHandler = {
    show: (mode, payload) => {
      this.setState({
        modal: {
          mode,
          visible: true,
          ...payload
        }
      })
    },
    hide: () => {
      this.setState({
        modal: {
          ...this.state.modal,
          visible: false
        }
      })
    },
    change: ({name, value}) => {
      this.setState({
        modal: {
          ...this.state.modal,
          [name]: value
        }
      })
    },
    action: {
      create: () => {
        const id = shortid.generate()
        const {contacts, modal: {name, phone, color}} = this.state
        const contact = {
          id,
          name,
          phone,
          color,
          favorite: false
        }
        this.setState({
          contacts: [...contacts, contact]
        })

        this.modalHandler.hide()
      },
      modify: () => {
        const {
          modal: {name, phone, index},
          contacts
        } = this.state

        const item = contacts[index]
        this.setState({
          contacts: [
            ...contacts.slice(0, index),
            {
              ...item,
              name,
              phone
            },
            ...contacts.slice(index + 1, contacts.length)
          ]
        })

        this.modalHandler.hide()
      },
      remove: () => {
        console.log('@@@@@')
        const {
          modal: {name, phone, index},
          contacts
        } = this.state

        this.setState({
          contacts: [
            ...contacts.slice(0, index),
            ...contacts.slice(index + 1, contacts.length)
          ]
        })

        this.modalHandler.hide()
      }
    }
  }

  itemHandler = {
    toggleFavorite: null,
    openModify: (id) => {
      const { contacts } = this.state;
      // id 로 index 조회
      const index = contacts.findIndex(contact => contact.id === id);
      const item = this.state.contacts[index];

      this.modalHandler.show(
        'modify',
        {
            ...item,
            index
        }
      );
    }
  }

  handleFloatingButtonClick = () => {
    const { view } = this.state
    if(view !== 'list') {
      this.setState({view: 'list'})
    }

    this.modalHandler.show('create', {
      name: '',
      phone: '',
      color: generateRandomColor()
    })
  }

  handleSearchChange = (e) => {
    this.setState({
      search: e.target.value
    })
  }

  render() {
    const {
      handleSelectView,
      handleFloatingButtonClick,
      modalHandler,
      itemHandler,
      handleSearchChange
    } = this;
    const {view, modal, contacts, search} = this.state;
    return (
      <div>
        <Header/>
        <ViewSelector onSelect={handleSelectView} selected={view}/>
        <Container visible={view === 'favorite'}>
          <FavoriteList contacts={contacts}/>
        </Container>
        <Container visible={view === 'list'}>
          <Input
            onChange={handleSearchChange}
            value={search}
            placeholder="검색"
          />
          <ContactList
            contacts={contacts}
            onOpenModify={itemHandler.openModify}
            search={search}
          />
        </Container>
        <ContactModal
          {...modal}
          onHide={modalHandler.hide}
          onAction={modalHandler.action[modal.mode]}
          onChange={modalHandler.change}
          onRemove={modalHandler.action.remove}
        />
        <Dimmed visible={modal.visible}></Dimmed>
        <FloatingButton onClick={handleFloatingButtonClick}/>
      </div>
    );
  }
}
export default App;
