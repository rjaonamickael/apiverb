// src/app/app.module.ts
import { HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { authTokenInterceptor } from './security/interceptors/auth-token.interceptor';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
    
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useValue: authTokenInterceptor,
    multi: true
  }
],
  bootstrap: []
})
export class AppModule { }
