import {Component, OnInit} from '@angular/core';
import {CategoryInterface, SampleGroupInterface} from "../interfaces";
import {ActivatedRoute, NavigationExtras, Params, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
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
      this.getSampleGroups(params.category_id);
    });
  }

  ngOnInit(): void {
    this.sampleGroupFormGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      category_id: [0, [Validators.required]],
      centrifuge_minutes: [0, [Validators.required]],
      centrifuge_rpm: [0, [Validators.required]],
      centrifuge_rcf: [0, [Validators.required]],
    });
  }

  private getSampleGroups(categoryId: number): void {
    this.sampleGroupService.getSampleGroups(categoryId).subscribe({
      next: (data: SampleGroupInterface[]) => {
        this.sampleGroups = data;
      },
      error: (error: any) => console.error(error)
    });
  }

  private getCategory(categoryId: number): void {
    this.sampleGroupService.getCategory(categoryId).subscribe({
      next: (category: CategoryInterface) => {
        this.category = category;
        this.sampleGroupFormGroup.controls['category_id'].setValue(this.category?.id || 0)
      },
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
    this.router.navigate(['samples'], navigationExtras).then(() => null);
  }

  public createSampleGroup(): void {
    if (this.sampleGroupFormGroup.valid && this.sampleGroupFormGroup.controls['category_id'].value > 0) {
      this.sampleGroupService.createSampleGroup(
        this.sampleGroupFormGroup.controls['name'].value,
        this.sampleGroupFormGroup.controls['category_id'].value,
        this.sampleGroupFormGroup.controls['centrifuge_minutes'].value,
        this.sampleGroupFormGroup.controls['centrifuge_rpm'].value,
        this.sampleGroupFormGroup.controls['centrifuge_rcf'].value,
      ).subscribe({
        next: (data: SampleGroupInterface) => {
          this.sampleGroups.push(data);
          this.sampleGroupFormGroup.controls['name'].setValue('');
          this.sampleGroupAddModalOpen = !this.sampleGroupAddModalOpen;
        },
        error: (error: any) => console.error(error)
      })
    }
  }

}
