import './echartsIcon.css';
import '../assets/assets/css/leaflet.extra-markers.css'
import {ExtraMarkers} from '../assets/assets/js/leaflet.extra-markers.js';
import L from 'leaflet';
import echarts from 'echarts';
import axios from 'axios';
const ex3_Getdata= async (date,level)=>{
    try{
        const data =await axios.get(`http://localhost:4156/maxCategory/${date}/${level}`);
        return data.data.rows;
    }catch(err){
        console.log(err);
     }
    
}
const ex6_Getdata=async(level)=>{
    try {
        const data = await axios.get(`http://localhost:4156/maxSell/${level}`);
        return data.data.rows;
    } catch (err) {
        console.log(err);
    }
}
const foption=()=>{
    let option={
     title: {
        text: "销售总量最高的商品类型",
        left: 'center',
        show:false
       },
       grid: {
                top:20,
                left:0,
                right:1,
                bottom:10,
                show:true
     },
        color: ['#FFFF66'],
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
   backgroundColor:'rgba(237, 231, 246, 0.1)',
    xAxis : [
        {
            type : 'category',
            data : [''],
            axisTick: {
                alignWithLabel: false
            },
            show :false
        }
    ],
    yAxis : [
        {
            type : 'value',
            max:10000,
            show:false
        }
    ],
    series : [
        {
            name:'销售总量',
            type:'bar',
            barWidth: '30%',
            data:[0]
        }
    ]
    }
    return option;
}



const echartsIcon= (map, loc,option,ex3_data,level)=> {
    let makers=[];
    for(let data of ex3_data){
        if(level=='city'){
            let oneloc=loc.filter( (aloc) =>{
                return aloc.city == data.city
            });
            let floc = oneloc[0].max;
            let arrLoc=floc.split(',');
            //[arrLoc[0], arrLoc[1]] = [arrLoc[1], arrLoc[0]];
            option.xAxis[0].data[0]=`${data.city}最大销售类型:${data.category_name}`
            option.series[0].data[0]=data.num;

            let newClassName = 'icon-' + arrLoc.join('-');
            let myIcon = L.divIcon({
                className: 'my-div-icon',
                html: "<div class='echarts-icon " + newClassName + "'></div>"
             });
            // you can set .my-div-icon styles in CSS
           
            //makers.push(maker1);
            let maker= L.marker(arrLoc, { icon: myIcon }).addTo(map);
            makers.push(maker);
            //console.log(maker);
            let dom=document.getElementsByClassName(newClassName);
            let myChart = echarts.init(dom[0]);
            myChart.setOption(option);
            let redMarker = ExtraMarkers.icon({
                icon: 'plus sign',
                markerColor: 'orange',
                shape: 'star',
                prefix: 'fa'
            });
            maker=L.marker(arrLoc, { icon: redMarker }).addTo(map);
            makers.push(maker);
        }
            //return makers;
        if (level=='county') {
            let oneloc = loc.filter((aloc) => {
                return aloc.county == data.city
            });
            let floc = oneloc[0].max;
            let arrLoc = floc.split(',');
            //[arrLoc[0], arrLoc[1]] = [arrLoc[1], arrLoc[0]];
            option.xAxis[0].data[0] = `${data.city}最大销售类型:${data.category_name}`
            option.series[0].data[0] = data.num;
            option.yAxis[0].max=2000;
            let newClassName = 'icon-' + arrLoc.join('-');
            let myIcon = L.divIcon({
                className: 'my-div-icon',
                html: "<div class='echarts-icon " + newClassName + "'></div>"
            });
            // you can set .my-div-icon styles in CSS

            //makers.push(maker1);
            let maker = L.marker(arrLoc, { icon: myIcon }).addTo(map);
            makers.push(maker);
            //console.log(maker);
            let dom = document.getElementsByClassName(newClassName);
            let myChart = echarts.init(dom[0]);
            myChart.setOption(option);
            let redMarker = ExtraMarkers.icon({
                icon: 'plus sign',
                markerColor: 'orange',
                shape: 'star',
                prefix: 'fa'
            });
            maker = L.marker(arrLoc, { icon: redMarker }).addTo(map);
            makers.push(maker);
        }
    }
    return makers;
}

const echartsIcon_6 = (map, loc, option, ex6_data, level) => {
    let makers = [];
    for (let data of ex6_data) {
        if (level == 'city') {
            let oneloc = loc.filter((aloc) => {
                return aloc.city == data.city
            });
            let floc = oneloc[0].max;
            let arrLoc = floc.split(',');
            //[arrLoc[0], arrLoc[1]] = [arrLoc[1], arrLoc[0]];
            option.xAxis[0].data[0] = `${data.city}在${data.yearmonth}月到达销售顶峰`
            option.series[0].data[0] = data.num;
            option.yAxis[0].max = 20000;
            let newClassName = 'icon-' + arrLoc.join('-');
            let myIcon = L.divIcon({
                className: 'my-div-icon',
                html: "<div class='echarts-icon " + newClassName + "'></div>"
            });
            // you can set .my-div-icon styles in CSS

            //makers.push(maker1);
            let maker = L.marker(arrLoc, { icon: myIcon }).addTo(map);
            makers.push(maker);
            //console.log(maker);
            let dom = document.getElementsByClassName(newClassName);
            let myChart = echarts.init(dom[0]);
            myChart.setOption(option);
            let redMarker = ExtraMarkers.icon({
                icon: 'plus sign',
                markerColor: 'orange',
                shape: 'star',
                prefix: 'fa'
            });
            maker = L.marker(arrLoc, { icon: redMarker }).addTo(map);
            makers.push(maker);
        }
        //return makers;
        if (level == 'county') {
            let oneloc = loc.filter((aloc) => {
                return aloc.county == data.county
            });
            let floc = oneloc[0].max;
            let arrLoc = floc.split(',');
            //[arrLoc[0], arrLoc[1]] = [arrLoc[1], arrLoc[0]];
            option.xAxis[0].data[0] = `${data.county}在${data.yearmonth}月到达销售顶峰`
            option.series[0].data[0] = data.num;
            option.yAxis[0].max = 4000;
            let newClassName = 'icon-' + arrLoc.join('-');
            let myIcon = L.divIcon({
                className: 'my-div-icon',
                html: "<div class='echarts-icon " + newClassName + "'></div>"
            });
            // you can set .my-div-icon styles in CSS

            //makers.push(maker1);
            let maker = L.marker(arrLoc, { icon: myIcon }).addTo(map);
            makers.push(maker);
            //console.log(maker);
            let dom = document.getElementsByClassName(newClassName);
            let myChart = echarts.init(dom[0]);
            myChart.setOption(option);
            let redMarker = ExtraMarkers.icon({
                icon: 'plus sign',
                markerColor: 'orange',
                shape: 'star',
                prefix: 'fa'
            });
            maker = L.marker(arrLoc, { icon: redMarker }).addTo(map);
            makers.push(maker);
        }
    }
    return makers;
}


export default {
    ex3_Getdata,
    foption,
    echartsIcon,
    ex6_Getdata,
    echartsIcon_6
}