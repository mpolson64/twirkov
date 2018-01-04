import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TweetCardComponent } from './components/tweet-card/tweet-card.component';
import { CardHolderComponent } from './components/card-holder/card-holder.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TweetCardComponent,
    CardHolderComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
