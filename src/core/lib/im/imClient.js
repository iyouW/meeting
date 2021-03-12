import TIM from 'tim-js-sdk';

export class IMClient{

    static Expire(){
        return 1000*60*60*24*5;
    }

    constructor(sdkAppId, secret, cryptoProvider){
        this._sdkAppId = sdkAppId;
        this._secret = secret;
        this._crytoProvider = cryptoProvider;

        this._userId;
        this._groupId;
    }

    initAsync(userId, groupId){
        this._userId = userId;
        this._groupId = groupId;
        this._client = TIM.create({SDKAppID: this._sdkAppId});
        
        const userSig = this._crytoProvider.generateTxUserSig(
            this._secret,
            this._sdkAppId,
            this._userId,
            IMClient.Expire()
        )
        return this._client.login({
            userID: this._userId,
            userSig
        });
    }

    async createGroupAsync(type = TIM.TYPES.GRP_MEETING, joinOption = TIM.TYPES.JOIN_OPTIONS_FREE_ACCESS){
        await this._client.createGroup({
            groupID:this._groupId,
            name: this._groupId,
            type,
            joinOption
        });
    }

    dismissGroupAsync(){
        return this._client.dismissGroup(this._groupId);
    }

    joinGroupAsync(type = TIM.TYPES.GRP_MEETING){
        return this._client.joinGroup({
            groupID:this._groupId,
            type
        });
    }

    quitGroupAsync(){
        return this._client.quitGroup(this._groupId);
    }

    searchGroupByIDAsync(){
        return this._client.searchGroupByID(this._groupId);
    }

    sendMessageAsync(message){
        var txMSG = this._client.createTextMessage({
            to: this._groupId ,
            conversationType : TIM.TYPES.CONV_GROUP,
            payload:{
                text:message
            }
        })
        return this._client.sendMessage(txMSG, {
            onlineUserOnly: true
        });
    }

    onReady(callback){
        this._client.on(TIM.EVENT.SDK_READY, callback);
    }

    onMessageReceived(callback){
        this._client.on(TIM.EVENT.MESSAGE_RECEIVED, evt => {
            callback(evt.data);
        })
    }

}