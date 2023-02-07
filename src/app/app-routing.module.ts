import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BenzineComponent } from './components/art/benzine/benzine.component';
import { LissajousComponent } from './components/art/lissajous/lissajous.component';
import { ArtPageComponent } from './pages/art-page/art-page.component';
import { CodingPageComponent } from './pages/coding-page/coding-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { MusicPageComponent } from './pages/music-page/music-page.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';

const routes: Routes = [
  { path: 'home-page', component: LandingPageComponent },
  { path: 'Dijkstra', component: MusicPageComponent },
  { path: 'Art', component: ArtPageComponent },
  { path: 'Coding', component: CodingPageComponent },
  { path: 'Contact', component: ContactPageComponent },
  { path: 'Benzine', component: BenzineComponent },
  { path: 'Lissajous', component: LissajousComponent },
  { path: '', redirectTo: '/home-page', pathMatch: 'full' },
  { path: '**', pathMatch: 'full', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
