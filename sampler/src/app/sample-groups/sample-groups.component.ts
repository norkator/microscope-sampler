import {Component, OnInit} from '@angular/core';
import {CategoryInterface, SampleGroupInterface} from "../interfaces";
import {NavigationExtras} from "@angular/router";

@Component({
  selector: 'app-sample-groups',
  templateUrl: './sample-groups.component.html',
  styleUrls: ['./sample-groups.component.scss']
})
export class SampleGroupsComponent implements OnInit {
  public categoryName: string = 'Blood samples';

  public category: CategoryInterface | null = null;
  public sampleGroups: SampleGroupInterface[] = [];
  public selectedSampleGroupId: number = 0;
  public sampleGroupAddModalOpen: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  public openSampleGroup(id: number): void {
    this.selectedSampleGroupId = id;
    const navigationExtras: NavigationExtras = {
      queryParams: {
        sample_group_id: id,
      }
    };
    // this.router.navigate(['sample-group'], navigationExtras).then(() => null);
  }

}
