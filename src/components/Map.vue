<template>
  <div class="map-container" id="map-container">
    <navmenu :insMap="this.map"></navmenu>
  </div>
</template>

<script> 
import Map from '../utils/map';
import NavMenu from './NavMenu.vue';
import MapEchart from '../utils/echartLayer'
//import config from '../../config'
export default {
  name: "mymap",
  components: {
    'navmenu':NavMenu
  },
  data(){
    return {
      map: {},
      loc: {}
    }
  },
  methods:{
  },
  mounted() {
    Map.getTileLayer().then( layer =>{
          this.map =Map.createMap("map-container",{
           layers:[layer.ChinaDark],
           center: [30.564146,105.607567],
           zoom: 7,
           zoomControl: true
        });
        //this.map.setView([31.59, 120.29],4);
        Map.createTileLayer(this.map,layer);
        // 设施地图视图 中心位置
   });
   //获取地址与经纬度之间的关系
   MapEchart.getLayerInfor().then( data =>{
       this.loc=data.data.rows;
       console.log(this.loc);
    })
  }
}
</script>

<style lang="less" scoped>
.map-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>


