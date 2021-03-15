import { Component } from '@angular/core';
import { Paths } from './_utils/routes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'welbi-assignment';
  Paths = Paths;
}
