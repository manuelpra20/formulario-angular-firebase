import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MessageI } from '../models/message.interface';

@Injectable({
  providedIn: 'root'
})
export class DataDbService {

  private contactCollaction: AngularFirestoreCollection<MessageI>;

  constructor(private afs: AngularFirestore) {
    this.contactCollaction = afs.collection<MessageI>('contacts');
  }

  saveMessage(newContact: MessageI): void{
    this.contactCollaction.add(newContact);
  }
}
