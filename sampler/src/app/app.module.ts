import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";

import {BoardButtonComponent} from './ui-components/board-button/board-button.component';
import {SampleImageComponent} from './ui-components/sample-image/sample-image.component';
import {UploadImageComponent} from "./ui-components/upload-image/upload-image.component";
import {ModalComponent} from './ui-components/modal/modal.component';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CategoryMenuComponent} from "./category-menu/category-menu.component";
import {SampleGroupsComponent} from './sample-groups/sample-groups.component';
import {SampleComponent} from './samples/sample/sample.component';
import {SamplesComponent} from './samples/samples.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardButtonComponent,
    CategoryMenuComponent,
    SampleGroupsComponent,
    SampleComponent,
    ModalComponent,
    SamplesComponent,
    SampleImageComponent,
    UploadImageComponent,
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
