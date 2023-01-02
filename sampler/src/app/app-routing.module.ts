import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SampleGroupsComponent} from "./sample-groups/sample-groups.component";
import {SampleComponent} from "./sample/sample.component";

const routes: Routes = [
  {path: 'sample-group', component: SampleGroupsComponent},
  {path: 'sample', component: SampleComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
