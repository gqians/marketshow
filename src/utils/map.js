import "leaflet/dist/leaflet.css";
import L from "leaflet";
import 'leaflet.chinatmsproviders';
import { tiledMapLayer,echartsLayer} from '@supermap/iclient-leaflet';
import echart  from './echartLayer';
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
export default {
    createMap,
    createTileLayer,
    getTileLayer,
    dopackage
}
    
