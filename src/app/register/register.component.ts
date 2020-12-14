import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  EmailValidator,
  PasswordValidator,
} from '../_forms/regexValidations.validator';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  registerForm: FormGroup;
  maxDate: Date;
  validationErrors: string[] = [];
  constructor(
    private accountService: AccountService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    // this.maxDate = new Date();
    // this.maxDate.setFullYear(this.maxDate.getFullYear() - 16);
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          EmailValidator.emailValidator({
            pattern: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          }),
        ],
      ],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      // dateOfBirth: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(50),
          PasswordValidator.passwordValidator(),
        ],
      ],
      confirmPassword: [
        '',
        [Validators.required, this.matchValues('password')],
      ],
    });
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value
        ? null
        : { isMatching: true };
    };
  }

  register() {
    this.accountService.register(this.registerForm.value).subscribe(
      (response) => {
        this.router.navigateByUrl('/nomads');
        this.cancel();
      },
      (error) => {
        console.log(error);
        this.validationErrors = error;
      }
    );
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}

// emailValidator(config: any): ValidatorFn {
//   return (control: AbstractControl) => {
//     let urlRegEx: RegExp = config.pattern;
//     if (control?.value && !control.value.match(urlRegEx)) {
//       return {
//         isInvalidRgx: true,
//       };
//     } else {
//       return null;
//     }
//   };
// }

// this.registerForm = new FormGroup({
//   email: new FormControl('', Validators.required),
//   password: new FormControl('', [
//     Validators.required,
//     Validators.minLength(4),
//     Validators.maxLength(8),
//   ]),
//   confirmPassword: new FormControl('', [
//     Validators.required,
//     this.matchValues('password'),
//   ]),
// });

// passwordValidator(): ValidatorFn {
//   return (control: AbstractControl) => {
//     let hasUpper = /(?=.*?[A-Z])/.test(control.value);
//     let hasLower = /(?=.*?[a-z])/.test(control.value);
//     let hasDigit = /(?=.*?[0-9])/.test(control.value);
//     let hasSpecialCharacter = /(?=.*?[#?!@$%^&*-])/.test(control.value);
//     if (control?.value) {
//       if (!hasUpper) {
//         return { noUpper: true };
//       }
//       if (!hasLower) {
//         return { noLower: true };
//       }
//       if (!hasDigit) {
//         return { noDigit: true };
//       }
//       if (!hasSpecialCharacter) {
//         return { noSpecialCharacter: true };
//       }
//       return null;
//     }
//   };
// }
