import {Component, OnInit} from '@angular/core';
import {CategoryInterface, SampleGroupInterface} from "../interfaces";
import {ActivatedRoute, NavigationExtras, Params, Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {SampleGroupService} from "./sample-group.service";

@Component({
  selector: 'app-sample-groups',
  templateUrl: './sample-groups.component.html',
  styleUrls: ['./sample-groups.component.scss']
})
export class SampleGroupsComponent implements OnInit {

  public category: CategoryInterface | null = null;
  public sampleGroups: SampleGroupInterface[] = [];
  public selectedSampleGroupId: number = 0;
  public sampleGroupAddModalOpen: boolean = false;

  // Forms
  public sampleGroupFormGroup!: FormGroup;

  constructor(
    private sampleGroupService: SampleGroupService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.route.queryParams.subscribe((params: Params | { category_id: number }) => {
      this.getCategory(params.category_id);
    });
  }

  ngOnInit(): void {
  }

  private getCategory(categoryId: number): void {
    this.sampleGroupService.getCategory(categoryId).subscribe({
      next: (category: CategoryInterface) => this.category = category,
      error: (error: any) => console.error(error)
    })
  }

  public openSampleGroup(id: number): void {
    this.selectedSampleGroupId = id;
    const navigationExtras: NavigationExtras = {
      queryParams: {
        sample_group_id: id,
      }
    };
    this.router.navigate(['sample'], navigationExtras).then(() => null);
  }

}
