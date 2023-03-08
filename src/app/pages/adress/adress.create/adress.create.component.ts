import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { IAdress } from './../../../models/adress';
import { IResident } from './../../../models/residents';
import { AdressService } from './../../../services/adress.service';
import { ResidentService } from './../../../services/resident.service';

@Component({
  selector: 'app-adress.create',
  templateUrl: './adress.create.component.html',
  styleUrls: ['./adress.create.component.css']
})
export class AdressCreateComponent  implements OnInit{

  residents: IResident[] = [];
  FILTERD: IResident[] =[]


  adress: IAdress = {
    id:'',
    adress:'',
    person:'',
    personName:'',
  
  }
  
    constructor( 
      private service: AdressService,
      private toast: ToastrService,
      private router: Router,
      private residentService: ResidentService,
      ) {}
  
   
      ngOnInit(): void {
        this.findAllResidents();
      }
   
      findAllResidents():void {
       this.residentService.findAll().subscribe(response => {
         this.residents = response;
         this.FILTERD = response;
       })
      }
  
    create():void {
      this.service.create(this.adress).subscribe(respose => {
        this.router.navigate(['adress'])
        this.toast.success("Endereço  cadastrado com sucesso!");
      }, ex => {
        if(ex.error.errors) {
          ex.error.errors.map(x => this.toast.error(x.message))
        }
        else {
          this.toast.error(ex.error.message)
        }
      })
    }
    
  
      goBack():void {
        this.router.navigate(['adress'])
      }

      applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
      
      }
    
         
      residentFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
         this.residents = this.FILTERD.filter(element =>{
          return element.name.toLowerCase().includes(filterValue.toLowerCase());
         })
         
      }
  }
  