import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MapComponent } from './map/map.component';
import { ProfileComponent } from './profile/profile.component';
import { AngularFireAuthGuard, loggedIn, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToHome = () => redirectUnauthorizedTo(['']);

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
    component: ProfileComponent,
    canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectUnauthorizedToHome}
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
  ProfileComponent
]
