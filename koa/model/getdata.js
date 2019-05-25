//import client from './conn';
import axios from 'axios';
import config  from '../config'
//const map=new Map();
async function getdata (sql,cli){
  console.log('开始获取数据');
  const res = await cli.query(sql);
  //await changeData(res);
  //console.log(map.size);
  //console.log(map);
  return res;
}
//将获取到的经纬度通过天地图api逆编码
 async function changeData(res){
     let i=0
    for(let r of res.rows){
        let lon=r.loc.split(',')[1];
        let lat=r.loc.split(',')[0];
        let address= await axios.get(`http://api.tianditu.gov.cn/geocoder?postStr={'lon':${lon},'lat':${lat},'ver':1}&type=geocode&tk=${config.tiandituKey}`);
        //console.log(address.data.result.addressComponent.county);
        if(address.data.result.addressComponent.county == undefined){
            address.data.result.addressComponent.county='五通桥区'//由于数据错误关系，需要手动添加
        }
        map.set(r,address.data.result.addressComponent.county);
        i++;
        console.log(i);
    }
}

export default getdata;