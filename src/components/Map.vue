<template>
  <div class="map-container" id="map-container" v-loading="loading">
    <v-navmenu :insMap="this.map" :insLoc="this.loc" @initcity="fromcity" @initcounty="fromcounty"></v-navmenu>
    <v-timeslider v-show="show" @showloading="doloading" @completeloading="complete" :insMap="this.map" :insLoc="this.loc" :show="this.show" :level="this.level" :layer="this.layer">
    </v-timeslider>
  </div>
</template>

<script> 
import Map from '../utils/map';
import NavMenu from './NavMenu.vue';
import MapEchart from '../utils/echartLayer'
import TimeSlider from './TimeSlider.vue'
//import config from '../../config'
export default {
  name: "mymap",
  components: {
    'v-navmenu':NavMenu,
    'v-timeslider':TimeSlider
  },
  data(){
    return {
      map: {},
      loc: {},
      show:false,
      level:'',
      layer:{},
      loading:false
    }
  },
  methods:{
    fromcity(show,level){
       this.show=show;
       this.level=level;
       if(Object.keys(this.layer).length!=0){
         this.layer.remove();
       }
       //进行初始化
       Map.dopackage(this.loc,this.map,"201407",this.level).then((layer)=>{
          this.layer=layer;
       })
    },
    fromcounty(show,level){
       this.show=show;
       this.level=level;
       if(Object.keys(this.layer)!=0){
         this.layer.remove();
       }
       //进行初始化
       Map.dopackage(this.loc,this.map,"201407",this.level).then((layer)=>{
          this.layer=layer;
       })
    },
    doloading(show){
       this.loading=show;
    },
    complete(show,layer){
      this.loading=show;
      this.layer=layer;
    }
  },
  mounted() {
    Map.getTileLayer().then( layer =>{
          this.map =Map.createMap("map-container",{
           crs: L.CRS.EPSG3857,
           layers:[layer.ChinaDark],
           center: [30.564146,105.607567],
           zoom: 6,
           zoomControl: true
        });
        //this.map.setView([31.59, 120.29],4);
        Map.createTileLayer(this.map,layer);
        // 设施地图视图 中心位置
   });
   //获取地址与经纬度之间的关系
   MapEchart.getLayerInfor().then( data =>{
       this.loc=data.data.rows;
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


