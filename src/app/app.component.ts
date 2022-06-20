import { Component } from '@angular/core';
//selektor nam omogucava da prikazemo html komponente u nekoj drugoj komponenti

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FrontEndG6';
}
