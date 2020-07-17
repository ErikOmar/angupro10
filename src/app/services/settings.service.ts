import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private linkTheme = document.querySelector('#theme');
  private links: NodeListOf<Element>;

  urlTheme = 'assets/css/colors/default-dark.css';

  constructor() {
    if (localStorage.getItem('theme')) {
      this.urlTheme = localStorage.getItem('theme'); // || 'assets/css/colors/default-dark.css';
    }
    this.linkTheme.setAttribute('href', this.urlTheme);
  }

  changeTheme(theme: string, link: any) {

    const url = `assets/css/colors/${theme}.css`;
    this.linkTheme.setAttribute('href', url);

    localStorage.setItem('theme', url);
    this.checkCurrentTheme();
  }

  checkCurrentTheme() {
    const themes = document.querySelectorAll('.selector');

    themes.forEach(item => {
      const theme = item.getAttribute('data-theme');
      const linkItem = `assets/css/colors/${theme}.css`;
      this.urlTheme = localStorage.getItem('theme');
      item.classList.remove('working');

      if (linkItem === this.urlTheme) {
        item.classList.add('working');
      }
    })

  }
}
