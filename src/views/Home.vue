<template>
  <div class="home">
    <section>
      <label>
        姓名:
        <input type="text" v-model="user"/>
      </label>
    </section>
    <section>
      <label>
        房间号:
        <input type="text" v-model="room"/>
      </label>
    </section>
    <section>
      <button @click.stop="enter">加入</button>
    </section>
  </div>
</template>

<script>
import {mapGetters, mapMutations } from 'vuex';

export default {
    data(){
      return{
        user:'31_meeting_test_1',
        userSig:'eJwtzUELgkAQBeD-sueQWZ0tFTrlIaqTFXST0MmG1HQdtIj*e6Ye53uPNx91OhydjqwKleuAWow3Z1QJ33hkTyclkXCVJ0KtJHoutdnjWtecqVAjAAYYeGZK6FWzpcGNMS4ATCpc-m2pDRp0IZhXOB9*YEyFvZ8zjI0U3aqPfHnnzUVL1O761E*brcU9xLixz7X6-gAVLzZB',
        room:888999
      }
    },
    computed:{
      ...mapGetters(['im','rtc'])
    },
    methods:{
      ...mapMutations(['changeUser','changeRoom']),
      async enter(){
        this.im.onReady(async () =>
        {
          await this.im.createGroupAsync(this.room);
          await this.im.joinGroupAsync(this.room);
        });
        await this.im.loginAsync(this.user, this.userSig);
        await this.rtc.loginAsync(this.user, this.userSig);
        await this.rtc.joinAsync(this.room);
        this.$router.push("/meeting");
      }
    }
}
</script>
<style lang="less" scoped>
.home{
  width: 1200px;
  margin: auto;
  text-align:  center;
}
</style>
