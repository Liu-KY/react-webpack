import {goodCates} from '@/api/good'

export async function getGoodCates (){
    const cates = await goodCates()
    return {
        type:'GOOD_CHANGE_CATES',
        payload:cates.list
    }
}


export async function addGoodCates (list){

    return {
        type:'GOOD_ADD_CATES',
        payload:list
    }
}