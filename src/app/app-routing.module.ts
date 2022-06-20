import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ObrazovanjeComponent } from './components/model/obrazovanje/obrazovanje.component';
import { AboutComponent } from './components/core/about/about.component';
import { AuthorComponent } from './components/core/author/author.component';
import { HomeComponent } from './components/core/home/home.component';
import { PreduzeceComponent } from './components/model/preduzece/preduzece.component';
import { SektorComponent } from './components/model/sektor/sektor.component';

const routes: Routes = [
  {path: 'obrazovanje', component: ObrazovanjeComponent},
  {path: 'sektor', component: SektorComponent},
  {path: 'preduzece', component: PreduzeceComponent},
  {path: 'about', component: AboutComponent},
  {path: 'author', component: AuthorComponent},
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
