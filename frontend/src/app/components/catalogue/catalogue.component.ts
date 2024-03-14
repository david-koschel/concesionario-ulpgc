import { Component } from '@angular/core';

@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [],
  templateUrl: './catalogue.component.html',
  styleUrl: './catalogue.component.scss'
})
export class CatalogueComponent {
  vehicles = [
    {
      id: 'car1',
      name: 'Lamborghini Urus',
      description: 'El Lamborghini Urus es el primer vehículo utilitario superdeportivo en todo el mundo que fusiona el alma de un vehículo superdeportivo con la funcionalidad práctica de un SUV. Impulsado por un motor biturbo Lamborghini con turbocompresor V8 de 4 litros, el Urus se basa en la actitud de rendimiento que combina diversión en la conducción y asombrosas capacidades del vehículo. El diseño, las prestaciones, las dinámicas de conducción y una emoción desenfrenada se funden de manera fluida en la realización visionaria del auténtico ADN del Lamborghini.',
      srcImage: '../assets/lamborghiniurus.jpg'
    },
    {
      id: 'car2',
      name: 'RS 6 Avant GT',
      description: 'Siente la exclusividad del Audi RS 6 Avant GT. Una edición limitada a 10 unidades en España (660 en todo el mundo) con un diseño exterior inspirado en el legendario Audi 90 IMSA GTO. El motor V8 biturbo TFSI de 4 l. acelera de un modo extraordinario (3,3 seg de 0 a 100 km/h) gracias a la suspensión ajustable, los neumáticos de altas prestaciones y el diferencial deportivo.',
      srcImage: '../assets/RS6AvantGT.jpg'
    },
    {
      id: 'car3',
      name: 'Skoda Enyaq 60',
      description: 'El Škoda Enyaq es un SUV 100% eléctrico que ofrece una conducción cómoda y una excelente eficiencia. Está equipado con una batería de 60 kWh que ofrece una autonomía de hasta 575 km (WLTP). La expresión serena de la sección frontal, con sus faros como ojos entrecerrados, ya insinúa los puntos fuertes del Enyaq. La solidez del coche garantiza que, dentro de él, sentirás confianza y seguridad.',
      srcImage: '../assets/Skoda_Enyaq_iv_60.jpg'
    }
  ]
}
