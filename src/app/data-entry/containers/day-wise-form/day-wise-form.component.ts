import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';

import { DayWiseFormService } from './day-wise-form.service';

@Component({
  selector: 'app-day-wise-form',
  templateUrl: './day-wise-form.component.html',
  styleUrls: ['./day-wise-form.component.scss']
})
export class DayWiseFormComponent implements OnInit {

  vehicles: any[];
  filteredVehicle: any;
  drivers: any[];
  operatorTypes: any[];
  isFormSaving: boolean = false;
  editMode: boolean = false;
  id: string;
  alldaySummaryForm: FormGroup;
  alldaySummary: any;
  showModal: boolean = false;
  selectedVehicleType: string;
  operatorType: string = null;
  showDeleteAlldaySummaryModal: boolean = false;
  deletingAlldaySummary: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private titleService: Title,
    private dayWiseFormService: DayWiseFormService) { }

  ngOnInit() {

    this.titleService.setTitle('SPTT - New Day Wise Summary');

    // Build the form
    this.alldaySummaryForm = this.fb.group({
      date: ['', [Validators.required]],
      vehicleId: ['', Validators.required],
      loggedinDuration: ['', Validators.required],
      openingOdo: ['', Validators.required],
      closingOdo: ['', Validators.required],
      cashPaidByDriver: [''],
      olaPayment: [''],
      bankTransfer: [''],
      penalty: [''],
      cancellationCharges: [''],
      fuel: [''],
      parkingFee: [''],
      fine: [''],
      internetCharges: [''],
      toll: [''],
      throughBank: [''],
      bata: [''],
      miscExpense: [''],
      tripSummary: this.fb.array([]),
      remarks: ['']
    });

    // Get list of Drivers
    this.dayWiseFormService
      .getDrivers()
      .subscribe((data) => this.drivers = data);

    // Load data for edit mode
    this.route.data
      .subscribe((data: { alldaySummary: any }) => {
        if (data.alldaySummary) {
          this.editMode = true;
          this.alldaySummary = data.alldaySummary;
          this.alldaySummaryForm.patchValue(this.alldaySummary);
          this.alldaySummaryForm.patchValue({
            date: new Date(this.alldaySummary.date).toISOString().slice(0, 10)
          });
          this.selectedVehicleType = this.alldaySummary.vehicle.ownershipType;
          this.onVehicleTypeChange(this.selectedVehicleType);
          // Get list of Operators for the vehicle
          this.dayWiseFormService
            .getOperators(this.alldaySummary.vehicle.vehicleCategoryId)
            .subscribe((data) => this.operatorTypes = data);
          // set trip summaries manually cause it's a form FormArray
          // to get the edit feature for FormArray should write 3 extra lines :( https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#form-array 
          const trips = this.alldaySummary.tripSummary.map(trip => {
            if (trip.rideKMSs) {
              trip.rideKMSs = this.fb.array(trip.rideKMSs);
            }
            return this.fb.group(trip);
          });
          const tripsFormArray = this.fb.array(trips);
          this.alldaySummaryForm.setControl('tripSummary', tripsFormArray);
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

    // Get list of Operators for the selected vehicle
    this.alldaySummaryForm.get('vehicleId').valueChanges.subscribe(
      (vehicleId: string) => {
        this.filteredVehicle = this.vehicles.find(v => v.id === vehicleId);
        if (this.filteredVehicle) {
          this.dayWiseFormService
            .getOperators(this.filteredVehicle.vehicleCategoryId)
            .subscribe((data) => this.operatorTypes = data);
        }
      }
    );

  }

  get tripSummary(): FormArray {
    return this.alldaySummaryForm.get('tripSummary') as FormArray;
  };

  addOperatorCategory() {
    if (this.operatorType) {
      let filteredOperatorTypes = this.operatorTypes.find(o => o.id === this.operatorType);
      this.tripSummary.push(this.fb.group(this.dayWiseFormService.createOperatorCategory(filteredOperatorTypes.operatorName, this.selectedVehicleType)));
    }
  }

  dataOnChange() {
    this.alldaySummaryForm.reset(this.alldaySummary);
    this.alldaySummaryForm.patchValue({
      date: new Date(this.alldaySummary.date).toISOString().slice(0, 10)
    });
    // set trip summaries manually cause it's a form FormArray
    // to get the edit feature for FormArray should write 3 extra lines :( https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#form-array 
    const trips = this.alldaySummary.tripSummary.map(trip => this.fb.group(trip));
    const tripsFormArray = this.fb.array(trips);
    this.alldaySummaryForm.setControl('tripSummary', tripsFormArray);

  }

  revert() { this.dataOnChange(); }
  onSubmit({ value, valid }: { value: any, valid: boolean }) {
    this.isFormSaving = true;
    if (this.editMode) {
      this.dayWiseFormService
        .updateDailySummary(this.id, value)
        .subscribe((data) => {
          this.isFormSaving = false;
          this.showModal = true;
        });
    } else {
      this.dayWiseFormService
        .saveNewDailySummary(value)
        .subscribe((data: any) => {
          this.id = data.id;
          this.isFormSaving = false;
          this.showModal = true;
          this.alldaySummary = data;
          //this.router.navigate(['/day-summary/'+ data.id],{replaceUrl: true})
        });
    }
  }

  deleteAlldaySummary() {
    this.deletingAlldaySummary = true;
    this.dayWiseFormService
      .deleteDailySummary(this.id)
      .subscribe((data) => {
        this.deletingAlldaySummary = false;
        this.showDeleteAlldaySummaryModal = false;
        this.router.navigate(['/day-summary']);
      });
  }

  onVehicleTypeChange(vehicleType) {
    this.operatorTypes = [];
    switch (vehicleType) {
      case 'OWN': {
        // Get list of Vehicles for OWN type
        this.dayWiseFormService
          .getVehicles(vehicleType)
          .subscribe((data) => this.vehicles = data);
        this.alldaySummaryForm.get('openingOdo').setValidators([Validators.required]);
        this.alldaySummaryForm.get('closingOdo').setValidators([Validators.required]);
        break;
      }
      case 'LEASE': {
        // Get list of Vehicles for LEASE type
        this.dayWiseFormService
          .getVehicles(vehicleType)
          .subscribe((data) => this.vehicles = data);
        this.alldaySummaryForm.get('openingOdo').clearValidators();
        this.alldaySummaryForm.get('closingOdo').clearValidators();
        break;
      }
    }
    this.alldaySummaryForm.get('openingOdo').updateValueAndValidity();
    this.alldaySummaryForm.get('closingOdo').updateValueAndValidity();
  }

  newAlldaySummaryForm() {
    if (this.editMode) {
      this.showModal = false;
      this.router.navigate(['/day-summary/new']);
    } else {
      this.alldaySummaryForm.reset();
      // rebind form https://github.com/angular/angular/pull/11051
      const tripSummaryControl = this.alldaySummaryForm.get('tripSummary') as FormArray;
      while (tripSummaryControl.length) {
        tripSummaryControl.removeAt(tripSummaryControl.length - 1);
      }
      this.selectedVehicleType = null;
      this.showModal = false;
    }
  }
}
