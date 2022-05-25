import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { NbWindowRef } from '@nebular/theme';
import { Resource } from '../models/resource.model';
import { Permission } from '../models/update-permission.model';
import { User } from '../models/user.model';
import { UserService } from '../userService';

@Component({
  selector: 'user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss'],
})
export class UserUpdateComponent  implements OnInit{

  /*
  {
    user_id: 1,
    resource_permissions: [
      {
        resource_id: 1,
        view: ...
        ...
      },
      {
        resource_id: 2,
        ....
      }
    ]
  }

  Skills:
  <div formArrayName="skills">
    <div *ngFor="let skill of skills().controls; let i=index">
      <div [formGroupName]="i">
        {{i}}
        skill name :
        <input type="text" formControlName="skill">
        exp:
        <input type="text" formControlName="exp">
      </div>
    </div>
  </div>
  */

  @Input() user: User;
  @Input() resources: Resource[];

  formUpdatePermission: FormGroup;

  constructor(
    public windowRef: NbWindowRef,
    private userService: UserService,
    private fb: FormBuilder
    )
  {
  }

  ngOnInit(): void {
    /* this.createForm(); */
    this.formUpdatePermission = this.fb.group({
      user_id: this.user.id,
      resource_permissions: this.fb.array([])
    })

    this.buildFormArray();
    console.log(this.formUpdatePermission)
  }

  buildFormArray() {
    const add = this.formUpdatePermission.get('resource_permissions') as FormArray;

    this.resources.forEach(element => {
      var actualPermission = this.user.resource_permissions.find(x => x.resource.slug === element.slug)
      if (actualPermission == undefined) {
        actualPermission = {
          view: false,
          create: false,
          update: false,
          delete: false,
        }
      }

      add.push(this.fb.group({
        resource: element.slug,
        view: actualPermission.view,
        create: actualPermission.create,
        update: actualPermission.update,
        delete: actualPermission.delete
      }))
    })
  }

  /* createForm() {
     this.formUpdatePermission = new FormGroup({
      user_id: new FormControl(this.user.id),
      resource_id: new FormControl(1),
      view: new FormControl(false),
      create: new FormControl(false),
      update: new FormControl(false),
      delete: new FormControl(false),
    })
  } */

  close() {
    this.windowRef.close();
  }

 /*  onSubmit() {
    this.formUpdatePermission.value.resource_id = +this.formUpdatePermission.value.resource_id;

    this.userService.updatePermissions(this.formUpdatePermission.value)
    .subscribe(userData => {
      this.windowRef.close()
    })
  } */
}
