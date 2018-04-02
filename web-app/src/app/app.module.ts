import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ContractsService } from './services/contracts.service';
import { RegisterComponent } from './components/register/register.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { VerifyComponent } from './components/verify/verify.component';
import { UpdateComponent } from './components/update/update.component';
import { QRCodeModule } from 'angularx-qrcode';

const appRoutes: Routes = [
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'update',
    component: UpdateComponent
  },
  { path: '',
  component: VerifyComponent,
  pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    PageNotFoundComponent,
    VerifyComponent,
    UpdateComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes
    ),
    QRCodeModule,
    BrowserModule,
    FormsModule,
  ],
  providers: [ ContractsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
