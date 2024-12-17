import { Component } from '@angular/core';
import {TranslatePipe} from '../../core/pipelines/translate.pipe';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  protected readonly Date = Date;
}
