/* eslint-disable no-unused-vars */
export class Meeting {

    constructor(rtc, im, share){
        this._rtc = rtc;
        this._im = im;
        this._share = share;

        this._roomId = '000999';
        this._userId = '31_test_1';

        this._localStream = null;
        this._shareStream = null;
        this._remoteStreams = [];

        this._containers = 30;

        this._message = '';

        this._receivedMessages = [];

        this._shareUserId = '31_test_6';
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

    get message(){
        return this._message;
    }

    set message(val){
        this._message = val;
    }

    async initAsync(){
        this.checkInvariant();
        await this.initRTCAsync();
        await this.initIMAsync();
        await this.initShareAsync();
    }

    async initRTCAsync(){
        await this.rtc.initAsync(this.userId, this.roomId);
        this.registerRTCEvent();
    }

    async initIMAsync(){
        await this.im.initAsync(this.userId, this.roomId);
        this.registerIMEvent();
    }

    async initShareAsync(){
        await this._share.initAsync(this._shareUserId, this.roomId);
    }

    async startAsync(){
        await this.startIMAsync();
        await this.startRTCAsync();
    }

    async startIMAsync(){
        
    }

    registerIMEvent(){
        this.im.onReady(async evt =>
        {
            const res = await this.im.searchGroupByIDAsync(this.roomId);
            if(!res.data){
                await this.im.createGroupAsync(this.roomId);
            }
            await this.im.joinGroupAsync(this.roomId);
        });

        this.im.onMessageReceived(evt => {
            for (const item of evt) {
                this._receivedMessages.push({from: item.from, message: item.payload.text});
            }
        })
    }

    async startRTCAsync(){
        await this.rtc.joinAsync(parseInt(this.roomId));
        await this.pushLocalStreamAsync();
    }

    registerRTCEvent(){
        this.rtc.onStreamAdded(async evt=>{
            await this.rtc.subscribeAsync(evt.stream);
        });

        this.rtc.onStreamSubscribed(evt =>{
            const remoteStream = evt.stream;
            if(remoteStream.getUserId() == this._shareUserId){
                remoteStream.play('s_1');
            }else{
                remoteStream.play('r_1');
            }
            this._remoteStreams.push(remoteStream);
        })
    }

    async pushLocalStreamAsync(){
        this._localStream = await this._rtc.createStreamAsync();
        await this._localStream.initialize();
        await this._rtc.publishAsync(this._localStream);
    }

    playLocalStreamAsync(eleId){
        return this._localStream.play(eleId);
    }


    async sendMessageAsync(){
        if(!this.message){
            return
        }
        await this.im.sendMessageAsync(this.message);
        this._receivedMessages.push({from:this._userId, message:this.message});
        this._message = '';
    }

    async shareAsync(){
        this._shareStream = await this._share.shareAsync();
        await this._shareStream.initialize();
        await this._share.joinAsync();
        await this._share.publishAsync(this._shareStream);
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