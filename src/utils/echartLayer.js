import axios from 'axios';
/**
 * 获取实验二所需的数据
 * date:日期
 * level:city or county
 */
const ex2_Getdata= async (date,level)=>{
    try{
        const data =await axios.get(`http://localhost:4156/allcount/${date}/${level}`);
        return data.data.rows;
    }catch(err){
        console.log(err);
     }
    
}
/**
 * 获取经纬度与地名表，异步函数，只在mounted阶段执行一次
 */
const getLayerInfor= async ()=>{
    try{
        const data =await axios.get(`http://localhost:4156/levelLoc`);
        return data;
    }catch(err){
        console.log(err);
    }
    
}
/**
 * 将数据和坐标转化echart所需要的格式
 * loc:经纬度
 */
const ex2_convertType=(loc,ex2_data)=>{
    let res=[];
    for (let data of ex2_data){
        
        if(Reflect.has(data,'city')){
            let oneloc=loc.filter( (aloc,index) =>{
                return aloc.city == data.city
            });
            let floc = oneloc[0].max;
            let arrLoc=floc.split(',');
            [arrLoc[0], arrLoc[1]] = [arrLoc[1], arrLoc[0]];
            res.push({
                name: data.city,
                value: arrLoc.concat(data.num)
          })
        }
        if (Reflect.has(data, 'county')) {
            let oneloc = loc.filter((aloc, index) => {
                return aloc.county == data.county
            });
            let floc = oneloc[0].max;
            let arrLoc = floc.split(',');
            [arrLoc[0], arrLoc[1]] = [arrLoc[1], arrLoc[0]];
            res.push({
                name: data.county,
                value: arrLoc.concat(data.num)
            })
        }
    }
    return res;
}
/**
 * 获取echart的option
 */
const fnoption = (convertData,data,loc) =>{
    let d=data[0];
    let radix=500;
    if (Reflect.has(d, 'county')){
        radix=200;
    }
   let option = {
    title: {
        text: "市县活跃度",
        left: 'center'
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a}<br>{b}<br>{c}'
    },
    legend: {
        orient: 'vertical',
        y: 'bottom',
        x: 'right',
        data: ['pm2.5'],
        textStyle: {
            color: '#7E57C2'
        }
    },
    series: [
        {
            name: '购买活跃度',
            type: 'scatter',
            coordinateSystem: 'leaflet',
            data: convertData(loc,data),
            symbolSize: (data)=> {
                return data[2] / radix;
            },
            label: {//标记，指的是文字
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: true
                },
                emphasis: {
                    show: false//强调
                }
            },
            itemStyle: {
                normal: {
                    color: '#26C6DA'
                }
            }
        },
        {
            name: 'Top 5',
            type: 'effectScatter',
            coordinateSystem: 'leaflet',
            data: convertData(loc,data.sort(function (a, b) {
                return b.num - a.num;
            }).slice(0, 5)),
            symbolSize: function (val) {
                return val[2] / radix;
            },
            showEffectOn: 'render',
            rippleEffect: {
                brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: true
                }
            },
            itemStyle: {
                normal: {
                    color: '#00838F',
                    shadowBlur: 10,
                    shadowColor: '#333'
                }
            },
            zlevel: 1
        }
    ]
  };
return option;
}
export default {
    getLayerInfor,
    ex2_Getdata,
    ex2_convertType,
    fnoption
}