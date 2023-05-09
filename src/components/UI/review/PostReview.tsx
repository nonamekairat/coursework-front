import React, {FC, useState} from 'react';
import {IReviewRequest} from "../../../models/ILaptop";
import {Rating} from "react-simple-star-rating";
import '../../../App.css';
import {Textarea} from "@material-tailwind/react";
import StandartButton from "../button/StandartButton";
import {reviewAPI} from "../../../services/ReviewService";

interface PostReview {
    id: number;
    laptopId: number;
    hasReview: boolean;
    score: number;
    text: string;
    setText: (e: any) => void;
    setScore: (e: any) => void;
    // changeHasReview: (e: any) => void;
    setHasReview: (has: boolean) => void;

}

const PostReview:FC<PostReview> = ({
                                       id,
                                       laptopId,
                                       hasReview,
                                       score,
                                       text,
                                       setText,
                                       setScore, setHasReview}) => {

    const [post, {}] = reviewAPI.usePostReviewMutation();
    const [update, {}] = reviewAPI.useUpdateReviewMutation();
    const [deleteReview, {}] = reviewAPI.useDeleteReviewMutation();
    const [changing, setChanging] = useState(false);

    const postReviewHandle = (e: any) => {
        post({
            score: score,
            text: text,
            laptopId: laptopId
        } as IReviewRequest)
    }

    const handleRating = (score: number) => {
        setScore(score)
    }
    const changeDescription = (e: any) => {
        setText(e.target.value);
    }


    const deleteReviewHandle = (e: any) => {
        deleteReview(id);
        setHasReview(false);
        setChanging(false);
        setScore(1);
        setText("");
    }
    const changeReviewHandle = (e: any) => {

        update({review:{
            score: score,
                text: text,
                laptopId: laptopId
        } as IReviewRequest, id: id})
        setHasReview(true);
    }


    return (
        <div className="">

            <div className="">
                Поделитесь своими мыслями с другими покупателями
            </div>
            <div className="w-100 mt-3">
                <Textarea
                    size="lg"
                    readOnly={hasReview}
                    value={text} className=""
                    onChange={changeDescription} label="Ваша рецензия"
                />
            </div>
            <div className="flex space-x-20 mt-1"> {/* //todo: handling 3 - 100 symbols*/}

                {hasReview ?
                    <div className="flex space-x-1">
                        <StandartButton onClick={deleteReviewHandle}>удалить</StandartButton>
                        <StandartButton onClick={() => {
                            setChanging(true);
                            setHasReview(false);
                        }}>изменить</StandartButton>
                    </div>
                    : changing ? <StandartButton onClick={changeReviewHandle}>изменить</StandartButton> :
                    <StandartButton onClick={postReviewHandle}>
                        опубликовать
                    </StandartButton>
                }
                    <Rating
                    onClick={handleRating}
                    size={35}
                    initialValue={score}
                    readonly={hasReview}
                    />
            </div>


        </div>

    )
};

export default PostReview;