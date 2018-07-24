import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PickPicComponent } from '../pickPic/pickPic.component';
import { MyPicComponent } from '../myPic/myPic.component';
import { EditPicComponent } from '../editPic/editPic.component';
import { Page404Component } from '../errorPage/404/404Page.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: './editPic', pathMatch: 'full' },
      { path: 'pickPic', component: PickPicComponent },
      { path: 'editPic', component: EditPicComponent },
      { path: 'myPic', component: MyPicComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
