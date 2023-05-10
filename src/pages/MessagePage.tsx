import React, {FC} from 'react';

interface MessagePageProps {
    message?: string;
}

const MessagePage:FC<MessagePageProps> = ({message}) => {
    if(message)
    return (
        <div>
            <div className="p-4 mx-auto mt-20 text-3xl mb-5 text-center bg-blue-100 w-8/12 rounded-lg">
                {message}
            </div>
        </div>
    );

    return (
        <div>
            <div className="p-4 mx-auto mt-20 text-3xl mb-5 text-center bg-gray-300 w-6/12">
                Данной страницы не существует
            </div>
        </div>

    );
};

export default MessagePage;