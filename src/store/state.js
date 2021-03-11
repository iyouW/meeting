import { IMFactory } from '../core/factories/imFactory';
import { RTCFactory } from '../core/factories/rtcFactory';

export const state = {
    user:'',
    room:'',
    im: IMFactory.create(),
    rtc: RTCFactory.create()
};