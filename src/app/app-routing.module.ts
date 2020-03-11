import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MapComponent } from './map/map.component';
import { ProfileComponent } from './profile/profile.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';



const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'map',
    component: MapComponent
  },
  {  
    path: 'profile',
    component: ProfileComponent
  },  
  { 
  path: 'questionnaire',
  component: QuestionnaireComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [
  HomeComponent,
  MapComponent,
  ProfileComponent,
  QuestionnaireComponent
]
