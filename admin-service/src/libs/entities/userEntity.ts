export interface userData{
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
    alt_number: string,
    password: string,
    isBlocked: boolean,
    isPremium: boolean,
    current_location: string | null
}

export class userProfile{
    first_name: string
    last_name: string
    email: string
    phone: string
    alt_number: string
    password: string
    isBlocked: boolean
    isPremium: boolean
    current_location: string | null

    constructor({first_name,last_name,email,phone,alt_number,password,isBlocked,isPremium,current_location}:userData){
        this.first_name = first_name,
        this.last_name = last_name,
        this.email = email,
        this.phone = phone,
        this.password = password,
        this.alt_number = alt_number,
        this.isBlocked = isBlocked,
        this.isPremium = isPremium,
        this.current_location = current_location
    }
}
