import { Component, OnInit } from '@angular/core';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { zhCN, enUS, NzLocaleService } from 'ng-zorro-antd';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private lang: string;
  private abc: string;
  constructor(private translate: TranslateService, private nzLocaleService: NzLocaleService) {
    // translate.stream(this.languageType).subscribe((event: TranslationChangeEvent) => {
    //   debugger;
    //   this.abc = translate.instant('welcome');
    // });
    // translate.getTranslation(this.languageType).subscribe((value) => {
    // this.translate.use(this.languageType).subscribe(() => {
    //   this.abc = translate.instant('welcome');
    // });
    // })
  }


  ngOnInit() {
    this.getLang();
    this.translate.use(this.lang);
    if (this.lang === 'en') {
      this.nzLocaleService.setLocale(enUS);
    } else {
      this.nzLocaleService.setLocale(zhCN);
    }
    setTimeout(() => {
      this.abc = this.translate.instant('welcome');
    }, 1000);

  }


  toggleLang() {
    let lang;
    let langNz;
    switch (this.lang) {
      case 'zh':
        lang = 'en';
        langNz = enUS;
        break;
      case 'en':
        lang = 'zh';
        langNz = zhCN;
        break;
      default:
        lang = 'zh';
        langNz = zhCN;
    }
    this.lang = lang;
    this.translate.use(lang);
    this.nzLocaleService.setLocale(langNz);
  }

  getLang() {
    this.lang = this.translate.getBrowserLang();
    console.log(this.translate.getBrowserLang());
    // 获取语言风格，相当于更详细的语言类型，比如zh-CN、zh-TW、en-US
    console.log(this.translate.getBrowserCultureLang());
  }

}
