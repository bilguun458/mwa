import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { BrandsComponent } from './brands/brands.component';
import { BikesComponent } from './bikes/bikes.component';
import { BikeComponent } from './bike/bike.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    BrandsComponent,
    BikesComponent,
    BikeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([{
      path: "",
      component: BrandsComponent
    },
    {
      path: "bikes/:id",
      component: BikesComponent
    },
    {
      path: "brand/:brandId/bike/:id",
      component: BikeComponent
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
