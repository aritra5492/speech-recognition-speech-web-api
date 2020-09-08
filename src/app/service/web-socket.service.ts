import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from "socket.io-client";
import { AUDIO_FILE_UPLOAD_URL } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  readonly url:string = AUDIO_FILE_UPLOAD_URL
  socket: any;

  constructor() {
    this.socket = io(this.url);
   }

  listen(eventName: string){
    return new Observable((subscriber)=>{
      this.socket.on(eventName, (data)=>{
        subscriber.next(data);
      })
    })
  }

  emit(eventName:string, data:any){
    this.socket.emit(eventName, data);
  }
}
