<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  computed:{
    ...mapGetters(['im','rtc'])
  },
  async mounted(){
    await this.rtc.createStreamAsync(this.rtc.userId);
    await this.rtc.publishAsync(this.rtc.localStream);
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