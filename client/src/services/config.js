export const config = {
    serverUrl: 'http://localhost:4000',
}


export async function getToken() {
    const token = sessionStorage.getItem('token')
    if(token != null){
        return {token:true}
    }else {
        return {token:false}
    }
    
}