import { NzModalService, NzModalSubject } from 'ng-zorro-antd';
import { Component, Injectable } from '@angular/core';
import * as _ from 'lodash';
import { ConfigInterface } from 'ng-zorro-antd/src/modal/nz-modal.service';

import * as $ from 'jquery';
import { Defer } from '../class/defer';

@Injectable()
export class DialogService {
    constructor(private modalService: NzModalService) {
    }

    // 打开info框
    info(obj: ConfigInterface): NzModalSubject {
        obj.zIndex = this.getZindex();
        return this.modalService.info(obj);
    }

    // 打开success框
    success(obj: ConfigInterface): NzModalSubject {
        obj.zIndex = this.getZindex();
        return this.modalService.success(obj);
    }

    // 打开error框
    error(obj: ConfigInterface): NzModalSubject {
        obj.zIndex = this.getZindex();
        return this.modalService.error(obj);
    }

    // 打开warning框
    warning(obj: ConfigInterface): NzModalSubject {
        obj.zIndex = this.getZindex();
        return this.modalService.warning(obj);
    }

    // 打开confirm框
    confirm(obj: ConfigInterface): NzModalSubject {
        obj.zIndex = this.getZindex();
        return this.modalService.confirm(obj);
    }

    // 获取顶层对话框的zindex
    private getZindex() {
        const defulat = 1000;
        const dom: any = $('.ant-modal-wrap:first');

        if (!dom.length) {
            return defulat;
        }
        let index = dom.css('zIndex');
        if (_.isNumber(index)) {
            return ++index;
        } else {
            return defulat;
        }
    }

    // 打开对话框
    open(options): Promise<any> {
        const defer = new Defer();
        options = _.extend({
            content: '',
            footer: true,
            title: options.title,
            zIndex: this.getZindex(),
            onOk: () => true,
            componentParams: {}
        }, options);

        const subscription = this.modalService.open(options);

        subscription.subscribe((result: any) => {
            if (result && result.type === 'ok' && result.data) {
                defer.resolve(result.data);
                subscription.destroy();
            }
        });
        return defer.promise;
    }




}
