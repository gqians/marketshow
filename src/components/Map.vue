<template>
  <div class="map-container" id="map-container" v-loading="loading" element-loading-text="拼命加载中" element-loading-background="rgba(0, 0, 0, 0.5)">
    <v-navmenu :insMap="this.map" :insLoc="this.loc" @initcity="fromcity" @initcounty="fromcounty" @initcity_3="fromcity_3" @initcounty_3="fromcounty_3" 
    @initcity_6="fromcity_6" @initcounty_6="fromcounty_6"
    ></v-navmenu>
    <v-timeslider v-show="show" @showloading="doloading" @completeloading="complete" :insMap="this.map" :insLoc="this.loc" :show="this.show" :level="this.level" :layer="this.layer">
    </v-timeslider>
    <v-timeslider_3 v-show="show_3" @showloading="doloading" @completeloading="complete_3" :insMap="this.map" :insLoc="this.loc" :show="this.show_3" :level="this.level" :makers="this.makers">
    </v-timeslider_3>
  </div>
</template>

<script> 
import Map from '../utils/map';
import NavMenu from './NavMenu.vue';
import MapEchart from '../utils/echartLayer';
import TimeSlider from './TimeSlider.vue';
import TimeSlider_3 from './TimeSlider_3.vue';
import L from "leaflet"
//import config from '../../config'
export default {
  name: "mymap",
  components: {
    'v-navmenu':NavMenu,
    'v-timeslider':TimeSlider,
    'v-timeslider_3':TimeSlider_3
  },
  data(){
    return {
      map: {},
      loc: {},
      show:false,//控制实验2时间轴
      show_3:false,//控制实验3时间轴
      level:'',
      layer:{},
      loading:false,//控制加载层
      makers:[],
      makers_6:[]
    }
  },
  methods:{
    fromcity(show,show_3,level){
       this.show=show;
       this.level=level;
       this.show_3=show_3;
       if(Object.keys(this.layer).length!=0){
         this.layer.remove();
       }
       if(this.makers.length!=0){
          for(let maker of this.makers){
            maker.remove();
          }
       }
       if(this.makers_6.length!=0){
          for(let maker of this.makers_6){
            maker.remove();
          }
       }
       //进行初始化
       this.loading=true;
       Map.dopackage(this.loc,this.map,"201407",this.level).then((layer)=>{
          this.loading=false;
          this.layer=layer;
       })
       
    },
    fromcounty(show,show_3,level){
       this.show=show;
       this.level=level;
       this.show_3=show_3;
       if(Object.keys(this.layer)!=0){
         this.layer.remove();
       }
       if(this.makers.length!=0){
          for(let maker of this.makers){
            maker.remove();
          }
       }
       if(this.makers_6.length!=0){
          for(let maker of this.makers_6){
            maker.remove();
          }
       }
       //进行初始化
       this.loading=true;
       Map.dopackage(this.loc,this.map,"201407",this.level).then((layer)=>{
         this.loading=false;
          this.layer=layer;
       })
    },
    //展示加载层
    doloading(show){
       this.loading=show;
    },
    //完成加载，关闭加载层
    complete(show,layer){
      this.loading=show;
      this.layer=layer;
    },
    complete_3(show,makers){
      this.loading=show;
      this.makers=makers;
    },
    fromcity_3(show,show_3,level){
       this.show=show;
       this.show_3=show_3;
       this.level=level;
       if(Object.keys(this.layer).length!=0){
         this.layer.remove();
       }
       if(this.makers.length!=0){
          for(let maker of this.makers){
            maker.remove();
          }
       }
       if(this.makers_6.length!=0){
          for(let maker of this.makers_6){
            maker.remove();
          }
       }
       //进行初始化
       this.loading=true;
       Map.dopackage_2(this.loc,this.map,"201407",this.level).then( (makers) =>{
         this.loading=false;
         this.makers=makers;
       });
    },
    fromcounty_3(show,show_3,level){
       this.show=show;
       this.show_3=show_3;
       this.level=level;
       if(Object.keys(this.layer).length!=0){
         this.layer.remove();
       }
       if(this.makers.length!=0){
          for(let maker of this.makers){
            maker.remove();
          }
       }
       if(this.makers_6.length!=0){
          for(let maker of this.makers_6){
            maker.remove();
          }
       }
       //进行初始化
       this.loading=true;
       Map.dopackage_2(this.loc,this.map,"201407",this.level).then( (makers) =>{
         this.loading=false;
         this.makers=makers;
       });
    },
    fromcity_6(show,show_3,level){
       this.show=show;
       this.show_3=show_3;
       this.level=level;
       if(Object.keys(this.layer).length!=0){
         this.layer.remove();
       }
       if(this.makers.length!=0){
          for(let maker of this.makers){
            maker.remove();
          }
       }
       if(this.makers_6.length!=0){
          for(let maker of this.makers_6){
            maker.remove();
          }
       }
       this.loading=true;
       Map.dopackage_6(this.loc,this.map,this.level).then(makers =>{
         this.loading=false;
         this.makers_6=makers;
       })
    },
    fromcounty_6(show,show_3,level){
       this.show=show;
       this.show_3=show_3;
       this.level=level;
       if(Object.keys(this.layer).length!=0){
         this.layer.remove();
       }
       if(this.makers.length!=0){
          for(let maker of this.makers){
            maker.remove();
          }
       }
       if(this.makers_6.length!=0){
          for(let maker of this.makers_6){
            maker.remove();
          }
       }
       this.loading=true;
       Map.dopackage_6(this.loc,this.map,this.level).then(makers =>{
         this.loading=false;
         this.makers_6=makers;
       })
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


