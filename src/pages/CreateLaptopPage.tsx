import React, {useEffect, useState} from 'react';
import UploadAndDisplayImage from "../components/UI/image/UploadAndDisplayImage";
import {IInput} from "../models/form/IInput";
import FormInput from "../components/UI/input/FormInput";
import MySelect from "../components/UI/select/MySelect";
import {typesAPI} from "../services/TypesService";
import {types} from "../util/Constants";
import {brandAPI} from "../services/BrandService";
import {IOption} from "../models/form/IOption";
import {hardwareAPI} from "../services/HardwareService";
import SelectHardware from "../components/UI/select/SelectHardware";
import {ICreateLaptop, IHardware, ILaptop} from "../models/ILaptop";
import SelectBrand from "../components/UI/select/SelectBrand";
import {Textarea} from "@material-tailwind/react";
import StandartButton from "../components/UI/button/StandartButton";
import {laptopAPI} from "../services/LaptopService";
import {imageAPI} from "../services/ImageService";
import {useNavigate} from "react-router-dom";


type ICreateLaptopValue = {
    [key: string]: string;
}


const CreateLaptopPage = () => {
    const [isCreating, setIsCreating] = useState(true);


    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);



    const [values, setValues] = useState({
        name: "",
        price: 0,
        amount: 0,
        discount: 0,
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
    const [category, setCategory] = useState("");
    const [guarantee, setGuarantee] = useState(0);
    const [brand, setBrand] = useState<IHardware>({hardwareType: "", id: 0, name: ""});
    const [description, setDescription] = useState("");
    const [hardware, setHardware] = useState<IHardware[]>([]);


    const [createNewLaptop] = laptopAPI.useCreateLaptopMutation();
    const [uploadImage] = imageAPI.useSaveLaptopImageMutation();


    const changeHardware = (e: IHardware) => {
        // console.log(e.id);
        // const newHardwareList = [];
        //todo: если человек решит менять что-то, нужно заменить это а не добавлять новое
        for (let i = 0; i < hardware.length; i++) {
            if(hardware[i].hardwareType === e.hardwareType){
                hardware.splice(i, 1);
            }
        }
        setHardware([...hardware, e]);
    }

    const changeCategory = (e: any) => {
        // console.log(e);
        setCategory(e);
    }

    const changeDescription = (e: any) => {
        // console.log(e.target.value);
        setDescription(e.target.value);
    }

    const changeGuarantee = (e: any) => {
        // console.log(e);
        setGuarantee(e);
    }

    const changeBrand = (e: any) => {
        // console.log(e);
        setBrand(e);
    }

    const inputs:IInput[] = [
        {
            id: "name",
            name: "name",
            type: "text",
            label: "Наименование",
            required: true,
        },
        {
            id: "price",
            name: "price",
            type: "text",
            label: "Цена",
            required: true,
        },
        {
            id: "amount",
            name: "amount",
            type: "text",
            label: "Количество на складе",
            required: true,
        },
        {
            id: "discount",
            name: "discount",
            type: "text",
            label: "Скидка",
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
        await createNewLaptop(newLaptop).unwrap()
            .then((createdLaptop: ILaptop) => {
                let data = new FormData();
                if(selectedImage){
                    data.append('file', selectedImage);
                    uploadImage({id: createdLaptop.id, data: data});
                }

            }); // todo: catch with errors, later
        navigate("/");
    }

    return (
        <div className="container mx-auto mt-20 flex">

            <div className="w-3/12 py-3 pt-36 px-6">
                <UploadAndDisplayImage selectedImage={selectedImage} onChange={updateImage}/>
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
                                // className="w-6/12"
                            />
                        }

                    </div>
                </div>


                {
                    <SelectBrand brands={brands} changeBrand={changeBrand}/>
                }


                {hardwareTypes &&
                    hardwareTypes.map((hardwareType) => {
                            return <SelectHardware
                                key={hardwareType}
                                hardwareType={hardwareType}
                                hardwareList={hardwareList}
                                changeHardware={changeHardware} />
                        }
                    )
                }

                <div className="w-96 mt-3">
                    <Textarea size="lg" value={description} onChange={changeDescription} label="Описание" />
                </div>


                <StandartButton className="mt-3" onClick={createLaptop}>создать ноутбук</StandartButton>
            </>






            </div>

        </div>
    );
};

export default CreateLaptopPage;