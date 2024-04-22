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
  @Input() editingObject: any;
  @Input() titleLabel = '';
  @Output() private onFormSubmit = new EventEmitter<any>();
  @ViewChild('inputFile') inputFile!: ElementRef;

  ngOnInit() {
    if (this.editingObject) {
      const form: FormGroup = this.formBuilder.group({
        name: [this.editingObject.name, Validators.required],
        description: [this.editingObject.description, Validators.required],
        price: [this.editingObject.price, [Validators.required]]
      });
      if (this.showImage) {
        form.addControl("image", new FormControl(this.editingObject.image, Validators.required));
      }
      this.form = form;
    } else  {
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
  }

  submitForm() {
    this.error = !this.form.valid;
    if (this.form.valid) {
      if (this.editingObject) {
        this.onFormSubmit.emit({...this.form.value, id: this.editingObject.id});
      } else {
        this.onFormSubmit.emit(this.form.value);
      }
      this.form.reset();
      if (this.showImage) this.inputFile.nativeElement.value = "";
    }
  }

  handleUpload(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => this.form.get('image')?.setValue(reader.result);
    reader.readAsDataURL(file);
  }
}
