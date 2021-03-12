import TRTC from 'trtc-js-sdk';
import { TRTC_TYPES } from './rtcTypes';

export class RTCClient{

    static Expire(){
        return 1000*60*60*24*5;
    }

    constructor(sdkAppId,secret, cryptoProvider){
        this._sdkAppId = sdkAppId;
        this._secret = secret;
        this._cryptoProvider = cryptoProvider;

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

    loginAsync(userId, mode = TRTC_TYPES.MODE.RTC){
        return new Promise((resolve,reject)=>{
            try {
                this._userId = userId;
                const userSig = this._cryptoProvider.generateTxUserSig(
                    this._secret,
                    this._sdkAppId,
                    this._userId,
                    RTCClient.Expire())
                
                this._client = TRTC.createClient({
                    mode,
                    sdkAppId:this._sdkAppId,
                    userId,
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

    createStreamAsync(){
        this._localStream = TRTC.createStream({
            userId:this._userId,
            audio:true,
            video:true
        });
        return this._localStream;
    }

}