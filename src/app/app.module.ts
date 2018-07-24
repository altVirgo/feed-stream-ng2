import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { NgZorroAntdModule, NZ_LOCALE, enUS, zhCN } from 'ng-zorro-antd';
import { AppRoutingModule } from './router.module';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { Page404Component } from './errorPage/404/404Page.component';
import { SharedModule } from './shared/modules/shared.module';
// import DashboardModule from './dashboard/dashboard.module';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgZorroAntdModule.forRoot(),
    SharedModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    Page404Component
  ],
  providers: [{ provide: NZ_LOCALE, useValue: zhCN }],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
