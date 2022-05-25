import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ResourceBrandComponent } from "./brand/brand.component";
import { ResourceCategoryComponent } from "./category/category.component";
import { PermissionGuard } from "./permission-guard.service";
import { ResourceProductComponent } from "./product/product.component";

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'brand',
        canActivate: [PermissionGuard],
        component: ResourceBrandComponent,
      },
      {
        path: 'category',
        canActivate: [PermissionGuard],
        component: ResourceCategoryComponent,
      },
      {
        path: 'product',
        canActivate: [PermissionGuard],
        component: ResourceProductComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResourcesRoutingModule {
}
