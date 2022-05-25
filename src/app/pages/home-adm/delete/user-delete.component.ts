import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { UserService } from '../userService';

@Component({
  selector: 'user-delete',
  templateUrl: './user-delete.component.html',
})
export class UserDeleteComponent{

  @Input() identifier: number;

  constructor(
    protected dialogRef: NbDialogRef<UserDeleteComponent>,
    private userService: UserService,
    )
  {
  }

  close() {
    this.dialogRef.close();
  }

  delete(id: number) {
    this.userService.delete(id)
    this.dialogRef.close('deleted')
  }
}
