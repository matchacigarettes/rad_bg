export class UserIp{
    private constructor(){
        console.log('This class is non-instantiable.')
    }

    private static ipApiUrl = 'https://api.ipify.org/?format=json'

    static fetchUserIp = async () =>{
        try{
            const resp = await fetch(this.ipApiUrl) ?? {ok: false};
            if(!resp || !resp.ok){
                return "0";
            }

            const data = await resp.json() ?? {ip: ""};
            if(!data || !data.ip){
                return "0";
            }else{
                return data.ip;
            }

        } catch(error){
            console.log(error);
        }
    }
}