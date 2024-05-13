import {Component, ViewChild} from '@angular/core';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-tpv-form',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './tpv-form.component.html',
  styleUrl: './tpv-form.component.scss'
})
export class TpvFormComponent {

  @ViewChild("tpvForm")
  private tpvForm: any;
  @ViewChild("i1")
  private signatureVersion: any;
  @ViewChild("i2")
  private parameters: any;
  @ViewChild("i3")
  private signature: any;

  public submitData(data: any) {
    this.signatureVersion.nativeElement.value = data.ds_SignatureVersion;
    this.parameters.nativeElement.value = data.ds_MerchantParameters;
    this.signature.nativeElement.value = data.ds_Signature;
    this.tpvForm.nativeElement.submit();
  }
}
