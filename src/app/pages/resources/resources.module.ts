import { NgModule } from "@angular/core";
import { NbCardModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';

import { ResourceBrandComponent } from "./brand/brand.component";
import { ResourceCategoryComponent } from "./category/category.component";
import { PermissionGuard } from "./permission-guard.service";
import { ResourceProductComponent } from "./product/product.component";
import { ResourcesRoutingModule } from "./resources-routing.module";

@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
    ResourcesRoutingModule,
  ],
  declarations: [
    ResourceBrandComponent,
    ResourceCategoryComponent,
    ResourceProductComponent
  ],
  providers: [
    PermissionGuard,
  ],
})
export class ResourcesModule {
}
