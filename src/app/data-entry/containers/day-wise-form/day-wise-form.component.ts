import { Component, OnInit } from '@angular/core';
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private dayWiseFormService: DayWiseFormService) { }

  ngOnInit() {

    // Build the form
    this.alldaySummaryForm = this.fb.group({
      date: ['', [Validators.required]],
      vehicleType: ['OWN'],
      vehicleId: [''],
      driverId: [''],
      loggedinDuration: ['', Validators.required],
      openingOdo: [''],
      closingOdo: [''],
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
      expenseRemarks: [''],
      otherRemarks: ['']
    });

    // Get list of Vehicles  
    this.dayWiseFormService
      .getVehicles()
      .subscribe((data) => this.vehicles = data);

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
          console.log(data);
          this.id = data.id;
          this.isFormSaving = false;
          this.showModal = true;
          this.alldaySummary = data;
          this.ngOnChanges;
          //this.router.navigate(['/data-entry/'+ data.id],{replaceUrl: true})
        });
    }
  }


}
