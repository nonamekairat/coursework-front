import React, {FC, useEffect, useState} from 'react';
import UploadAndDisplayImage from "../../components/image/UploadAndDisplayImage";
import {IInput} from "../../models/form/IInput";
import FormInput from "../../components/input/FormInput";
import MySelect from "../../components/select/MySelect";
import {typesAPI} from "../../services/TypesService";
import {types} from "../../util/Constants";
import {brandAPI} from "../../services/BrandService";
import {IOption} from "../../models/form/IOption";
import {hardwareAPI} from "../../services/HardwareService";
import SelectHardware from "../../components/select/SelectHardware";
import {ICreateLaptop, IHardware, ILaptop} from "../../models/ILaptop";
import SelectBrand from "../../components/select/SelectBrand";
import {Textarea} from "@material-tailwind/react";
import StandartButton from "../../components/button/StandartButton";
import {laptopAPI} from "../../services/LaptopService";
import {imageAPI} from "../../services/ImageService";
import {useNavigate, useParams} from "react-router-dom";
import NotFoundPage from "../NotFoundPage";
import MessagePage from "../MessagePage";


type ICreateLaptopValue = {
    [key: string]: string;
}

interface props {
    baseLaptop: ILaptop;
}

const UpdateLaptopPage:FC<props> = ({baseLaptop}) => {


    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);

    const [values, setValues] = useState({
        name: baseLaptop.name,
        price: baseLaptop.price,
        amount: baseLaptop.amount,
        discount: baseLaptop.discount,
    });

    const [errors, setErrors] = useState({
        name: "",
        price: "",
        amount: "",
        discount: "",
    } as ICreateLaptopValue );

    const {data: hardwareTypes} = typesAPI.useFetchTypesQuery(types.hardwareType);
    const {data: categories} = typesAPI.useFetchTypesQuery(types.category);
    const {data: guarantees} = typesAPI.useFetchTypesQuery(types.guarantee);
    const {data: brands} = brandAPI.useFetchBrandsQuery(null);
    const {data: hardwareList} = hardwareAPI.useFetchAllHardwareQuery(null);
    const [category, setCategory] = useState(baseLaptop.category);
    const [guarantee, setGuarantee] = useState(baseLaptop.guarantee);
    const [brand, setBrand] = useState({id: 1, name: baseLaptop.brand});
    const [description, setDescription] = useState(baseLaptop.description);
    const [hardware, setHardware] = useState<IHardware[]>(baseLaptop.hardwareList);
    useEffect(() => {
        if(brands){
            for (let i = 0; i < brands.length; i++) {
                if(brands[i].name === baseLaptop.brand){
                    setBrand(brands[i])
                }
            }
        }

    },[brands])

    const [updateLaptop] = laptopAPI.useUpdateLaptopMutation();
    const [uploadImage] = imageAPI.useSaveLaptopImageMutation();


    const changeHardware = (e: IHardware) => {
        //todo: если человек решит менять что-то, нужно заменить это а не добавлять новое
        console.log(e)
        let hardwareRemoving = [...hardware];
        for (let i = 0; i < hardwareRemoving.length; i++) {
            if(hardwareRemoving[i].hardwareType === e.hardwareType){
                hardwareRemoving.splice(i, 1);
            }
        }
        setHardware([...hardwareRemoving, e]);
        console.log(hardware)
    }

    const changeCategory = (e: any) => {
        setCategory(e);
    }

    const changeDescription = (e: any) => {
        setDescription(e.target.value);
    }

    const changeGuarantee = (e: any) => {
        setGuarantee(e);
    }

    const changeBrand = (e: any) => {
        setBrand(e);
        console.log(e);
    }

    const inputs:IInput[] = [
        {
            id: "name",
            name: "name",
            type: "text",
            label: "Наименование",
            value: values.name,
            required: true,
        },
        {
            id: "price",
            name: "price",
            type: "text",
            label: "Цена",
            value: values.price,
            required: true,
        },
        {
            id: "amount",
            name: "amount",
            type: "text",
            label: "Количество на складе",
            value: values.amount,
            required: true,
        },
        {
            id: "discount",
            name: "discount",
            type: "text",
            label: "Скидка",
            value: values.discount,
            required: false,
        }
    ]
    const onChange = (e:any) => {
        setValues({...values, [e.target.name]: e.target.value});
    }


    const updateImage = (e: any) => {
        setSelectedImage(e.target.files[0])
        // if(selectedImage){
        //     console.log(URL.createObjectURL(selectedImage))
        //     console.log(selectedImage)
        // }

    }

    const createLaptop = async (e: any) => {
        e.preventDefault();

        const newLaptop: ICreateLaptop = {
            amount: values.amount,
            brandId: brand.id,
            category: category,
            description: description,
            discount: values.discount,
            guarantee: guarantee,
            hardwareIds: hardware.map(hardware => hardware.id),
            price: values.price,
            name: values.name
        }

        updateLaptop({laptop: newLaptop, id: baseLaptop.id})
            // .then((createdLaptop: ILaptop) => {
            //     let data = new FormData();
            //     if(selectedImage){
            //         data.append('file', selectedImage);
            //         uploadImage({id: createdLaptop.id, data: data});
            //     }
            //
            // }); // todo: catch with errors, later
        navigate(`/laptops/${baseLaptop.id}`);
    }

    return (
        <div className="container mx-auto mt-20 flex">

            <div className="w-3/12 py-3 pt-36 px-6">
                {/*<UploadAndDisplayImage selectedImage={selectedImage} onChange={updateImage}/>*/}
            </div>

            <div className="p-3 w-full">
                <>
                    <div className="flex">
                        <div className="w-full mr-3">
                            {
                                inputs.map((input) => (
                                    <FormInput
                                        className="mt-3"
                                        key={input.id}
                                        inputProps={input}
                                        errorMessage={errors[input.name]}
                                        onChange={onChange}

                                    />
                                ))
                            }
                        </div>
                        <div className="w-full">
                            {categories &&

                                <MySelect
                                    label="Категория"
                                    options={categories.map((c)=> {
                                        return {value: c, child: c} as IOption;
                                    })}
                                    onChange={changeCategory}
                                    defaultValue={{value: category, child: category}}
                                    // className="w-6/12"
                                />
                            }
                            {guarantees &&
                                <MySelect
                                    label="Гарантия"
                                    options={guarantees.map((g)=> {
                                        return {value: g, child: g} as IOption;
                                    })}
                                    onChange={changeGuarantee}
                                    defaultValue={{value: guarantee, child: guarantee}}
                                    // className="w-6/12"
                                />
                            }

                        </div>
                    </div>


                    {
                        <SelectBrand defaultValue={brand} brands={brands} changeBrand={changeBrand}/>
                    }


                    {hardwareTypes &&
                        hardwareTypes.map((hardwareType) => {
                            let defaultValue;
                            for (let i = 0; i < hardware.length; i++) {
                                if(hardware[i].hardwareType === hardwareType){
                                    defaultValue = hardware[i];
                                }
                            }
                                return <SelectHardware
                                    key={hardwareType}
                                    hardwareType={hardwareType}
                                    hardwareList={hardwareList}
                                    changeHardware={changeHardware}
                                    defaultValue={defaultValue}

                                />
                            }
                        )
                    }

                    <div className="w-96 mt-3">
                        <Textarea size="lg" value={description} onChange={changeDescription} label="Описание" />
                    </div>


                    <StandartButton className="mt-3" onClick={createLaptop}>обновить ноутбук</StandartButton>
                </>






            </div>

        </div>
    );
};

export default UpdateLaptopPage;
