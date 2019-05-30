<template>
<div @mousemove="stopon" @mouseout="movallowed">
<VueDragResize :isActive="false" :isResizable="false" :w="150" :h="168" style="z-index:401">
 <el-container>
  <el-aside width="300px">
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
       <el-menu-item index="2">
         <i class="el-icon-view"></i>
         <span slot="title">实验一</span>
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
  </el-aside>   
 </el-container>
</VueDragResize>
</div>
</template>
    
<script>
  import VueDragResize from 'vue-drag-resize'
 // import map from '../utils/map';
  export default {
     data() {
            return {
                width: 0,
                height: 0,
                top: 0,
                left: 0
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
      }
    },
    components: {
      VueDragResize
    },
    props:["insMap"]
  }
</script>
<style lang="less" scoped>
</style>
