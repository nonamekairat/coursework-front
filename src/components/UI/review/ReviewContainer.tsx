import React, {FC, useEffect, useState} from 'react';
import {laptopAPI} from "../../../services/LaptopService";
import ReviewView from "./ReviewView";
import {userAPI} from "../../../services/UserService";
import PostReview from "./PostReview";
import AuthorizedComponent from "../../AuthorizedComponent";
import {reviewAPI} from "../../../services/ReviewService";

interface ReviewContainerProps {
    laptopId: number;
}

const ReviewContainer:FC<ReviewContainerProps> = ({laptopId}) => {

    const {data: reviews} = reviewAPI.useFetchLaptopReviewsQuery(laptopId);
    const {data: userinfo} = userAPI.useFetchUserQuery(null);
    const [hasReview, setHasReview] = useState(false);

    const [text, setText] = useState("");
    const [score, setScore] = useState(1);
    const [reviewId, setReviewId] = useState(0);


    useEffect(() => {

        if(reviews && userinfo){
            for (let i = 0; i < reviews.length; i++) {
                if(reviews[i].userDto.username === userinfo.username){
                    setScore(reviews[i].score);
                    setText(reviews[i].text);
                    setReviewId(reviews[i].id);
                    setHasReview(true);
                }
            }
        }

    }, [reviews, userinfo])


    return (
        <div>
            <div className="flex">
                <div className="mt-3 w-4/12">
                    <AuthorizedComponent>
                        <div className="me-10">
                            {<PostReview
                                setText={setText}
                                setScore={setScore}
                                score={score}
                                laptopId={laptopId}
                                hasReview={hasReview}
                                setHasReview={setHasReview}
                                id={reviewId}
                                text={text}
                            />}
                        </div>
                    </AuthorizedComponent>
                </div>

                <div className="ms-20 w-6/12">
                    <div className="text-4xl mb-5">
                        Рецензии на этот ноутбук:
                    </div>
                    {(reviews && reviews.length !== 0) ?
                        reviews.map((review) =>
                            <div className="mb-8">
                                <ReviewView key={review.id} review={review}/>
                            </div>

                        ) : <div className="text-xl">На этот ноутбук еще нету рецензий. Будьте первым кто оставит свой комментарий!</div>
                    }
                </div>

            </div>
        </div>

    );
};

const ChangeReview = () => {

}

export default ReviewContainer;