import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CashEntryFormService } from './cash-entry-form.service';

@Component({
  selector: 'cash-entry-form',
  templateUrl: './cash-entry-form.component.html'
})
export class CashEntryFormComponent implements OnInit {
  isFormSaving: boolean = false;
  editMode: boolean = false;
  id: string;
  cashEntryForm: FormGroup;
  cashEntry: any;
  vehicles: any[];
  drivers: any[];
  showModal: boolean = false;
  showDeleteCashEntryModal: boolean = false;
  deletingCashEntry: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private titleService: Title,
    private cashEntryFormService: CashEntryFormService
  ) { }

  ngOnInit() {

    this.titleService.setTitle('SPTT - New Cash Entry');

    // Build the form
    this.cashEntryForm = this.fb.group({
      date: ['', Validators.required],
      vehicleId: [''],
      olaPayment: [''],
      vehicleIncentive: [''],
      vehicleRecovery: [''],
      driverId: [''],
      cashPaid: [''],
      driverIncentive: [''],
      driverRecovery: ['']
    });

    // Get list of Vehicles
    this.cashEntryFormService
      .getVehicles()
      .subscribe((data) => this.vehicles = data);

    // Get list of Drivers
    this.cashEntryFormService
      .getDrivers()
      .subscribe((data) => this.drivers = data);

    // Load data for edit mode
    this.route.data
      .subscribe((data: { cashEntry: any }) => {
        if (data.cashEntry) {
          this.editMode = true;
          this.cashEntry = data.cashEntry;
          this.cashEntryForm.patchValue(this.cashEntry);
          this.cashEntryForm.patchValue({
            date: new Date(this.cashEntry.date).toISOString().slice(0, 10)
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
    this.cashEntryForm.reset(this.cashEntry);
    this.cashEntryForm.patchValue({
      date: new Date(this.cashEntry.date).toISOString().slice(0, 10)
    });

  }

  revert() { this.dataOnChange(); }
  newCashEntryForm() {
    this.cashEntryForm.reset();
    this.showModal = false;
  }

  deleteCashEntry() {
    this.deletingCashEntry = true;
    this.cashEntryFormService
      .deleteCashEntry(this.id)
      .subscribe((data) => {
        this.deletingCashEntry = false;
        this.showDeleteCashEntryModal = false;
        this.router.navigate(['/cash-entry']);
      });
  }
  onSubmit({ value, valid }: { value: any, valid: boolean }) {
    this.isFormSaving = true;
    if (this.editMode) {
      this.cashEntryFormService
        .updateCashEntry(this.id, value)
        .subscribe((data) => {
          this.isFormSaving = false;
          this.showModal = true;
        });
    } else {
      this.cashEntryFormService
        .saveNewCashEntry(value)
        .subscribe((data: any) => {
          this.id = data.id;
          this.isFormSaving = false;
          this.showModal = true;
          this.cashEntry = data;
          //this.router.navigate(['/day-summary/'+ data.id],{replaceUrl: true})
        });
    }
  }

}
