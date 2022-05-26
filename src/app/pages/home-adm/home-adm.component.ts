import { Component, OnInit } from '@angular/core';
import { NbToastrService, NbComponentStatus, NbDialogService, NbWindowService  } from '@nebular/theme';
import { UserDeleteComponent } from './delete/user-delete.component';
import { Resource } from './models/resource.model';
import { User } from './models/user.model';
import { ResourceService } from './resourceService';
import { UserUpdateComponent } from './update/user-update.component';
import { UserService } from './userService';

@Component({
  selector: 'app-ngx-home-adm',
  templateUrl: './home-adm.component.html',
  styleUrls: ['./home-adm.component.scss'],
})
export class HomeAdmComponent implements OnInit {

  users: User[]
  resources: Resource[]

  constructor(
    private userService: UserService,
    private resourceService: ResourceService,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService,
    private windowService: NbWindowService,
  ) {
  }

  ngOnInit(): void {
    this.listUsers()
    this.listResources()
  }

  listUsers() {
    this.userService.read().subscribe(users => {
      this.users = users
      this.users.splice(this.users.indexOf(this.users.find(x => x.is_admin == true)), 1);
    })
  }

  listResources() {
    this.resourceService.read().subscribe(resources => {
      this.resources = resources
    })
  }

  openDeleteDialog(id: number) {
    this.dialogService.open(UserDeleteComponent, { context: { identifier: +`${id}` } }).onClose.subscribe(result => {
      if (result === 'deleted') {
        this.users.splice(this.users.indexOf(this.users.find(x => x.id === id)), 1);
        this.showMessage('success', 'Sucesso', 'Usuário excluido com sucesso');
      }
    })
  }

  openUpdateWindow(user: User) {
    this.windowService.open(
      UserUpdateComponent,
      {
        context: { user, resources: this.resources },
        title: "Atualizar Permissões",
      }
    ).onClose.subscribe(() => {
      var userUpdated = JSON.parse(window.localStorage.getItem('tmp_user_data'))

      if (userUpdated != null) {
        this.users.find(x => x.id === userUpdated.user_id)
        .resource_permissions = userUpdated.resource_permissions
        window.localStorage.removeItem('tmp_user_data')
        this.showMessage('success', 'Sucesso', 'Usuário atualizado com sucesso');
      }
    })
  }

  showMessage(status: NbComponentStatus, title: string, message: string) {
    this.toastrService.show(message, title, { status });
  }
}
