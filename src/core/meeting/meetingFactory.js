import { Meeting } from './meeting';
import { RTCFactory } from '../lib/rtc/rtcFactory';
import { IMFactory } from '../lib/im/imFactory';

export class MeetingFactory {
    static Create(){
        const rtcClient = RTCFactory.Create();
        const imClient = IMFactory.Create();
        const share = RTCFactory.Create();
        return new Meeting(rtcClient, imClient, share);
    }
}