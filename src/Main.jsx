import React from 'react';
import { ChatFeed, Message, ChatBubbleProps } from 'react-chat-ui';
import axios from 'axios'
export default class Main extends React.Component {
    constructor(){
        super()
        this.state = {
            messages: [
              
            ],
            msg: 3
            //...
          };
    }
    insertMsg = (msg,id) =>{
        let tmp = this.state.messages
        tmp.push(new Message({id: id, message: msg}))
       this.setState({
           messages: tmp,
           counter: this.state.counter++

       })
    }
    
  render() {
    return (
       <div className="messagebox">
           <div className="form">
            <ChatFeed
               messages={this.state.messages} 
              isTyping={this.state.is_typing} 
              hasInputField={false} 
             bubblesCentered={false} 
            bubbleStyles={
            {
                text: {
                fontSize: 15
                },
                chatbubble: {
                borderRadius: 0,
                padding: 10
                }
            }
        }
      />
       </div>
       <div className="submit">
           <input type="text" id="msg" placeholder="Enter message" onChange={e=> this.setState({msg:e.target.value})  }/>
           <button id="btn" onClick={()=> {
               this.insertMsg(this.state.msg,0)
               let input = document.querySelector('input')
               let out = {
                   statement: this.state.msg
               }
               axios.post('http://localhost:5000/ask',out).then(res=>{
                   this.insertMsg(res.data,1)
               })
               input.value = ''
           }}> Submit</button>
       </div>
       </div>
    );
  
}}
