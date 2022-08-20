import immer from 'immer'

const defaultStore ={
    goodlist:[],
    goodid:1111
}

export default (store=defaultStore,actions)=>{
    return store
}
