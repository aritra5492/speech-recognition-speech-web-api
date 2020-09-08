import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TaskComponent } from './task.component';

@NgModule({
  imports: [
    CommonModule,
    TaskRoutingModule
  ],
  declarations: [TaskComponent]
})
export class TaskModule { }
