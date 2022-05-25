import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbToastrService, NbComponentStatus, NbDialogService } from '@nebular/theme';
import { User } from '../models/user.model';
import { Resource } from '../models/resource.model';
import { UserUpdateComponent } from '../update/user-update.component';
import { UserService } from '../userService';


@Component({
  selector: 'user-read',
  templateUrl: './user-read.component.html',
})
export class UserReadComponent implements OnInit{

  user: User
  resourcePermission: Resource
  id: number

  constructor(
    private userService: UserService,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService,
    private route: ActivatedRoute
    )
  {
  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')
    this.userService.readById(this.id).subscribe(user => {
      this.user = user
    })
  }

  openUpdateDialog(id: number) {
    this.dialogService.open(UserUpdateComponent, { context: { user: this.user } })
    .onClose.subscribe(result => {
      if (result[0] == 'updated') {
        this.showMessage('success', 'Sucesso', 'Usuário atualizado com sucesso');
      }
    })
  }

  showMessage(status: NbComponentStatus, title: string, message: string) {
    this.toastrService.show(message, title, { status });
  }
}
