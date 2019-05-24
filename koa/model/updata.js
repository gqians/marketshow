import client from './conn';
import getdata from './getdata';
async function updata (){
    client().then((cli)=>{
        getdata("SELECT distinct loc FROM public.sale where county  is null",cli).then(
            async (map)=>{
              console.log('开始更新');
              let i=0;
              console.log(map.size);
              for(let key of map.keys()){
                 let loc= key.loc;
                  let sql = `update public.sale set county='${map.get(key)}' where county is null and loc='${loc}'`;
                 let res = await cli.query(sql);
                 i++;
                 console.log(i);
           }}
     //console.log(map);
      )
 })
}
export default updata;