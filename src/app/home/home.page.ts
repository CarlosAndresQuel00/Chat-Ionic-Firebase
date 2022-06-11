import { Component, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('content') content: any;
  userName = '';
  message = '';
  messages = [];

  constructor(public navCtrl: NavController, private firebaseDB: AngularFireDatabase) {
    this.getMessages();
  }

  getMessages(){
    const messagesRef = this.firebaseDB.database.ref().child('mensajes');
    messagesRef.on('value', (snap) => {
      const data = snap.val();
      this.messages = [];
      // eslint-disable-next-line guard-for-in
      for(const key in data) {
        this.messages.push(data[key]);
      }

      this.scrollToBottom();
    });
  }

  scrollToBottom(){
    const contentEnd = document.getElementById('content-end').offsetTop;
    this.content.scrollTo(0, contentEnd, 300);
  }

  sendMessage(){
    const messagesRef = this.firebaseDB.database.ref().child('mensajes');
    messagesRef.push({mensaje: this.message, nombre: this.userName });
    this.message = '';
  }
}
