import TRTC from 'trtc-js-sdk';
import { TRTC_TYPES } from './rtcTypes';

export class RTCClient{

    constructor(sdkAppId,secret){
        this._sdkAppId = sdkAppId;
        this._secret = secret;
        this._audioDevices = [];
        this._videoDevices = [];
        this._client;
        this._userId;
        this._localStream;
        this._remoteSrreams = [];
    }

    get userId(){
        return this._userId;
    }

    get localStream(){
        return this._localStream;
    }

    async isSupported(){
        return await TRTC.checkSystemRequirements();
    }

    setProxyServer(proxy){
        return this._client.setProxyServer(proxy);
    }

    loginAsync(user, userSig, mode = TRTC_TYPES.MODE.RTC){
        return new Promise((resolve,reject)=>{
            try {
                this._userId = user;
                this._client = TRTC.createClient({
                    mode,
                    sdkAppId:this._sdkAppId,
                    userId:user,
                    userSig
                });
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }

    joinAsync(roomId, role = TRTC_TYPES.ROLE.AUDIENCE){
        return this._client.join({
            roomId,
            role
        });
    }

    leaveAsync(){
        return this._client.leave();
    }

    publishAsync(stream){
        return this._client.publish(stream);
    }

    unpublishAsync(stream){
        return this._client.unpublish(stream);
    }

    createStreamAsync(userId){
        this._localStream = TRTC.createStream({
            userId,
            audio:true,
            video:true
        });
    }

}