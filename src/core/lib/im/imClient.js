import TIM from 'tim-js-sdk';

export class IMClient{

    static Expire(){
        return 1000*60*60*24*5;
    }

    constructor(sdkAppId, secret, cryptoProvider){
        this._sdkAppId = sdkAppId;
        this._secret = secret;
        this._crytoProvider = cryptoProvider;

        this._client = TIM.create({SDKAppID: this._sdkAppId});

        this._userId;
    }

    loginAsync(userId){
        this._userId = userId;
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

    createGroupAsync(
            groupId,
            type = TIM.TYPES.GRP_MEETING,
            joinOption = TIM.TYPES.JOIN_OPTIONS_FREE_ACCESS){
        return this._client.createGroup({
            groupId,
            name: groupId,
            type,
            joinOption
        })
    }

    dismissGroupAsync(groupId){
        return this._client.dismissGroup(groupId);
    }

    joinGroupAsync(groupId,type = TIM.TYPES.GRP_MEETING){
        return this._client.joinGroup({
            groupID:groupId,
            type
        });
    }

    quitGroupAsync(groupId){
        return this._client.quitGroup(groupId);
    }

    sendMessage(message){
        return this._client.sendMessage(message, {
            onlineUserOnly: true
        });
    }

    onReady(callback){
        this._client.on(TIM.EVENT.SDK_READY, callback);
    }

}