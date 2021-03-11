import TIM from 'tim-js-sdk';

export class IMClient{

    constructor(sdkAppId,secret){
        this._skdAppId = sdkAppId;
        this._secret = secret;
        this._client = TIM.create({SDKAppID: this._skdAppId});
    }

    loginAsync(userId, userSig){
        return this._client.login({
            userID: userId,
            userSig
        });
    }

    createGroupAsync(
            groupId,
            type = TIM.TYPES.GRP_MEETING,
            joinOption = TIM.TYPES.JOIN_OPTIONS_FREE_ACCESS){
        return this._client.createGroup({
            groupId,
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