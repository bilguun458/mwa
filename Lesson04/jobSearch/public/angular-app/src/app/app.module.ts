import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from "@angular/common/http"

import { AppComponent } from './app.component';
import { JobsComponent } from './jobs/jobs.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { JobComponent } from './job/job.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    JobsComponent,
    ErrorPageComponent,
    JobComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([{
      path: "",
      component: JobsComponent
    },
    {
      path: "job/:id",
      component: JobComponent
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
