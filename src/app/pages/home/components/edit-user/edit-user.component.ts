import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  editUserForm: FormGroup;

  constructor(private router: Router) {
    this.editUserForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      role: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(15)])
    });
  }

  ngOnInit() {
    const user = { name: 'Joao Teixeira', email: 'jt123@example.com', role: 'Engenheiro de FE', password: '123456' };
    this.editUserForm.patchValue(user);
  }

  onSubmit() {
    console.log('User edited:', this.editUserForm.value);
    this.router.navigate(['/app/users']);
  }
}
