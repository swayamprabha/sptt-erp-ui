import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { VehicleFormService } from './vehicle-form.service';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.scss']
})
export class VehicleFormComponent implements OnInit {

  isFormSaving: boolean = false;
  editMode: boolean = false;
  id: string;
  vehicleForm: FormGroup;
  vehicle: any;
  showModal: boolean = false;
  categories: any;
  subcategories: any;
  showDeleteVehicleModal: boolean = false;
  deletingVehicle: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private titleService: Title,

    private vehicleFormService: VehicleFormService) { }

  ngOnInit() {

    // Build the form
    this.vehicleForm = this.fb.group({
      ownershipType: ['', [Validators.required]],
      regNumber: ['', [Validators.required]],
      vehicleBrand: ['', [Validators.required]],
      vehicleModel: ['', [Validators.required]],
      vehicleCategoryId: ['', [Validators.required]],
      insuranceDuedate: ['', [Validators.required]],
      roadtaxDuedate: ['', [Validators.required]],
      permitExpiry: ['', [Validators.required]],
      rankCatergoryId: [''],
      serviceInterval: [''],
      badgeExpiry: [''],
      ownerName: [''],
      driverName: [''],
      // account details
      PANnumber: [''],
      accountNumber: [''],
      bankName: [''],
      bankBranchName: [''],
      bankIFSC: ['']
    });

    // Get list of Vehicle Categories
    this.vehicleFormService
      .getCategories()
      .subscribe((data) => this.categories = data);

    // Get list of Sub Categories
    this.vehicleFormService
      .getSubcategories()
      .subscribe((data) => this.subcategories = data);

    // Load data for edit mode
    this.route.data
      .subscribe((data: { vehicle: any }) => {
        if (data.vehicle) {
          this.editMode = true;
          this.titleService.setTitle('SPTT - Edit Vehicle');
          this.vehicle = data.vehicle;
          this.vehicleForm.patchValue(this.vehicle);
          this.vehicleForm.patchValue({
            insuranceDuedate: new Date(this.vehicle.insuranceDuedate).toISOString().slice(0, 10),
            roadtaxDuedate: new Date(this.vehicle.roadtaxDuedate).toISOString().slice(0, 10),
            permitExpiry: new Date(this.vehicle.permitExpiry).toISOString().slice(0, 10)
          });
          if (this.vehicle.ownershipType === 'OWN') {
            this.vehicleForm.patchValue({
              serviceInterval: new Date(this.vehicle.serviceInterval).toISOString().slice(0, 10)
            });
            this.vehicleForm.get('badgeExpiry').disable();
            this.vehicleForm.get('ownerName').disable();
            this.vehicleForm.get('driverName').disable();
            this.vehicleForm.get('rankCatergoryId').disable();
            // account details
            this.vehicleForm.get('PANnumber').disable();
            this.vehicleForm.get('accountNumber').disable();
            this.vehicleForm.get('bankName').disable();
            this.vehicleForm.get('bankBranchName').disable();
            this.vehicleForm.get('bankIFSC').disable();
          } else {
            this.vehicleForm.patchValue({
              badgeExpiry: new Date(this.vehicle.badgeExpiry).toISOString().slice(0, 10)
            });
            this.vehicleForm.get('serviceInterval').disable();
          }
        } else {
          this.editMode = false;
          this.titleService.setTitle('SPTT - New Vehicle');
        }
      });

    // Get id if present in the URL 
    this.route.params
      .subscribe((params: Params) => {
        if (params['id']) {
          this.id = params['id'];
        }
      });
    this.vehicleForm.get('ownershipType').valueChanges.subscribe(
      (ownershipType: string) => {
        switch (ownershipType) {
          case 'OWN': {
            this.vehicleForm.get('serviceInterval').enable();
            this.vehicleForm.get('serviceInterval').setValidators([Validators.required]);
            this.vehicleForm.get('badgeExpiry').disable();
            this.vehicleForm.get('ownerName').disable();
            this.vehicleForm.get('driverName').disable();
            this.vehicleForm.get('rankCatergoryId').disable();
            // account details
            this.vehicleForm.get('PANnumber').disable();
            this.vehicleForm.get('accountNumber').disable();
            this.vehicleForm.get('bankName').disable();
            this.vehicleForm.get('bankBranchName').disable();
            this.vehicleForm.get('bankIFSC').disable();
            break;
          }
          case 'LEASE': {
            this.vehicleForm.get('serviceInterval').disable();
            this.vehicleForm.get('badgeExpiry').enable();
            this.vehicleForm.get('badgeExpiry').setValidators([Validators.required]);
            this.vehicleForm.get('ownerName').enable();
            this.vehicleForm.get('ownerName').setValidators([Validators.required]);
            this.vehicleForm.get('driverName').enable();
            this.vehicleForm.get('driverName').setValidators([Validators.required]);
            this.vehicleForm.get('rankCatergoryId').enable();
            this.vehicleForm.get('rankCatergoryId').setValidators([Validators.required]);
            // account details
            this.vehicleForm.get('PANnumber').enable();
            this.vehicleForm.get('PANnumber').setValidators([Validators.required]);
            this.vehicleForm.get('accountNumber').enable();
            this.vehicleForm.get('accountNumber').setValidators([Validators.required]);
            this.vehicleForm.get('bankName').enable();
            this.vehicleForm.get('bankName').setValidators([Validators.required]);
            this.vehicleForm.get('bankBranchName').enable();
            this.vehicleForm.get('bankBranchName').setValidators([Validators.required]);
            this.vehicleForm.get('bankIFSC').enable();
            this.vehicleForm.get('bankIFSC').setValidators([Validators.required]);
            break;
          }
        }
        this.vehicleForm.get('serviceInterval').updateValueAndValidity();
        this.vehicleForm.get('badgeExpiry').updateValueAndValidity();
        this.vehicleForm.get('ownerName').updateValueAndValidity();
        this.vehicleForm.get('driverName').updateValueAndValidity();
      }
    );
  }

  dataOnChange() {
    this.vehicleForm.reset(this.vehicle);
    this.vehicleForm.patchValue({
      insuranceDuedate: new Date(this.vehicle.insuranceDuedate).toISOString().slice(0, 10),
      roadtaxDuedate: new Date(this.vehicle.roadtaxDuedate).toISOString().slice(0, 10),
      permitExpiry: new Date(this.vehicle.permitExpiry).toISOString().slice(0, 10)
    });
    if (this.vehicle.ownershipType === 'OWN') {
      this.vehicleForm.patchValue({
        serviceInterval: new Date(this.vehicle.serviceInterval).toISOString().slice(0, 10)
      });
    } else {
      this.vehicleForm.patchValue({
        badgeExpiry: new Date(this.vehicle.badgeExpiry).toISOString().slice(0, 10)
      });
    }
  }

  revert() { this.dataOnChange(); }

  newVehicleForm() {
    this.vehicleForm.reset();
    this.showModal = false;
  }

  deleteVehicle() {
    this.deletingVehicle = true;
    this.vehicleFormService
      .deleteVehicle(this.id)
      .subscribe((data) => {
        this.deletingVehicle = false;
        this.showDeleteVehicleModal = false;
        this.router.navigate(['/vehicles']);
      });
  }

  onSubmit({ value, valid }: { value: any, valid: boolean }) {
    this.isFormSaving = true;
    if (this.editMode) {
      this.vehicleFormService
        .updateVehicle(this.id, value)
        .subscribe((data) => {
          this.isFormSaving = false;
          this.showModal = true;
        });
    } else {
      this.vehicleFormService
        .saveNewVehicle(value)
        .subscribe((data: any) => {
          this.id = data.id;
          this.isFormSaving = false;
          this.showModal = true;
          this.vehicle = data;
          //this.router.navigate(['/day-summary/'+ data.id],{replaceUrl: true})
        });
    }
  }
}
