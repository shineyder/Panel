import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { NbComponentStatus, NbToastrService, NbWindowRef } from '@nebular/theme';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StorageService } from '../../../storage.service';
import { Resource } from '../models/resource.model';
import { User } from '../models/user.model';
import { UserService } from '../userService';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent  implements OnInit{

  @Input() user: User;
  @Input() resources: Resource[];

  formUpdatePermission: FormGroup;

  private ngUnsubscribe = new Subject<void>();

  constructor(
    public windowRef: NbWindowRef,
    private userService: UserService,
    private fb: FormBuilder,
    private toastrService: NbToastrService,
    private localStorageService: StorageService
    )
  {
  }

  ngOnInit(): void {
    this.formUpdatePermission = this.fb.group({
      user_id: this.user.id,
      resource_permissions: this.fb.array([])
    })

    this.buildFormArray();
  }

  buildFormArray() {
    const add = this.formUpdatePermission.get('resource_permissions') as FormArray;

    this.resources.forEach(element => {
      var actualPermission = this.user.resource_permissions.find(x => x.resource_id === element.id)
      if (actualPermission == undefined) {
        actualPermission = {
          view: false,
          create: false,
          update: false,
          delete: false,
        }
      }

      add.push(this.fb.group({
        resource_id: element.id,
        view: actualPermission.view ? true : false,
        create: actualPermission.create ? true : false,
        update: actualPermission.update ? true : false,
        delete: actualPermission.delete ? true : false
      }))
    })
  }

  close() {
    this.windowRef.close();
  }

  onSubmit() {
    this.userService.updatePermissions(this.formUpdatePermission.value)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(result => {
      this.showMessage(
        'success', 'Sucesso', 'Permissões de usuário atualizadas com sucesso'
        );
      this.localStorageService.set(
        'tmp_user_data',
        this.formUpdatePermission.value
        );
      this.windowRef.close()
    }, error => {
      this.showMessage(
        'warning', 'Erro', 'Falha ao atualizar permissões do usuário'
        );
      this.windowRef.close()
    })
  }

  showMessage(status: NbComponentStatus, title: string, message: string) {
    this.toastrService.show(message, title, { status });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
