import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { IAdress } from './../../../models/adress';
import { AdressService } from './../../../services/adress.service';

@Component({
  selector: 'app-adress.list',
  templateUrl: './adress.list.component.html',
  styleUrls: ['./adress.list.component.css']
})
export class AdressListComponent {

  role:string = ''
  filter:any = '';
  

  
  ELEMENT_DATA: IAdress[] = [];

  displayedColumns: string[] = [ 'adress', 'person', 'acctions'];
  dataSource = new MatTableDataSource<IAdress>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: AdressService) {}


 ngOnInit(): void {
  this.filter =  localStorage.getItem('id')
  this.role = localStorage.getItem('roles')
   this.findAll();
 }

 findAll(): void {
  this.service.findAll().subscribe(response => {
    this.ELEMENT_DATA = response;
    this.dataSource = new MatTableDataSource<IAdress>(response);
    this.dataSource.paginator = this.paginator;
  })
 }

 showComponentByUser():boolean {
  if(this.role.includes('ROLE_RESIDENT') 
  && !this.role.includes('ROLE_ADMIN')
  && !this.role.includes('ROLE_EMPLOYEE')) {
    return false
  }

  else {
    return true
  }

  
 }

 showComponentByAdm():boolean {
  if( !this.role.includes('ROLE_ADMIN') ) {
    return false
  }
  else {
    return true
  }
}

 

 applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

}
