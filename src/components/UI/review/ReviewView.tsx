import React, {FC} from 'react';
import {IReview} from "../../../models/ILaptop";
import {Rating} from "react-simple-star-rating";
import avatar from "../../../assets/avatar.png";


interface ReviewViewProps {
    review: IReview;
}

const ReviewView:FC<ReviewViewProps> = ({review}) => {

    const user = review.userDto;

    const reviewDate = () => {
        const dt = new Date(review.updatedAt)
        const date = new Date();
        date.setMonth(dt.getMonth() - 1);
        const month = date.toLocaleString('ru', { month: 'long' });
        const day = dt.getDate();
        const year = dt.getFullYear();
        return `${month}  ${day}, ${year}`;
    }
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
                    iconsCount={review.score}
                    emptyColor="#f1a545"
                />
            </div>
            <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400">
                <p><time dateTime="2017-03-03 19:00">{reviewDate()}</time></p>
            </footer>
            <p className="mb-2 text-gray-800 dark:text-gray-700">{review.text}</p>

            <a href="#" className="block mb-5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Read
                more</a>
        </article>
    );
};

export default ReviewView;