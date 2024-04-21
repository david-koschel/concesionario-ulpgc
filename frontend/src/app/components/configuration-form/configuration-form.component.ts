import {Component, ElementRef, EventEmitter, inject, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-configuration-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './configuration-form.component.html',
  styleUrl: './configuration-form.component.scss'
})
export class ConfigurationFormComponent implements OnInit {

  private formBuilder = inject(FormBuilder);
  protected form!: FormGroup;
  protected error = false;

  @Input() showImage = true;
  @Input() titleLabel = '';
  @Output() private onFormSubmit = new EventEmitter<any>();
  @ViewChild('inputFile') inputFile!: ElementRef;

  ngOnInit() {
    const form: FormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required]]
    });

    if (this.showImage) {
      form.addControl("image", new FormControl('', Validators.required));
    }

    this.form = form;
  }

  submitForm() {
    this.error = !this.form.valid;
    if (this.form.valid) {
      this.onFormSubmit.emit(this.form.value);
      this.form.reset();
      this.inputFile.nativeElement.value = "";
    }
  }

  handleUpload(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => this.form.get('image')?.setValue(reader.result);
    reader.readAsDataURL(file);
  }
}
