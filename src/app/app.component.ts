import { Component } from '@angular/core';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import { zhCN, enUS, NzLocaleService } from 'ng-zorro-antd';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private lang = 'zh';
  private abc = '';

  constructor(
    private translate: TranslateService,
    private nzLocaleService: NzLocaleService
  ) {
    // 添加语言支持
    translate.addLangs(['zh', 'en']);
    // 设置默认语言，一般在无法匹配的时候使用
    translate.setDefaultLang('zh');
    // 获取当前浏览器环境的语言比如en、 zh
    const broswerLang = translate.getBrowserLang();
    translate.use(broswerLang.match(/en|zh/) ? broswerLang : 'zh');
    const broswerLangNz = broswerLang.match(/en/) ? enUS : zhCN;
    this.nzLocaleService.setLocale(broswerLangNz);

    // console.log(broswerLang);

    // translate.stream(broswerLang).subscribe((event: TranslationChangeEvent) => {
    //   // debugger;
    //   this.abc = this.translate.instant('welcome');
    // });
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
