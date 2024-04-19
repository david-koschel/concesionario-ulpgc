export interface VehicleConfigurationList {
    [key: string]: string | string[] | Object;
    engine: {
        name: string,
        price: number
    },
    color: {
        name: string,
        price: number
    },
    rim: {
        name: string,
        price: number
    },
    upholstery: {
        name: string,
        price: number
    },
    extras:{
        name: string,
        price: number
    }[],
    totalPrice:number,
}
