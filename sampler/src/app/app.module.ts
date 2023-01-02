import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BoardButtonComponent} from './ui-components/board-button/board-button.component';
import {CategoryMenuComponent} from "./category-menu/category-menu.component";
import {SampleGroupsComponent} from './sample-groups/sample-groups.component';
import {SampleComponent} from './sample/sample.component';
import {ModalComponent} from './ui-components/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardButtonComponent,
    CategoryMenuComponent,
    SampleGroupsComponent,
    SampleComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
