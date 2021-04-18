import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'form', loadChildren: () => import('./modules/feed-form/feed-form.module').then(m => m.FeedFormModule)},
  { path: '', redirectTo: 'form', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
