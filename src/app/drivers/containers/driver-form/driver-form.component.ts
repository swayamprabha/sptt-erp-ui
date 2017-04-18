import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DriverFormService } from './driver-form.service';

@Component({
  selector: 'app-driver-form',
  templateUrl: './driver-form.component.html',
  styleUrls: ['./driver-form.component.scss']
})
export class DriverFormComponent implements OnInit {

  isFormSaving: boolean = false;
  editMode: boolean = false;
  id: string;
  driverForm: FormGroup;
  driver: any;
  showModal: boolean = false;
  showDeleteDriverModal: boolean = false;
  deletingDriver: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private titleService: Title,
    private driverFormService: DriverFormService) { }

  ngOnInit() {

    this.titleService.setTitle('SPTT - New Driver');

    // Build the form
    this.driverForm = this.fb.group({
      driverName: ['', [Validators.required]],
      driverDOB: ['', [Validators.required]],
      driverDOA: [''],
      dlNumber: ['', [Validators.required]],
      dlExpiry: ['', [Validators.required]],
      badgeExpiry: ['', [Validators.required]],
      PANnumber: ['', [Validators.required]],
      accountNumber: ['', [Validators.required]],
      bankName: ['', [Validators.required]],
      bankBranchName: ['', [Validators.required]],
      bankIFSC: ['', [Validators.required]],
      driverAddress: ['', [Validators.required]],
      driverContact: ['', [Validators.required]]
    });

    // Load data for edit mode
    this.route.data
      .subscribe((data: { driver: any }) => {
        if (data.driver) {
          this.editMode = true;
          this.driver = data.driver;
          this.driverForm.patchValue(this.driver);
          this.driverForm.patchValue({
            driverDOB: new Date(this.driver.driverDOB).toISOString().slice(0, 10),
            driverDOA: new Date(this.driver.driverDOA).toISOString().slice(0, 10),
            dlExpiry: new Date(this.driver.dlExpiry).toISOString().slice(0, 10),
            badgeExpiry: new Date(this.driver.badgeExpiry).toISOString().slice(0, 10)
          });
        } else {
          this.editMode = false;
        }
      });

    // Get id if present in the URL 
    this.route.params
      .subscribe((params: Params) => {
        if (params['id']) {
          this.id = params['id'];
        }
      });
  }

  dataOnChange() {
    this.driverForm.reset(this.driver);
    this.driverForm.patchValue({
      driverDOB: new Date(this.driver.driverDOB).toISOString().slice(0, 10),
      driverDOA: new Date(this.driver.driverDOA).toISOString().slice(0, 10),
      dlExpiry: new Date(this.driver.dlExpiry).toISOString().slice(0, 10),
      badgeExpiry: new Date(this.driver.badgeExpiry).toISOString().slice(0, 10)
    });
  }

  revert() { this.dataOnChange(); }

  newDriverForm() {
    this.driverForm.reset();
    this.showModal = false;
  }

  deleteDriver() {
    this.deletingDriver = true;
    this.driverFormService
      .deleteDriver(this.id)
      .subscribe((data) => {
        this.deletingDriver = false;
        this.showDeleteDriverModal = false;
        this.router.navigate(['/drivers']);
      });
  }

  onSubmit({ value, valid }: { value: any, valid: boolean }) {
    this.isFormSaving = true;
    if (this.editMode) {
      this.driverFormService
        .updateDriver(this.id, value)
        .subscribe((data) => {
          this.isFormSaving = false;
          this.showModal = true;
        });
    } else {
      this.driverFormService
        .saveNewDriver(value)
        .subscribe((data: any) => {
          console.log(data);
          this.id = data.id;
          this.isFormSaving = false;
          this.showModal = true;
          this.driver = data;
          //this.router.navigate(['/day-summary/'+ data.id],{replaceUrl: true})
        });
    }
  }
}
