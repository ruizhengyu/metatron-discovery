/*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*      http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

import {Component, ElementRef, EventEmitter, HostListener, Injector, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import { AbstractPopupComponent } from '../../../common/component/abstract-popup.component';
import { PopupService } from '../../../common/service/popup.service';
import {PrDatasetFile, SheetInfo, FileFormat} from '../../../domain/data-preparation/pr-dataset';
import { DatasetService } from '../service/dataset.service';
import { GridComponent } from '../../../common/component/grid/grid.component';
import { header, SlickGridHeader } from '../../../common/component/grid/grid.header';
import { GridOption } from '../../../common/component/grid/grid.option';

import { isNull, isNullOrUndefined } from 'util';
import * as pixelWidth from 'string-pixel-width';
import {PreparationCommonUtil} from "../../util/preparation-common.util";
import {CommonUtil} from "../../../common/util/common.util";
import {PreparationAlert} from '../../util/preparation-alert.util';

@Component({
  selector: 'app-create-dataset-api',
  templateUrl: './create-dataset-api.component.html',
})
export class CreateDatasetApiComponent extends AbstractPopupComponent implements OnInit, OnDestroy {

  /*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
   | Private Variables
   |-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

  private _isInit: boolean = true;

  /*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
   | Protected Variables
   |-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

  /*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
   | Public Variables
   |-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/
  @Output()
  public typeEmitter = new EventEmitter<string>();

  @Input()
  public datasetFiles: any;

  public client_id : string = '';
  public client_secret : string = '';
  public auth_code: string = '';
  public access_token: string = '';
  public appsecret: string = '';
  public adaccount_id: string = '';

  public errorNum: number;
  /*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
   | Constructor
   |-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/
  constructor(private popupService: PopupService,
              private datasetService: DatasetService,
              protected elementRef: ElementRef,
              protected injector: Injector) {

    super(elementRef, injector);

  }

  /*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
   | Override Method
   |-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/
  public ngOnInit() {

    super.ngOnInit();

    this._isInit = ( !this.datasetFiles[0]);

    if (this._isInit){

      let datasetFile = new PrDatasetFile();

    }
  }

  public ngOnDestroy() {
    super.ngOnDestroy();

  }

  /*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
   | Public Method
   |-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/
  /**
   * Close
   */
  public close() {
    super.close();

    this.popupService.notiPopup({
      name: 'close-create',
      data: null
    });
  }

  /**
   * Previous step
   */
  public prev() {
    super.close();
    this.popupService.notiPopup({
      name: 'close-create',
      data: null
    });
  }

  /**
   * Move to next step
   */
  public next() {

    this.typeEmitter.emit('URL');
    this.popupService.notiPopup({
      name: 'create-dataset-name',
      data: null
    });

  }

public call(service) {
    let params = {
      'client_id' : this.client_id,
      'client_secret' : this.client_secret,
      'developer_token' : this.developer_token,
      'access_token' : this.access_token,
      'appsecret' : this.appsecret,
      'adaccount_id' : this.adaccount_id
    };
    if(service=='google') {
    this.datasetService.postGoogleAds(params)
      .then(result => {
        this.loadingHide();
        console.log(result);
      })
      .catch((error) => {
        this.loadingHide();
        let prep_error = this.dataprepExceptionHandler(error);
        PreparationAlert.output(prep_error, this.translateService.instant(prep_error.message));
      });

    } else {
      this.datasetService.postFacebook(params)
      .then(result => {
        this.loadingHide();
        console.log(result);
      })
      .catch((error) => {
        this.loadingHide();
        let prep_error = this.dataprepExceptionHandler(error);
        PreparationAlert.output(prep_error, this.translateService.instant(prep_error.message));
      });
    }
}



}
