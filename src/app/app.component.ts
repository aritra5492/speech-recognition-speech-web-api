import { Component, OnInit } from '@angular/core';
import { VoiceRecognitionService } from './service/voice-recognition.service';
import { WebSocketService } from './service/web-socket.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { appRoutes } from './app-routing.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [VoiceRecognitionService, WebSocketService]
})
export class AppComponent implements OnInit {
  pageTitle = 'Home';

  constructor(
    public service : VoiceRecognitionService,
    public _webSocketService: WebSocketService,
    private _router: Router
  ) { 
    this.service.init()
    // this.service.recognition.addEventListener('speechstart', function(){
    //   this.startService();
    // });
    // this.service.recognition.addEventListener('speechend', function(){
    //   this._webSocketService.emit('text-event', this.service.text);
    // });
    this._router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((e: NavigationEnd) => {
      appRoutes.forEach(route => {
        if (e.url === ('/' + route.path)) {
          this.pageTitle = route.data.name;
        }
      });
    })
   }

  ngOnInit() {
    this.startService();
    this._webSocketService.listen('formattedtext-event').subscribe((data: string) => {
      console.log("Final Data ",data);
      if(data){
        let text = data.toLowerCase();
        appRoutes.forEach(route =>{
          if (text.indexOf(route.path || 'home') == 0){
            this._router.navigateByUrl('/' + route.path);
          }
        }, error => {
          console.log(error);
        })
      }
    })
  }

  startService(){
    this.service.start()
    //console.log('hello');
    //this._webSocketService.emit('audio-event', this.service.text);
    //console.log(typeof(this.service.text));
  }

  stopService(){
    this.service.stop();
  }
}
