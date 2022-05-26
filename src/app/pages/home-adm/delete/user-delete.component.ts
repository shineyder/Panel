import { Component, Input } from '@angular/core';
import { NbComponentStatus, NbDialogRef, NbToastrService } from '@nebular/theme';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserService } from '../userService';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.scss']
})
export class UserDeleteComponent{

  @Input() identifier: number;

  private ngUnsubscribe = new Subject<void>();

  constructor(
    protected dialogRef: NbDialogRef<UserDeleteComponent>,
    private userService: UserService,
    private toastrService: NbToastrService,
    )
  {
  }

  close() {
    this.dialogRef.close();
  }

  delete(id: number) {
    this.userService.delete(id)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(result => {
      this.showMessage('success', 'Sucesso', 'Usuário excluido com sucesso');
      this.dialogRef.close('deleted')
    }, error => {
      this.showMessage('warning', 'Erro', 'Falha ao excluir usuário');
      this.dialogRef.close('error')
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
