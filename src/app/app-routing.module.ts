import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

export const appRoutes: Routes = [
  { path: '', data: { name: 'Home' }, loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'note', data: { name: 'Notes' }, loadChildren: () => import('./notes/notes.module').then(m => m.NotesModule) },
  { path: 'task', data: { name: 'Task' }, loadChildren: () => import('./task/task.module').then(m => m.TaskModule) },
  { path: 'event', data: { name: 'Event' }, loadChildren: () => import('./event/event.module').then(m => m.EventModule) },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],


})
export class AppRoutingModule { }
