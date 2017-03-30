import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DayWiseFormService } from './day-wise-form.service';

@Component({
  selector: 'app-day-wise-form',
  templateUrl: './day-wise-form.component.html',
  styleUrls: ['./day-wise-form.component.scss']
})
export class DayWiseFormComponent implements OnInit {

  vehicles: any[];
  drivers: any[];
  isFormSaving: boolean = false;
  editMode: boolean = false;
  id: string;
  alldaySummaryForm: FormGroup;
  alldaySummary: any;
  showModal: boolean = false;
  selectedVehicleType: string;

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
          this.selectedVehicleType = data.alldaySummary.vehicle.ownershipType;
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

  ngOnChanges() {
    this.alldaySummaryForm.reset(this.alldaySummary);
    this.alldaySummaryForm.patchValue({
      date: new Date(this.alldaySummary.date).toISOString().slice(0, 10)
    });
  }

  revert() { this.ngOnChanges(); }
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
          this.ngOnChanges;
          //this.router.navigate(['/day-summary/'+ data.id],{replaceUrl: true})
        });
    }
  }

  onVehicleTypeChange(vehicleType) {
    switch (vehicleType) {
      case 'OWN': {
        this.selectedVehicleType = 'OWN';
        // Get list of Vehicles for OWN type
        this.dayWiseFormService
          .getVehicles(vehicleType)
          .subscribe((data) => this.vehicles = data);
        this.alldaySummaryForm.get('openingOdo').setValidators([Validators.required]);
        this.alldaySummaryForm.get('closingOdo').setValidators([Validators.required]);
        break;
      }
      case 'LEASE': {
        this.selectedVehicleType = 'LEASE';
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
}
