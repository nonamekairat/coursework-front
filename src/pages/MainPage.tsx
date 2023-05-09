import React, {useEffect, useRef, useState} from 'react';
import {useAppSelector} from "../hooks/redux";
import {laptopAPI} from "../services/LaptopService";
import {Card, CardBody, CardFooter, CardHeader, Typography} from "@material-tailwind/react";
import imageNotFound from "../assets/image-not-found.png";
import {typesAPI} from "../services/TypesService";
import {types} from "../util/Constants";
import Example from "../components/UI/accordion/Example";
import {hardwareAPI} from "../services/HardwareService";
import HardwareTypeAccordion from "../components/UI/accordion/HardwareTypeAccordion";
import StandartButton from "../components/UI/button/StandartButton";
import {IHardware, ILaptop} from "../models/ILaptop";
import {useObserver} from "../hooks/useObserver";
import {IPageable} from "../models/IPageable";
import LaptopItem from "../components/UI/laptop/LaptopItem";
import PaginationList from "../components/UI/pagination/PaginationList";


const MainPage = () => {
    const {accessToken} = useAppSelector(state => state.tokenReducer);
    // const {data: laptops, isLoading: isLaptopsLoading} = laptopAPI.useFetchAllLaptopsQuery(null); //todo: add pagination
    const [localLaptops, setLocalLaptops] = useState<ILaptop[]>();
    const {data: hardwareTypes} = typesAPI.useFetchTypesQuery(types.hardwareType);
    const {data: hardwareList} = hardwareAPI.useFetchAllHardwareQuery(null);
    const [checkedHardwareList, setCheckedHardwareList] = useState<string[]>([]);

    const [totalPage, setTotalPages] = useState(0);
    const [size, setSize] = useState(12);
    const [page, setPage] = useState(1);

    const {data: pageLaptop, isLoading: isLaptopsLoading, refetch} = laptopAPI.useFetchAllPaginationLaptopsQuery({
        page: page - 1,
        size: size,
        sort: [
            "id,asc"
        ]
    } as IPageable);


    useEffect(() => {
        refetch();

        // console.log('refetching is causing');
    }, [page, size])


    useEffect(() => {
        // console.log("fetching is causing");

        if(pageLaptop && pageLaptop.content) {
            setTotalPages(pageLaptop.totalPages);
            setLocalLaptops(pageLaptop.content);
        }
        if(checkedHardwareList.length !== 0){
            filterLaptops();
        }
        // console.log(pageLaptop?.content)
    }, [pageLaptop])

    useEffect(() => {
        // console.log(localLaptops);
    }, [localLaptops])


    const selectHardware = (e: any) => {
        // console.log(e.target.value)
        // console.log(e.target.checked)
        const checked = e.target.checked;
        const value = e.target.value;
        if(checked && hardwareList){
            for (let i = 0; i < checkedHardwareList.length; i++) {
                if(checkedHardwareList[i] === value){
                    return;
                }
            }
            setCheckedHardwareList([...checkedHardwareList, value])
            // console.log([...checkedHardwareList, value])
        }else if(!checked && hardwareList){
            for (let i = 0; i < checkedHardwareList.length; i++) {
                if(checkedHardwareList[i] === value){
                    checkedHardwareList.splice(i, 1);
                }
            }
            // console.log(checkedHardwareList);
            setCheckedHardwareList(checkedHardwareList);
        }
    }
    
    const haveHardware = (laptop: ILaptop, name: string) => {

        for (let i = 0; i < laptop.hardwareList.length; i++) {
            // // console.log('cycle started')
            // if(laptop.hardwareList[i].hardwareType === 'процессор'){
            //     console.log(laptop.hardwareList[i].name);
            // }

            if(laptop.hardwareList[i].name === name) {
                // console.log("returned true")
                return true;
            }
            // console.log('cycle ended')
        }
        // console.log('returned false')
        return false;
        // return laptop.hardwareList.filter(hardware => name === hardware.name).length != 0;
    }

    const filterLaptops = () => {
        if(checkedHardwareList.length === 0) return;
        let newLaptops: ILaptop[] = [];
        // if(!checkedHardwareList) setLocalLaptops(laptops);
        if(pageLaptop){
            for (let i = 0; i < checkedHardwareList.length; i++) {
                for (let j = 0; j < pageLaptop.content.length; j++) {
                    console.log(haveHardware(pageLaptop.content[j], checkedHardwareList[i]))
                    if(haveHardware(pageLaptop.content[j], checkedHardwareList[i]) && !newLaptops.includes(pageLaptop.content[j])){
                        newLaptops = [...newLaptops, pageLaptop.content[j]];
                    }
                }
            }
        }
        // console.log(newLaptops);
        setLocalLaptops(newLaptops);
    }

    return (
        <div className="px-3 mx-auto mt-20">
            <div className="flex">
                <div className="w-3/12">

                    {hardwareTypes &&
                        hardwareTypes.map(hardwareType =>
                            <HardwareTypeAccordion

                                key={hardwareType}
                                hardwareType={hardwareType}
                                hardwareList={hardwareList &&
                                hardwareList.filter(hardware => hardware.hardwareType === hardwareType)}
                                selectHardware={selectHardware}
                            />)
                    }
                    <StandartButton onClick={filterLaptops}>показать</StandartButton>


                </div>
                <div className="w-full p-3">
                    <div className="grid grid-cols-3 gap-2 gap-y-5">
                        {pageLaptop &&
                            pageLaptop.content.map(laptop => <LaptopItem key={laptop.id} laptop={laptop}/>)
                        }
                    </div>
                    <div className="mt-6">
                        <PaginationList total={totalPage} active={page} setActive={setPage} />
                    </div>
                    {/*<div ref={lastElement} style={{height:20, background: 'red'}}/>*/}
                </div>
            </div>



        </div>
    );
};

export default MainPage;