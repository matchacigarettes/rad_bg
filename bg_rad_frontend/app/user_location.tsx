export class UserLocation{
    private constructor(){
        console.log('This class is non-instantiable.')
    }

    private static ipApiUrl = 'https://api.ipify.org/?format=json'

    static fetchUserIp = async () =>{
        try{
            const resp = await fetch(this.ipApiUrl);
            
            if(!resp.ok){
                throw new Error(`Response status: ${resp.status}`)
            }

            const data = await resp.json();
            return data.ip;

        } catch(error){
            console.log("API Fetch error has occured.");
        }
    }
}