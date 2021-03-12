<template>
  <div class="home">
    <section>
      <label>
        姓名:
        <input type="text" v-model="meeting.userId"/>
      </label>
    </section>
    <section>
      <label>
        房间号:
        <input type="text" v-model="meeting.roomId"/>
      </label>
    </section>
    <section>
      <button @click.stop="enter">加入</button>
    </section>
  </div>
</template>

<script>
import {mapGetters } from 'vuex';

export default {
    computed:{
      ...mapGetters(['meeting'])
    },
    methods:{
      async enter(){
        await this.meeting.startAsync();
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
