import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SampleGroupsComponent} from "./sample-groups/sample-groups.component";
import {SampleComponent} from "./samples/sample/sample.component";
import {CategoryMenuComponent} from "./category-menu/category-menu.component";
import {SamplesComponent} from "./samples/samples.component";

const routes: Routes = [
  {path: '', component: CategoryMenuComponent},
  {path: 'sample-group', component: SampleGroupsComponent},
  {path: 'samples', component: SamplesComponent},
  {path: 'sample', component: SampleComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
