import { Component, OnInit, inject,ViewChild } from '@angular/core';
import { IndependentExtra } from '../../models/independentextra.model';
import { ExtraService } from '../../services/extra.service';
import {SidebarModule} from 'primeng/sidebar';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-independent-extras',
  standalone: true,
  imports: [SidebarModule,FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './independent-extras.component.html',
  styleUrl: './independent-extras.component.scss'
})
export class IndependentExtrasComponent implements OnInit{
  private extraService  = inject(ExtraService);


  independentExtras: IndependentExtra[] = [];

  addBarVisible:boolean = false;
  editBarVisible: boolean = false;



  @ViewChild('inputFile') inputFile: any;
  addForm: FormGroup;

  @ViewChild('editFile') editFile:any;
  editForm: FormGroup;


  selectedExtraId: any;

  constructor(private fb: FormBuilder) {
    this.addForm = this.fb.group({
      name: ['', Validators.required], 
      description: ['', Validators.required], 
      price: ['', Validators.required], 
      image: ['', Validators.required] 
    });

    this.editForm = this.fb.group({
      editedname: ['', Validators.required], 
      editeddescription: ['', Validators.required], 
      editedprice: ['', Validators.required], 
      editedimage: ['', Validators.required]
    });
  }

  handleExtraAdd(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => this.addForm.get('image')?.setValue(reader.result);
    reader.readAsDataURL(file);
  }
  handleExtraEdit(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => this.editForm.get('editedimage')?.setValue(reader.result);
    reader.readAsDataURL(file);
  }


  ngOnInit(): void {
      this.loadExtras();
  }

  loadExtras(){
    this.extraService.getAll().subscribe(data=>{
      this.independentExtras = data
    })
  }


  addExtraForm(){
    this.addBarVisible = true
  }
  editExtraForm(extra: IndependentExtra){
    this.selectedExtraId = extra.id;
    this.editBarVisible = true;
  }


  addIndependentExtra(){
    if (this.addForm.valid) {

      const name = this.addForm.get('name')?.value;
      const description = this.addForm.get('description')?.value;
      const image = this.addForm.get('image')?.value;
      const price = this.addForm.get('price')?.value;
      const newIndependentExtra: IndependentExtra = {
        name: name,
        description: description,
        image: image,
        price: price
      };
      this.extraService.addIndependentExtra(newIndependentExtra).subscribe(() => {
        this.loadExtras();
      });
      this.resetAddForm();
      this.addBarVisible = false;
    
    } else {
      alert("El formulario para añadir un nuevo accesorio no es válido. Por favor completa todos los campos.");
    }
    return
  }

  editIndependentExtra(){
    if(this.editForm.valid){
      const name = this.editForm.get('editedname')?.value;
      const description = this.editForm.get('editeddescription')?.value;
      const image = this.editForm.get('editedimage')?.value;
      const price = this.editForm.get('editedprice')?.value;
      const editedExtra: IndependentExtra = {
        id: this.selectedExtraId,
        name: name,
        description: description,
        image: image,
        price: price
      };

      this.extraService.updateIndependentExtra(editedExtra).subscribe(()=>{
        this.loadExtras();
      })
      this.resetEditForm();
      this.editBarVisible = false;

    } else {
      alert("El formulario para editar el accesorio no es válido. Por favor completa todos los campos.");
    }
    return
  }

  cancelAdd(){
    this.resetAddForm();
    this.addBarVisible = false;
    return
  }

  cancelEdit(){
    this.resetEditForm();
    this.editBarVisible = false;
  }

  resetAddForm(): void{
    this.addForm.reset()
    this.inputFile.nativeElement.value = '';
    return
  }
  resetEditForm(): void{
    this.editForm.reset()
    this.editFile.nativeElement.value = '';
    return
  }

}
