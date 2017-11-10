import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpModule } from '@angular/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { LOCALE_ID } from '@angular/core';

registerLocaleData(localeEs);

import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { PurchasesComponent } from './purchases/purchases.component';

import { ApiService } from './services/api.service';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    PurchasesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    ModalModule.forRoot()
  ],
  providers: [ApiService,
    { provide: LOCALE_ID, useValue: "es-ES" }],
  bootstrap: [AppComponent]
})
export class AppModule { }
