<template>
  <div class="meeting">
    <div class="meeting-user-list">
      <div>
        <button @click.stop="share">分享</button>
      </div>
      <div>
        <button @click.stop="stopShare">停止分享</button>
      </div>
    </div>
    <div class="meeting-core">
      <div class="meeting-core-video">
        <div id="local_stream" class="video"></div>
        <div id='r_1' class="video"></div>
        <div id ='s_1' class="video"></div>
      </div>
      <div class="meeting-core-chat">
        <div class="meeting-core-chat-board">
          <div class="meeting-core-chat-board-item" v-for="(v,i) in meeting._receivedMessages" :key="i">
            <div>{{v.from}}:</div>
            <div>{{v.message}}</div>
          </div>
        </div>
        <div class="meeting-core-chat-input">
          <textarea v-model='meeting.message' placeholder="请输入文本" @keyup.enter="sendMessage"></textarea>
          <button class="meeting-core-chart-input-send" @click.stop="sendMessage">发送</button>
        </div>
      </div>
    </div>
    
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  computed:{
    ...mapGetters(['meeting'])
  },
  async mounted(){
    await this.meeting.initAsync();
    await this.meeting.startAsync();
    await this.meeting.playLocalStreamAsync('local_stream');
  },
  methods:{
    share(){
      this.meeting.shareAsync();
    },
    stopShare(){

    },
    muted(){

    },
    async sendMessage(){
      await this.meeting.sendMessageAsync();
    }
  }
}
</script>
<style lang="less" scoped>
.meeting{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-content: flex-start;

  .meeting-user-list{
    width: 200px;
    height: 100%;
  }

  .meeting-core{
    flex: 1;
    display: flex;
    flex-direction: column;
    
    .meeting-core-video{
      flex: 1;
      overflow-y: auto;
      padding:20px;

      #local_stream{
        display: inline-block;
        width: 250px;
        height: 250px;
      }

      .video{
        display: inline-block;
        width: 200px;
        height: 200px;
        vertical-align: top;
      }

      #s_1{
        display: inline-block;
        width: 800px;
        height: 800px;
      }
    }

    .meeting-core-chat{
      height: 200px;
      display: flex;
      flex-direction: column;

      .meeting-core-chat-board{
        flex: 1;
        overflow-y: auto;

        .meeting-core-chat-board-item{
          display: flex;
          flex-direction: row;

          &>div:first-child{
            width: 100px;
          }

          &>div:last-child{
            flex:1;
          }
        }
      }

      .meeting-core-chat-input{
        width: 100%;
        height: 100px;

        &>textarea{
          padding:10px;
          width: 100%;
          height: 100%;
          resize: none;

          &::placeholder{
            opacity: 0.8;
          }
        }
        &>button{
          position: absolute;
          padding: 3px 10px;
          right: 30px;
          bottom: 10px;
        }
      }
    }
  }
}
</style>