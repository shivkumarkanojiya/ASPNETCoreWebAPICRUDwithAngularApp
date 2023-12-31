import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { concatWith } from 'rxjs';
import { Employee } from 'src/app/shared/employee.model';
import { EmployeeService } from 'src/app/shared/employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent {
 
  constructor( public empService:EmployeeService,public toast:ToastrService) { }
  @ViewChild('checkbox1') checkBox:ElementRef;
  isSlide:string='off';

 ngOnInit()
 {
  this.empService.getDesignation().subscribe(data=>{
    this.empService.listDesignation=data;
  })


 }
 submit(form:NgForm)
 {
this.empService.employeeData.isMarried=form.value.isMarried==true?1:0;
this.empService.employeeData.isActive=form.value.isActive==true?1:0;
if(this.empService.employeeData.id==0)
{
  this.insertEmployee(form);
}
else
{
  this.updateEployee(form);
}
 }
 //
 insertEmployee(myform:NgForm)
  {  this.empService.saveEmployee().subscribe(d=> {
     this.resetForm(myform);
     this.refereshData(); 
     this.toast.success('Sucess','Record Saved');
     
    });
  }
  updateEployee(myform:NgForm)
  {
    this.empService.UpdateEmployee().subscribe(d=> {
      this.resetForm(myform);
      this.refereshData();
      this.toast.warning('Sucess','Record Updated');
    });
  }
  resetForm(myform:NgForm)
  {
    myform.form.reset(myform.value);
    this.empService.employeeData=new Employee();
    this.hideShowSlide();
    
  }
  refereshData()
  {
    this.empService.getEmployee().subscribe(res=>{
      this.empService.listEmployee=res;
     })
  }
  //
  hideShowSlide()
  {
    if(this.checkBox.nativeElement.checked)
    {
      this.checkBox.nativeElement.checked=false;
      this.isSlide='off';
    }
    else
    {
      this.checkBox.nativeElement.checked=true;
      this.isSlide='on';
    }
  }

}
