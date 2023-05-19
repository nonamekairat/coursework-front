import React, {FC} from 'react';
import {IReview} from "../../models/ILaptop";
import {Rating} from "react-simple-star-rating";
import avatar from "../../assets/avatar.png";
import {convertDate} from "../../util/Functions";


interface ReviewViewProps {
    review: IReview;
}

const ReviewView:FC<ReviewViewProps> = ({review}) => {

    const user = review.userDto;

    const getName = () => {
        if(user.firstName && user.lastName){
            return `${user.firstName} ${user.lastName}`
        }else {
            return `${user.email}`;
        }
    }


    return (
        <article>
            <div className="flex items-center mb-3 space-x-4">
                <img className="w-10 h-10 rounded-full" src={user.imageUrl ? user.imageUrl : avatar} alt="" />
                    <div className="space-y-1 font-medium dark:text-white">
                        <p>{getName()}</p>
                    </div>
            </div>
            <div className=" mb-1">
                <Rating
                    size={25}
                    readonly
                    iconsCount={5}
                    initialValue={review.score}
                />
            </div>
            <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400">
                <p><time dateTime="2017-03-03 19:00">{convertDate(review.updatedAt)}</time></p>
            </footer>
            <p className="mb-2 text-gray-800 dark:text-gray-700">{review.text}</p>

            <a href="src/components/review#" className="block mb-5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Read
                more</a>
        </article>
    );
};

export default ReviewView;