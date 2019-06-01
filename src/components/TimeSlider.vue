<template>
  <div class="block" @mousemove="stopon" @mouseout="movallowed">
    <el-slider
      :step="8"
      v-model="value"
      :marks="marks" @change="Tchange($event)" >
    </el-slider>
  </div>
</template>

<script>
import echart from '../utils/map';
import bus from '../utils/bus';
  export default {
    data() {
      return {
        value:0,
        marks: {
          0: '201407',
          8: '201408',
          16: '201409',
          24: '201410',
          32: '201411',
          40: '201412',
          48: '201501',
          56: '201502',
          64: '201503',
          72: '201504',
          80: '201505',
          88: '201506'
        },
        mylayer:{},
        originlayer:{}
      }
    },
    methods:{
        Tchange(event) {
          if(Object.keys(this.mylayer).length==0){
            this.mylayer=this.layer;
            this.originlayer=this.layer;
          }
          if(this.originlayer!==this.layer){
            this.mylayer=this.layer;
          }
          this.mylayer.remove();
          this.$emit("showloading",true);
          echart.dopackage(this.insLoc,this.insMap,Reflect.get(this.marks,this.value),this.level).then((layer)=>{
              this.mylayer=layer;
              this.$emit("completeloading",false,this.mylayer);
          });
            
        },
        stopon(){
       // console.log(map.dragging.enable());
        this.insMap.dragging.disable();//进入导航后禁止移动地图
        this.insMap.doubleClickZoom.disable();//进入导航后禁止双击放大
      },
      movallowed(){
        this.insMap.dragging.enable();
        this.insMap.doubleClickZoom.enable();
      }
    },
    props:["insMap","insLoc","show","level","layer"],
    created(){
      bus.$on('day',(val)=>{
        this.value=val;
      })
    }
  }
</script>
<style lang="less">
.el-slider__runway {
    position:absolute !important;
    width: 70% !important;
    left: 15%;
    top:90%;
    z-index: 401;
}
</style>
