<template>
  <div class="meeting">
    <div class="meeting-user-list">

    </div>
    <div class="meeting-core">
      <div class="meeting-core-video">
        <div id="local_stream"></div>
      </div>
      <div class="meeting-core-chat"></div>
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
    await this.meeting.playLocalStreamAsync('local_stream');
  },
  methods:{
    share(){

    },
    stopShare(){

    },
    muted(){

    },
    sendMessage(){

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

      #local_stream{
        display: inline-block;
        width: 250px;
        height: 250px;
      }
    }

    .meeting-core-chat{
      height: 100px;
    }
  }
}
</style>