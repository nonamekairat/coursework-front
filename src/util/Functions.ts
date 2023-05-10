import {ILaptop} from "../models/ILaptop";

export const hardwareTypeList = [
    'процессор',
    'диагональ',
    'операционная система',
    'объем оперативной памяти',
    'тип жесткого диска',
    'объем накопителя',
    'базовая частота процессора',
    'количество ядер',
    'видеокарта',
    'разрешение'
]
export const convertDate = (convertDate: Date) => {
    const dt = new Date(convertDate)
    const date = new Date();
    date.setMonth(dt.getMonth() - 1);
    const month = date.toLocaleString('ru', { month: 'long' });
    const day = dt.getDate();
    const year = dt.getFullYear();
    return `${month}  ${day}, ${year}`;
}


const getModel = (laptop: ILaptop) => {
    let model:string = "";

    for (let i = 0; i < hardwareTypeList.length; i++) {
        for (let j = 0; j < laptop.hardwareList.length; j++) {
            if(hardwareTypeList[i] === laptop.hardwareList[j].hardwareType){
                model += laptop.hardwareList[j].name + " ";
            }
        }
    }
    model.substring(0, model.length - 1);
    return model;
}



export {getModel};


