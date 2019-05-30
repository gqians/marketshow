import axios from 'axios';
const convertType= async (date,level)=>{
    try{
        const data = axios.get(`http://localhost:4156/allcount/${date}/${level}`);
    }catch(err){
        console.log(err);
     }
    return data.rows;
}
const getLayerInfor= async ()=>{
    try{
        const data =await axios.get(`http://localhost:4156/levelLoc`);
        return data;
    }catch(err){
        console.log(err);
    }
    
}
export default {
    convertType,
    getLayerInfor
}