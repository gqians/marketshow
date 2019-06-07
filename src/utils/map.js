import "leaflet/dist/leaflet.css";
import L from "leaflet";
import 'leaflet.chinatmsproviders';
import { tiledMapLayer,echartsLayer} from '@supermap/iclient-leaflet';
import echart  from './echartLayer';
import echarticon from './echartIcon';
const getTileLayer=async ()=>{
   let host = window.isLocal ? window.server : "http://support.supermap.com.cn:8090";
   let ChinaPromise = tiledMapLayer(host + '/iserver/services/map-china400/rest/maps/China', {noWrap: true});
   let ChinaDarkPromise = tiledMapLayer(host + '/iserver/services/map-china400/rest/maps/ChinaDark', {noWrap: true});
   let China=await ChinaPromise;
   let ChinaDark=await ChinaDarkPromise;
   return {China,ChinaDark}
};
const createTileLayer =(map,layers) => {
   //$L.tileLayer.chinaProvider('Geoq.Normal.PurplishBlue', { maxZoom: 15, minZoom: 3 }).addTo(map);   
   //$L.tileLayer.chinaProvider('Geoq.Normal.Map', { maxZoom: 15, minZoom: 3 }).addTo(map) ;
   let baseMaps = {
        "China": layers.China,
        "ChinaDark": layers.ChinaDark
    };
    L.control.layers(baseMaps).addTo(map);
};

const createMap = (divId, options) => {
    let map = L.map(divId, options);
    return map;
}
const dopackage = async (loc,map,date,level)=>{
    let ex2_data=await echart.ex2_Getdata(date,level);
    let option=echart.fnoption(echart.ex2_convertType,ex2_data,loc);
    let layer=echartsLayer(option).addTo(map);
    return layer;
}
const dopackage_2=async(loc,map,date,level)=>{
    let ex3_data=await echarticon.ex3_Getdata(date,level);
    let option=echarticon.foption();
    let makers=echarticon.echartsIcon(map,loc,option,ex3_data,level);
    return makers;
}
const dopackage_6 = async (loc, map,level) => {
    let ex3_data = await echarticon.ex6_Getdata(level);
    let option = echarticon.foption();
    let makers = echarticon.echartsIcon_6(map, loc, option, ex3_data, level);
    return makers;
}
export default {
    createMap,
    createTileLayer,
    getTileLayer,
    dopackage,
    dopackage_2,
    dopackage_6
}
    
