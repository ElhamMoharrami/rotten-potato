import { createSlice} from '@reduxjs/toolkit';



const initialState={
    data:[],
    pageCount:0
}



const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
      setData(state,action){
        state.data=action.payload.fetchedData
        state.pageCount=action.payload.pageCount
      },
       clearData(state,action){
        state.data=[];
        state.pageCount=0
       }
      
    },
  });
  
  


export const fetchData=(url)=>{

    return async (dispatch)=>{

     const  getDataRequest=async()=>{
      const response = await fetch(url);
      const data = await response.json();
      return data;
        }

        try{
          const getData= await getDataRequest()
                  
dispatch(
    dataActions.setData({
      fetchedData:getData.content,
      pageCount:getData.page.totalPages
    }))
    window.scrollTo(0, 0);
        }catch{
            console.log('if you see this it probably means you are screwed');
        }

    }
}


export const resetData=()=> {
  return {
      type: 'RESET_Data'
  }
}


export const dataActions = dataSlice.actions;
  
  export default dataSlice;



  