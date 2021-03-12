export class Meeting {

    constructor(rtc, im){
        this._rtc = rtc;
        this._im = im;

        this._roomId = '000999';
        this._userId = '31_hello_test';

        this._localStream;
    }

    get im(){
        return this._im;
    }

    get rtc(){
        return this._rtc;
    }

    get roomId(){
        return this._roomId;
    }
    set roomId(val){
        this._roomId = val;
    }

    get userId(){
        return this._userId;
    }
    set userId(val){
        this._userId = val;
    }

    async startAsync(){
        this.checkInvariant();
        await this.startIMAsync();
        await this.startRTCAsync();
    }

    async startIMAsync(){
        this.registerIMEvent();
        await this.im.loginAsync(this.userId);
    }

    registerIMEvent(){
        this.im.onReady(async () =>
        {
          var res = await this.im.createGroupAsync(this.roomId);
          await this.im.joinGroupAsync(res.data.group.groupID);
        });
    }

    async startRTCAsync(){
        this.registerRTCEvent();
        await this.rtc.loginAsync(this.userId);
        await this.rtc.joinAsync(parseInt(this.roomId));
        await this.pushLocalStreamAsync();
    }

    registerRTCEvent(){

    }

    async pushLocalStreamAsync(){
        this._localStream = await this._rtc.createStreamAsync();
        await this._localStream.initialize();
        await this._rtc.publishAsync(this._localStream);
    }

    playLocalStreamAsync(eleId){
        return this._localStream.play(eleId);
    }


    checkInvariant(){
        if(!this.roomId){
            throw new Error('房间号不允许为空');
        }
        if(!this.userId){
            throw new Error('用户标识不允许为空');
        }
    }
}