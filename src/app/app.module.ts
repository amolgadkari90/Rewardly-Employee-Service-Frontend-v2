import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NgModule } from "@angular/core";
import { EmployeeListComponent } from './Components/employee-list/employee-list.component';
//for HTML forms 
import { ReactiveFormsModule } from "@angular/forms";
import { EmployeeFormComponent } from './Components/employee-form/employee-form.component';


@NgModule({
  declarations: [

    AppComponent,             // this was missing 
    EmployeeListComponent, 
    EmployeeFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

//