import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BoardButtonComponent} from './ui-components/board-button/board-button.component';
import {CategoryMenuComponent} from "./category-menu/category-menu.component";
import {SampleGroupsComponent} from './sample-groups/sample-groups.component';
import {SampleComponent} from './sample/sample.component';
import {ModalComponent} from './ui-components/modal/modal.component';
import {NavigationHelperComponent} from './ui-components/navigation-helper/navigation-helper.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardButtonComponent,
    CategoryMenuComponent,
    SampleGroupsComponent,
    SampleComponent,
    ModalComponent,
    NavigationHelperComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    FormBuilder,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
