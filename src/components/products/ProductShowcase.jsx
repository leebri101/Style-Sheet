import { useState } from "react";
import { ShoppingCart, Heart } from "lucide-react";

const ProductShowcase = ({
    title,
    price,
    decsription,
    imageUrl,
    isLimitedOffer = false,
    offerEndDate,
}) => {
    const [selectedSize, setSelectedSize]= useState('')

    return(
        <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-x-8 gap-y-8 lg:grid-cols-2">
                <div className="relative">
                    {isLimitedOffer && (
                        <div className="absolute left-4 top-4 z-10">
                            <span className="inline-flex items-center rounded-md bg-red-500 px-2 py-1 text-xs font-medium text-white">
                                LIMITED OFFER
                            </span>
                        </div>
                    )}
                    <img
                    src={imageUrl}
                    alt={title}
                    className="w-full object-cover object-center" />
                </div>
                <div className="flex flex-col justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{title}</h1>
                        <div className="">
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}