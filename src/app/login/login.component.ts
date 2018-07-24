import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {
  private text = '';
  private browserLang = '';
  constructor(private translate: TranslateService) {


    // translate.getTranslation('en').subscribe((res: string) => {
    //   console.log(res);
    //   // this.text = res['welcome'];
    // });

  }
  ngOnInit() {
    this.text = this.translate.instant('welcome');
    this.browserLang = this.translate.getBrowserLang();
  }

  ngAfterViewInit() {
    this.text = this.translate.instant('welcome');
    this.browserLang = this.translate.getBrowserLang();
  }

}
