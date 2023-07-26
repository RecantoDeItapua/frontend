import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IPayment } from './../../../models/payment';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PaymentService } from 'src/app/services/payment.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-payment.list',
  templateUrl: './payment.list.component.html',
  styleUrls: ['./payment.list.component.css']
})
export class PaymentListComponent implements OnInit{
  role:string = ''
  filter:any = ''
  page:number = 0
  ELEMENT_DATA: IPayment[] = [];
  FILTERED_DATA;
  
  
  displayedColumns: string[] = [ 'title', 'personName', 'value', 'acctions'];
  dataSource = new MatTableDataSource<IPayment>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
 

    constructor(private service: PaymentService, private router: Router) {}


    ngOnInit(): void {
      this.filter =  localStorage.getItem('id')
      this.role = localStorage.getItem('roles')
      this.findAll();
     
      
    }

 


    findAll(): void {
      this.service.findAll().subscribe(response => {
        this.ELEMENT_DATA = response;
        this.FILTERED_DATA = response
        this.dataSource = new MatTableDataSource<IPayment>(response);
        this.dataSource.paginator = this.paginator;
        this.page = response.length

        if(this.role.includes('ROLE_RESIDENT') 
        && !this.role.includes('ROLE_ADMIN')
        && !this.role.includes('ROLE_EMPLOYEE')) {
          this.filterByUser()
        }
      })
     }

     situationReturn(situatin:any): string {
      return situatin == 0 ? 'ABERTO': 'ENCERRADO';
     }

     modePayment(mode:any): string {
      if(mode == '0') {
        return 'DINHEIRO'
      }
      if(mode == '1') {
        return 'CARTÃO'
      }else {
        return 'PIX'
      }
     }

     orderBySituation(situatin:any): void {
      let list: IPayment[] = [];
       this.ELEMENT_DATA.map(payment => {
          if(payment.situation == situatin) {
            list.push(payment)
          }
      })
      this.dataSource = new MatTableDataSource<IPayment>(list);
      this.dataSource.paginator = this.paginator;
      this.FILTERED_DATA = list
      

     }

     orderByDate(date: any ): void {
      let list: IPayment[] = [];
     
       this.ELEMENT_DATA.map(payment => {
        if(payment.finishPayment) {
          if(date == payment.finishPayment.slice(3) ) {
            list.push(payment)
          }
         
        }
        
      })
      this.dataSource = new MatTableDataSource<IPayment>(list);
      this.dataSource.paginator = this.paginator;
      this.FILTERED_DATA = list

     }

     filterByUser() {
      let list: IPayment[] = [];
        this.ELEMENT_DATA.map(resident => {
           if(resident.person == this.filter) {
             list.push(resident)
           }
      })
      this.ELEMENT_DATA = list;
      this.dataSource = new MatTableDataSource<IPayment>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      
    
     }

     showComponentByUser():boolean {
      if(this.role.includes('ROLE_RESIDENT') 
      && !this.role.includes('ROLE_ADMIN')
      && !this.role.includes('ROLE_EMPLOYEE')) {
        return false
      }

      if(this.role.includes('ROLE_EMPLOYEE')
      ||this.role.includes('ROLE_ADMIN')
      )
       {
          return true
      }
    
      else {
        return true
      }

    }

    showComponentByAdmin() {
        if(this.role.includes('ROLE_ADMIN')) {
          return true
        }
        else {
          return false
        }
    }
    



    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();

      this.FILTERED_DATA = this.FILTERED_DATA.filter(element =>{
        return element.title.toLowerCase().includes(filterValue.toLowerCase());
       
       })
  
    }

    gerarBoleto():void {
      localStorage.setItem('payment', JSON.stringify(this.FILTERED_DATA))
    }
}
