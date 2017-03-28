import Ajax from '../utils/ajax'
export default {
  namespace: 'sys_func',
  state: {
    funcs: [],
    isShowSaveModel:false,
  },
  reducers: {
    save(state,{payload:{data}}){
      return {...state,funcs:data};
    },
    showSaveModel(state){
      return {...state,isShowSaveModel:!state.isShowSaveModel};
    }
  },
  effects: {
    *getAllFunc({payload},{call,put}){
      const {data} = yield call(Ajax.get,'Sys/Func/GetAllFuncTree');
      yield put({type:'save',payload:{data:data.data}});
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/sys/func') {
          //dispatch({ type: 'getAllFunc', payload: query });
        }
      });
    },
  },
};
