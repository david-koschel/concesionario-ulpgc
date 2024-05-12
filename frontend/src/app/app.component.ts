import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";
import {FooterComponent} from "./components/footer/footer.component";
import {TranslateWidgetComponent} from "./components/translate-widget/translate-widget.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, ToastModule, FooterComponent, TranslateWidgetComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [MessageService]
})
export class AppComponent {
  title = 'frontend';
}
