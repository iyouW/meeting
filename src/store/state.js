import { IMFactory } from '../core/lib/im/imFactory';
import { RTCFactory } from '../core/lib/rtc/rtcFactory';

export const state = {
    user:'',
    room:'',
    im: IMFactory.create(),
    rtc: RTCFactory.create()
};