import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  private translations = new BehaviorSubject<Record<string, string>>({});
  private currentLang = 'tr';

  constructor(private http: HttpClient) {
    this.loadTranslations(this.currentLang);
  }

  private loadTranslations(lang: string): void {
    const currLang = localStorage.getItem('lang') || lang;
    this.currentLang = currLang;
    this.http.get<Record<string, string>>(`/i18n/${currLang}.json`).subscribe({
      next: (data) => this.translations.next(data),
      error: (err) => console.error('Translation file loading error:', err),
    });
  }

  changeLanguage(lang: string): void {
    this.currentLang = lang;
    localStorage.setItem('lang', lang);
    this.loadTranslations(lang);
  }

  translate(key: string): string {
    return this.translations.getValue()[key] || key;
  }
}
