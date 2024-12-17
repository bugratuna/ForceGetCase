import { Component, inject, OnInit, signal } from '@angular/core';
import { TranslateService } from '../../core/services/translate/translate.service';
import { UpperCasePipe } from '@angular/common';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import {
  NzDropDownADirective,
  NzDropDownDirective,
  NzDropdownMenuComponent,
} from 'ng-zorro-antd/dropdown';
import { NzMenuDirective, NzMenuItemComponent } from 'ng-zorro-antd/menu';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { TranslatePipe } from '../../core/pipelines/translate.pipe';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    UpperCasePipe,
    NzMenuDirective,
    NzMenuItemComponent,
    NzDropdownMenuComponent,
    NzDropDownADirective,
    NzDropDownDirective,
    NzIconDirective,
    RouterLink,
    RouterLinkActive,
    TranslatePipe,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  protected readonly translateService = inject(TranslateService);
  protected readonly router = inject(Router);

  routeAddress = signal(this.router.url);

  languages = ['tr', 'eng', 'de'];
  selectedLanguage = 'tr';

  ngOnInit(): void {
    this.selectedLanguage = localStorage.getItem('lang') || 'tr';
    this.router.events.subscribe({
      next: (event) => {
        if (event instanceof NavigationEnd) {
          const url = event.url || '';
          this.routeAddress.set(url);
        }
      },
    });
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  changeLanguage(event: Event): void {
    const val = (event?.target as HTMLSelectElement)?.value;
    this.translateService.changeLanguage(val);
  }

  logout(): void {
    localStorage.clear(); // localStorage temizle
    this.router.navigate(['/login']); // Login sayfasına yönlendir
  }
}
