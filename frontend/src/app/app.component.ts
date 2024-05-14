import {Component, inject, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from "./components/header/header.component";
import {ToastModule} from "primeng/toast";
import {MessageService, PrimeNGConfig} from "primeng/api";
import {FooterComponent} from "./components/footer/footer.component";
import {registerLocaleData} from "@angular/common";
import localeEs from '@angular/common/locales/es'
import {TranslateWidgetComponent} from "./components/translate-widget/translate-widget.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, ToastModule, FooterComponent, TranslateWidgetComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [MessageService]
})
export class AppComponent implements OnInit {
  private config = inject(PrimeNGConfig);

  ngOnInit(): void {
    registerLocaleData(localeEs, 'es');
    this.config.setTranslation({
      monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
      monthNamesShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
      dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
      accept: "Sí",
      firstDayOfWeek: 1,
      dateFormat: "dd/mm/yy"
    });

  }


}
