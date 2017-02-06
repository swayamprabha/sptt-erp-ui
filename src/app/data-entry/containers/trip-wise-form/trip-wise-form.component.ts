import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TripWiseFormService } from './trip-wise-form.service';

@Component({
  selector: 'app-trip-wise-form',
  templateUrl: './trip-wise-form.component.html',
  styleUrls: ['./trip-wise-form.component.scss']
})
export class TripWiseFormComponent implements OnInit {

  isFormSaving: boolean = false;
  editMode: boolean = false;
  tripId: string;
  tripSummaryForm: FormGroup;
  tripSummary: any;
  showModal: boolean = false;
  alldaySummary: any;
  operators: any[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private tripWiseFormService: TripWiseFormService
  ) { }

  ngOnInit() {

    // Build the form
    this.tripSummaryForm = this.fb.group({
      operatorName:['Ola-City'],
      tripOrigin: [''],
      tripDestination: [''],
      customerName: [''],
      rideKMS: ['', [Validators.required]],
      billAmount: [''],
      cashCollected: [''],
      onlinePayment: [''],
      olaMoney: [''],
      paytm: [''],
      self: [''],
      balance: [''],
      airportToll: [''],
      localToll: [''],
      incentives: [''],
      remarks: [''],
      rideEarnings: ['', [Validators.required]]
    });

    // Get list of Operators
    this.tripWiseFormService
      .getOperators()
      .subscribe((data) => this.operators = data);

    // Load alldaySummary and tripSummary from resolve
    this.route.data
      .subscribe((data: { alldaySummary: any, tripSummary: any }) => {
        this.alldaySummary = data.alldaySummary;
        if (data.tripSummary) {
          this.editMode = true;
          this.tripSummary = data.tripSummary;
          this.tripSummaryForm.patchValue(this.tripSummary);
        } else {
          this.editMode = false;
        }
      });
    // Get id if present in the URL 
    this.route.params
      .subscribe((params: Params) => {
        if (params['trip-id']) {
          this.tripId = params['trip-id'];
        }
      });
  }

  ngOnChanges() {
    this.tripSummaryForm.reset(this.tripSummary);
    // this.tripSummaryForm.patchValue({
    //   date: new Date(this.alldaySummary.date).toISOString().slice(0, 10)
    // });
  }

  revert() { this.ngOnChanges(); }
  onSubmit({ value, valid }: { value: any, valid: boolean }) {
    this.isFormSaving = true;
    value.alldaySummaryId =  this.alldaySummary.id;
    if (this.editMode) {
      this.tripWiseFormService
        .updateTripSummary(this.tripId, value)
        .subscribe((data) => {
          this.isFormSaving = false;
          this.showModal = true;
        });
    } else {
      this.tripWiseFormService
        .saveNewTripSummary(value)
        .subscribe((data: any) => {
          console.log(data);
          this.tripId = data.id;
          this.isFormSaving = false;
          this.showModal = true;
          this.tripSummary = data;
          this.ngOnChanges;
          //this.router.navigate(['/data-entry/'+ data.id],{replaceUrl: true})
        });
    }
  }

}
