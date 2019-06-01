<template>
<div @mousemove="stopon" @mouseout="movallowed">
<VueDragResize :isActive="false" :snapToGrid="true" :isResizable="false" :w="150" :h="385" style="z-index:401">
  <el-tag>可拖动菜单</el-tag>

  
   <el-row class="tac">
     <el-col :span="12">
       <el-menu
         default-active="2"
         class="el-menu-vertical-demo"
         @open="handleOpen"
         @close="handleClose"
         background-color="#545c64"
         text-color="#fff"
         active-text-color="#ffd04b">

   <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>实验二</span>
        </template>
         <el-menu-item-group>
          <template slot="title">选择级别</template>
          <el-menu-item index="1-1" @click="cityclick">市</el-menu-item>
          <el-menu-item index="1-2" @click="countyclick">县</el-menu-item>
        </el-menu-item-group>
   </el-submenu>

       <el-menu-item index="1">
         <i class="el-icon-view"></i>
         <span slot="title">实验二</span>
       </el-menu-item>
       <el-menu-item index="2">
         <i class="el-icon-view"></i>
         <span slot="title">实验二</span>
       </el-menu-item>
       <el-menu-item index="2">
         <i class="el-icon-view"></i>
         <span slot="title">实验三</span>
       </el-menu-item>
      </el-menu>
    </el-col>
   </el-row>    


</VueDragResize>
</div>
</template>
    
<script>
  import VueDragResize from 'vue-drag-resize'
  import Map from '../utils/map';
  import bus from '../utils/bus';
  export default {
     data() {
            return {
                width: 0,
                height: 0,
                top: 0,
                left: 0,
                showslider: false,
                level:''
            }
        },
    methods: {
      handleOpen(key, keyPath) {
       console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      resize(newRect) {
                this.width = newRect.width;
                this.height = newRect.height;
                this.top = newRect.top;
                this.left = newRect.left;
      },
      stopon(){
       // console.log(map.dragging.enable());
        this.insMap.dragging.disable();//进入导航后禁止移动地图
        this.insMap.doubleClickZoom.disable();//进入导航后禁止双击放大
      },
      movallowed(){
        this.insMap.dragging.enable();
        this.insMap.doubleClickZoom.enable();
      },
      cityclick(){
        this.showslider=true;
        this.level="city";
        this.$emit("initcity",this.showslider,this.level);
        bus.$emit("day",0);
      },
      countyclick(){
        this.showslider=true;
        this.level="county";
        this.$emit("initcounty",this.showslider,this.level);
        bus.$emit("day",0);
      }
    },
    components: {
      VueDragResize
    },
    props:["insMap","insLoc"]
  }
</script>
<style lang="less" scoped>
.el-col-12 {
    width: 100% !important;
}
.vdr.active:before {
    outline:1px #d6d6d6 !important; 
}
.el-submenu .el-menu-item {
    min-width: 0px !important;
}
</style>
