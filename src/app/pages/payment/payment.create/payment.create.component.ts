import { IAdress } from './../../../models/adress';
import { AdressService } from './../../../services/adress.service';
import { Router } from '@angular/router';
import { IPayment } from './../../../models/payment';
import { PaymentService } from 'src/app/services/payment.service';
import { ResidentService } from './../../../services/resident.service';
import { IResident } from './../../../models/residents';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment.create',
  templateUrl: './payment.create.component.html',
  styleUrls: ['./payment.create.component.css']
})

export class PaymentCreateComponent implements OnInit {
payment:IPayment = {
  title:'',
  situation:'',
  modePayment:'',
  cash:0,
  person:'',
  adress:'',
  obs:''

}
  adressList: IAdress[] = []
  FILTERED_ADRESS: IAdress[] =[]
  residents: IResident[] = [];
  FILTERD: IResident[] =[]


title: FormControl = new FormControl(null, Validators.required);
cash: FormControl = new FormControl(null, Validators.required);
situation: FormControl = new FormControl(null, Validators.required);
resident: FormControl = new FormControl(null, Validators.required);
modePayment: FormControl = new FormControl(null, Validators.required);



   constructor(
    private residentService: ResidentService,
    private paymentService: PaymentService,
    private adressService: AdressService,
    private toast: ToastrService,
    private router: Router
    ) {}

   ngOnInit(): void {
     this.findAllResidents();
     this.findAllAdress();
   }

   findAllResidents():void {
    this.residentService.findAll().subscribe(response => {
      this.residents = response;
      this.FILTERD = response;
    })
   }
   
   findAllAdress(): void {
    this.adressService.findAll().subscribe(response => {
      this.adressList = response;
      this.FILTERED_ADRESS = response;
    })
   }

   getValue(id) {
    this.payment.person = id;
   }
   getAdress(ads) {
    this.payment.adress = ads
   }

   create():void {
    this.paymentService.create(this.payment).subscribe(response => {
        this.router.navigate(['payments'])
        this.toast.success("Pagamento criado com sucesso");


    }, ex => {
      this.toast.error(ex.error.error)
      
    })
   }

   createGroup():void {
    this.residents.map(resident => {
        this.payment.person = resident.id;

        this.adressList.map( adress => {
          if(adress.person == resident.id) {
            this.payment.adress = adress.adress

            this.paymentService.create(this.payment).subscribe(response => { }, 
              ex => {this.toast.error(ex.error.error)})
          }
          
        
        })
        
    })
    this.router.navigate(['payments'])
    this.toast.success("Pagamento criado com sucesso");
   }

   goBack():void {
    this.router.navigate(['payments'])
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
  
  }

     
  residentFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue)
     this.residents = this.FILTERD.filter(element =>{
      return element.name.toLowerCase().includes(filterValue.toLowerCase());
     })
     
  }

  adressFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
     this.adressList = this.FILTERED_ADRESS.filter(element =>{
      return element.adress.toLowerCase().includes(filterValue.toLowerCase());
     })
     
  }
}
