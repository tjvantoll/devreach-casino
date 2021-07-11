import React, { useState, useEffect } from 'react';
import { SketchPicker } from 'react-color'
import { Input, Button } from 'antd'
import { DataStore } from 'aws-amplify'
import { Message } from '../models'

import Amplify from 'aws-amplify';
import config from '../aws-exports';
Amplify.configure(config);

const initialState = { color: '#000000', title: '' }

function NaderDabit() {
  const [formState, updateFormState] = useState(initialState)
  const [messages, updateMessages] = useState([])
  const [showPicker, updateShowPicker] = useState(false)
  useEffect(() => {
    fetchMessages()
    DataStore.observe(Message).subscribe(() => fetchMessages())
  }, [])
  async function fetchMessages() {
    const messages = await DataStore.query(Message)
    updateMessages(messages)
  }
  function onChange(e) {
    if (e.hex) {
      updateFormState({ ...formState, color: e.hex })
    } else {
      updateFormState({ ...formState, title: e.target.value })
    }
  }
  async function createMessage() {
    if (!formState.title) return
    await DataStore.save(new Message({ ...formState }))
    updateFormState(initialState)
  }
  return (
    <div>
      <h1>My message app</h1>
      <Input
        onChange={onChange}
        name="title"
        placeholder="Message title"
        value={formState.title}
        style={input}
      />
      <div>
        <Button onClick={() => updateShowPicker(!showPicker)}>Toggle Color Picker</Button>
        <p>Color: <span style={{color: formState.color}}>{formState.color}</span></p>
      </div>
      { showPicker && <SketchPicker color={formState.color} onChange={onChange} />}
      <Button onClick={createMessage}>Create message</Button>
      {
        messages.map((message, index) => (
          <div key={index} style={{ ...messageStyle, backgroundColor: message.color }}>
            <div style={messageBg}>
              <p style={messageTitle}>{message.title}</p>
            </div>
          </div>
        ))
      }
    </div>
  )
}

const container = { width: '100%', padding: 40, maxWidth: 900 }
const input = { marginBottom: 10 }
const button = { marginBottom: 10 }
const heading = { fontWeight: 'normal', fontSize: 40 }
const messageBg = { backgroundColor: 'white' }
const messageStyle = { padding: '20px', marginTop: 7, borderRadius: 4 }
const messageTitle = { margin: 0, padding: 9, fontSize: 20  }

export default NaderDabit;
