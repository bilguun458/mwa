import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { RouterModule } from '@angular/router';
import { SchoolComponent } from './school/school.component';
import { StudentsComponent } from './students/students.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    SchoolComponent,
    StudentsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([{
      path: "",
      component: StudentsComponent
    },
    {
      path: "student/:studId",
      component: SchoolComponent
    },
    {
      path: "**",
      component: ErrorPageComponent
    }])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
