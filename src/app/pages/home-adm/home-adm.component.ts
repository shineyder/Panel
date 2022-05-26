import {
  Component,
  OnInit
} from '@angular/core';
import {
  NbToastrService,
  NbComponentStatus,
  NbDialogService,
  NbWindowService
} from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
import { StorageService } from '../../storage.service';
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
  error: boolean = false
  resourceError: boolean = false
  loading: boolean = true
  alive: boolean = true

  constructor(
    private userService: UserService,
    private resourceService: ResourceService,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService,
    private windowService: NbWindowService,
    private localStorageService: StorageService
  )
  {
  }

  ngOnInit(): void {
    this.listResources()
    this.listUsers()
  }

  listUsers() {
    this.error = false
    this.loading = true

    this.userService.read()
    .pipe(takeWhile(() => this.alive))
    .subscribe(users => {
      this.users = users
      this.users.splice(this.users.indexOf(this.users.find(x => x.is_admin == true)), 1);
      this.loading = false
    }, (error) => {
      this.error = true
      this.loading = false
    })
  }

  listResources() {
    this.resourceError = false

    this.resourceService.read()
    .pipe(takeWhile(() => this.alive))
    .subscribe(resources => {
      this.resources = resources
    }, error => {
      this.resourceError = true
      this.showMessage('warning', 'Erro', 'Falha ao buscar lista de recursos, atualizar permissões foi desabilitado', 6000);
    })
  }

  openDeleteDialog(id: number) {
    this.dialogService.open(UserDeleteComponent, { context: { identifier: +`${id}` } })
    .onClose
    .pipe(takeWhile(() => this.alive))
    .subscribe(result => {
      if (result === 'deleted') {
        this.users.splice(this.users.indexOf(this.users.find(x => x.id === id)), 1);
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
    ).onClose
    .pipe(takeWhile(() => this.alive))
    .subscribe(() => {
      var userUpdated = this.localStorageService.get('tmp_user_data')

      if (userUpdated != null) {
        this.users.find(x => x.id === userUpdated.user_id)
        .resource_permissions = userUpdated.resource_permissions
        this.localStorageService.remove('tmp_user_data')
      }
    })
  }

  showMessage(status: NbComponentStatus, title: string, message: string, duration: number) {
    this.toastrService.show(message, title, { status, duration: duration });
  }

  isListReady() {
    return !this.loading && this.users && this.users.length > 0
  }

  isListEmpty() {
    return !this.loading && this.users && this.users.length == 0
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
