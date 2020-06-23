import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.scss'],
})
export class ServicesListComponent implements OnInit {

  formList: any = [];
  detail: any = this._translate.instant("home");
  language: string = localStorage.getItem('language');

  constructor(
    private _translate: TranslateService,
    public _userService: UserService
  ) {
    setTimeout(() => {
      this.createServiceList()
    }, 260);

  }

  ngOnInit() {
    this._userService.languageChanges().subscribe((res: any) => {
      console.log("RESPONSE", res);
      this.language = res.language
      this._initialiseTranslation();
    })
  }

  ionViewWillEnter(){
    this._userService.detectFooterChange('request');
  }

  createServiceList() {
    this.formList = [
      {
        name: this.detail.TransferPrescripsion,
        url: '/home/transfer-prescription'
      },
      {
        name: this.detail.RefillRequest,
        url: '/home/refill-request'
      },
      {
        name: this.detail.PriceCheck,
        url: '/home/price-check'
      }
    ]
  }


  /**
   * change and detect language
   */
  _initialiseTranslation(): void {
    setTimeout(() => {
      this._translate.use(this.language);
      this.detail = this._translate.instant("home");
      this.createServiceList();
    }, 250);
  }

}
