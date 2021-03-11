import { RTCClient } from './rtcClient';

const sdkAppId = "1400494935";
const secret = "a6979e618362543afa5de4995f70868997461d2a7dcf8696e509c04facb4c527";

export class RTCFactory{
    static create(){
        return new RTCClient(sdkAppId, secret);
    }
}