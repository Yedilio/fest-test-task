import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComparePageComponent } from './components/compare-page/compare-page.component';
import { CarsPageComponent } from './components/cars-page/cars-page.component';
import { CarsCardComponent } from './components/cars-card/cars-card.component';
import { AddEditCarCardComponent } from './components/add-edit-car-card/add-edit-car-card.component';

export const AppRoutes: { routes: Routes; module: string } = {
  module: 'AppModule',
  routes: [
    { path: '', redirectTo: 'car-shop', pathMatch: 'full' },
    {
      path: 'car-shop',
      component: CarsPageComponent,
      children: [
        { path: '', redirectTo: 'list', pathMatch: 'full' },
        { path: 'list', component: CarsCardComponent },
      ],
    },
    // {
    //   path: 'car-shop',
    //   loadChildren: () =>
    //     import('./components/cars-page/cars-page.module').then(
    //       (m) => m.CarsPageModule
    //     ),
    // },
    {
      path: 'add-edit-car',
      component: AddEditCarCardComponent,
    },
    {
      path: 'compare-page',
      component: ComparePageComponent,
    },
  ],
};

@NgModule({
  imports: [
    RouterModule.forRoot(AppRoutes.routes, {
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
