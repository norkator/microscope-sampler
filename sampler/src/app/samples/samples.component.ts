import {Component, OnInit} from '@angular/core';
import {SampleGroupInterface, SampleInterface} from "../interfaces";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Params} from "@angular/router";
import {SampleService} from "./sample.service";

@Component({
  selector: 'app-samples',
  templateUrl: './samples.component.html',
  styleUrls: ['./samples.component.scss']
})
export class SamplesComponent implements OnInit {

  public sampleGroup: SampleGroupInterface | null = null;
  public samples: SampleInterface[] = [];
  public selectedSample: SampleInterface | null = null;

  constructor(
    private sampleService: SampleService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) {
    this.route.queryParams.subscribe((params: Params | { sample_group_id: number }) => {
      this.getSampleGroup(params.sample_group_id);
    });
  }

  ngOnInit(): void {
  }

  private getSampleGroup(sampleGroupId: number): void {
    this.sampleService.getSampleGroup(sampleGroupId).subscribe({
      next: (data: SampleGroupInterface) => {
        console.info(data);
        this.sampleGroup = data;
      },
      error: (error: any) => console.error(error)
    });
  }

  public openSample(id: number): void {
  }

  public createSample(): void {
  }

}
