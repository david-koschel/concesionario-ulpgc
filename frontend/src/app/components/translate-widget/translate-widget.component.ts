import { Component, OnInit, Renderer2 } from '@angular/core';


@Component({
  selector: 'app-translate-widget',
  standalone: true,
  templateUrl: './translate-widget.component.html',
  styleUrls: ['./translate-widget.component.scss']
})

export class TranslateWidgetComponent implements OnInit {

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    this.loadScripts();
  }

  private loadScripts(): void {
    const gConfigurationScript = this.renderer.createElement('script');
    gConfigurationScript.text = `
      window.gtranslateSettings = {
        "languages": ["es", "en", "de", "fr"],
        "globe_color": "#66aaff",
        "detect_browser_language":true,
        "wrapper_selector": ".gtranslate_wrapper",
        "horizontal_position": "left",
        "vertical_position": "bottom",
      };
    `;
    document.body.appendChild(gConfigurationScript);


    const translateScript = this.renderer.createElement('script');
    translateScript.src = 'https://cdn.gtranslate.net/widgets/latest/globe.js';
    document.body.appendChild(translateScript);
  }


}

