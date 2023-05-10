import React, {useEffect, useState} from 'react';
import {laptopAPI} from "../services/LaptopService";
import {typesAPI} from "../services/TypesService";
import {types} from "../util/Constants";
import {hardwareAPI} from "../services/HardwareService";
import HardwareTypeAccordion from "../components/UI/accordion/HardwareTypeAccordion";
import StandartButton from "../components/UI/button/StandartButton";
import {IHardware, ILaptop} from "../models/ILaptop";
import {IPageable} from "../models/IPageable";
import LaptopItem from "../components/UI/laptop/LaptopItem";
import PaginationList from "../components/UI/pagination/PaginationList";
import {brandAPI} from "../services/BrandService";
import MySelect from "../components/UI/select/MySelect";
import {IOption} from "../models/form/IOption";
import SelectBrand from "../components/UI/select/SelectBrand";
import LaptopContainer from "../components/UI/laptop/LaptopContainer";

const sortList = [
    {
        value: "id",
        child: "по ID"
    },
    {
        value: "name",
        child: "по названию"
    },
    {
        value: "price",
        child: "по цене"
    },
    {
        value: "averageScore",
        child: "по оценке"
    },
    {
        value: "amount",
        child: "по количеству"
    },

]
const sortTypeList = [
    {
        value: "asc",
        child: "по возростанию"
    },
    {
        value: "desc",
        child: "по убыванию"
    },
]


const MainPage = () => {
    const [localLaptops, setLocalLaptops] = useState<ILaptop[]>();
    const {data: hardwareTypes} = typesAPI.useFetchTypesQuery(types.hardwareType);
    const {data: hardwareList} = hardwareAPI.useFetchAllHardwareQuery(null);
    const [checkedHardwareList, setCheckedHardwareList] = useState<string[]>([]);

    const [totalPage, setTotalPages] = useState(0);
    const [size, setSize] = useState(12);
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState("id");
    const [sortType, setSortType] = useState("asc");

    const {data: pageLaptop, isLoading: isLaptopsLoading, refetch} = laptopAPI.useFetchAllPaginationLaptopsQuery({
        page: page - 1,
        size: size,
        sort: [
            `${sort},${sortType}`
        ]
    } as IPageable);



    // useEffect(() => {
    //     refetch();
    //
    //     // console.log('refetching is causing');
    // }, [page, size])


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

    // useEffect(() => {
    //     // console.log(localLaptops);
    // }, [localLaptops])


    const selectHardware = (e: any) => {
        const checked = e.target.checked;
        const value = e.target.value;
        if(checked && hardwareList){
            for (let i = 0; i < checkedHardwareList.length; i++) {
                if(checkedHardwareList[i] === value){
                    return;
                }
            }
            setCheckedHardwareList([...checkedHardwareList, value])
        }else if(!checked && hardwareList){
            for (let i = 0; i < checkedHardwareList.length; i++) {
                if(checkedHardwareList[i] === value){
                    checkedHardwareList.splice(i, 1);
                }
            }
            setCheckedHardwareList(checkedHardwareList);
        }
    }
    
    const haveHardware = (laptop: ILaptop, name: string) => {

        for (let i = 0; i < laptop.hardwareList.length; i++) {
            if(laptop.hardwareList[i].name === name) {
                return true;
            }
        }
        return false;
    }

    const filterLaptops = () => {
        if(checkedHardwareList.length === 0) return;
        let newLaptops: ILaptop[] = [];
        if(pageLaptop){
            for (let i = 0; i < checkedHardwareList.length; i++) {
                for (let j = 0; j < pageLaptop.content.length; j++) {
                    if(haveHardware(pageLaptop.content[j], checkedHardwareList[i]) && !newLaptops.includes(pageLaptop.content[j])){
                        newLaptops = [...newLaptops, pageLaptop.content[j]];
                    }
                }
            }
        }
        setLocalLaptops(newLaptops);
    }

    const {data: categories} = typesAPI.useFetchTypesQuery(types.category);
    const {data: brands} = brandAPI.useFetchBrandsQuery(null);

    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState<IHardware>({hardwareType: "", id: 0, name: ""});


    const changeBrand = (e: any) => {
        // console.log(e);
        setBrand(e);
    }

    const changeCategory = (e: any) => {
        // console.log(e);
        setCategory(e);
    }

    const changeSort = (e: any) => {
        // console.log(e);
        setSort(e);
    }
    const changeSortType = (e: any) => {
        // console.log(e);
        setSortType(e);
    }











    return (
        <div className="px-3 mx-auto mt-20">
            <div className="flex">
                <div className="w-3/12">
                    <div className="flex flex-col space-y-2">

                        <div className="text-3xl pb-1 font-semibold">
                            Сортировать
                        </div>

                        {
                            <MySelect
                                label="По параметру ноутбука"
                                options={sortList}
                                onChange={changeSort}
                            />
                        }

                        {
                            <MySelect
                                label="По убыванию, По возростанию"
                                options={sortTypeList}
                                onChange={changeSortType}
                                // className="w-6/12"
                            />
                        }


                        <div className="text-3xl font-semibold">
                            Фильтрация
                        </div>

                        <div className="p-1 text-xl font-semibold">
                            По Категориям
                        </div>

                        {categories &&

                            <MySelect
                                label="Категория"
                                options={categories.map((c)=> {
                                    return {value: c, child: c} as IOption;
                                })}
                                onChange={changeCategory}
                                // className="w-6/12"
                            />
                        }
                        <div className="p-1 text-xl font-semibold">
                            По Бренду
                        </div>
                        {brands &&

                            <MySelect
                                label="Бренд"
                                options={brands.map((c)=> {
                                    return {value: c.id, child: c.name} as IOption;
                                })}
                                // variant="standard"
                                onChange={changeBrand}
                                // className="w-6/12"
                            />
                        }
                        <div className="p-1 text-xl font-semibold">
                            По Характеристикам
                        </div>
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



                </div>
                <div className="w-full p-3">
                    {pageLaptop &&
                        <LaptopContainer laptops={pageLaptop.content} />
                    }
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