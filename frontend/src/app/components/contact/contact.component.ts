import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-contact',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    FloatLabelModule
  ],
  templateUrl: './contact.component.html',
  standalone: true,
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit{

  contactForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm() {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: [''],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
      privacy: [false, Validators.requiredTrue]
    });
  }
}
