import client from '../model/conn';
import getdata from '../model/getdata'; 
export default {
    /**
     * 输入月份和等级，获取count值
     */
    allcount: async (ctx,next)=>{
         console.log("进入url")
         let params=ctx.params;
         let date=params.date;
         let level=params.level;
         let sql=`select count(*) as num, ${level} from mv_${date} group by ${level} order by ${level} desc `;
         console.log(sql);
         const cli=await client();
         const res=await getdata(sql,cli);
         cli.release();
         ctx.response.body=res;
         await next();
    },
    /**
     * 输入月份和登记，获取最大的销售类型
     */
    maxCategory : async(ctx,next)=>{
         let params=ctx.params;
         let date=params.date;
         let level=params.level;
         let sql=`select table1.city,table1.num,table1.category_name from (
                    select max(num),city from
                      (select * from all_level_category('public.mv_${date}','${level}')) as table3
                        group by city
                        order by city desc
                      ) as table2,(select * from all_level_category('public.mv_${date}','${level}')) as table1
                   where table1.num=table2.max and table1.city=table2.city`;
         const cli=await client();
         const res=await getdata(sql,cli);
         cli.release();
         ctx.response.body=res;
         await next();
    },
    maxSell : async(ctx,next)=>{
         let params=ctx.params;
         let level=params.level;
         let sql=`select distinct ${level}_max.num,${level}_max.yearmonth,${level}_max.${level} from
                (select distinct max(num) as num,${level} from ${level}_max
                group by ${level})
                as table1,${level}_max
                where table1.num=${level}_max.num and table1.${level}=${level}_max.${level}
                order by ${level}`
         const cli=await client();
         const res=await getdata(sql,cli);
         cli.release();
         ctx.response.body=res;
         await next();
    },
    levelLoc : async(ctx,next)=>{
         let sql='select * from mv_loc'
         const cli=await client();
         const res=await getdata(sql,cli);
         cli.release();
         ctx.response.body=res;
         await next();
    }
}