<template>
  <div class="detail-wrapper">
    <article class="detail-content">
      <header>
        Detail {{$route.params.id}}
      </header>
      <router-link :to="{
        name: 'detailId',
        params: {
          id: Number($route.params.id) + 1
        }
      }">Detail {{Number($route.params.id) + 1}}</router-link>
      <p>Progressive Web Apps are user experiences that have the reach of the web, and are:</p>
      <router-link to="/">come back home</router-link>
    </article>
  </div>
</template>

<script>
// import axios from 'axios'
import {mapState} from 'vuex'
export default {
  name: 'detail-_id',
    metaInfo () {
    return {
      title: `Lavas Sample Detail ${this.$route.params.id}`,
      titleTemplate: '%s - Lavas',
      meta: [
          {name: 'keywords', content: `Lavas Sample Detail`},
          {name: 'description', content: `Lavas Sample Detail ${this.$route.params.id}`}
      ]
    }
  },
  // async asyncData () {
  //   let result = await axios(`https://query.yahooapis.com/v1/public/yql?q=select%20item.condition%20from%20weather.forecast%20where%20woeid%20%3D%202151849&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`);
  //   let condition = result.data.query.results.channel.item.condition;
  //   console.log(`Weather of Shanghai: ${condition.text}, ${condition.temp}°F`);
  // },
  async asyncData({store, route}) {
    await store.dispatch('detail/setWeather', {woeid: 2151849}) // 调用vuex的dispatch告知 store 发送请求获取数据
  },
  computed: {
    ...mapState('detail', [ // 将weather挂在到this中
      'weather'
    ])
  },
  created () {
    console.log(`Weather of Shanghai: ${this.weather.text}, ${this.weather.temp}°F`)
  }
}
</script>

<style lang="stylus" scoped>
.detail-content
    font-size 16px
    line-height 30px
    margin-top 30px

    .detail-title
        margin-bottom 20px
        padding 10px 0
        font-size 36px
        font-weight bold

</style>
