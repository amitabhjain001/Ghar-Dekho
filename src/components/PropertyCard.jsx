import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Square, Heart } from 'lucide-react';
import { useStore } from '../store/useStore';
import clsx from 'clsx';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const PropertyCard = ({ property }) => {
    const { toggleFavorite, favorites } = useStore();
    const isFavorite = favorites.includes(property.id);
    const cardRef = useRef();

    const { contextSafe } = useGSAP({ scope: cardRef });

    const onMouseEnter = contextSafe(() => {
        gsap.to(cardRef.current, { y: -10, scale: 1.02, duration: 0.3, ease: "power2.out" });
        gsap.to('.card-img', { scale: 1.1, duration: 0.5, ease: "power2.out" });
    });

    const onMouseLeave = contextSafe(() => {
        gsap.to(cardRef.current, { y: 0, scale: 1, duration: 0.3, ease: "power2.out" });
        gsap.to('.card-img', { scale: 1, duration: 0.5, ease: "power2.out" });
    });

    return (
        <div
            ref={cardRef}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className="group relative rounded-3xl overflow-hidden glass hover:shadow-2xl hover:shadow-primary/20 transition-shadow duration-300 cursor-pointer"
        >
            <Link to={`/property/${property.id}`} className="absolute inset-0 z-10" />

            <div className="relative h-64 overflow-hidden">
                <img
                    src={property.image}
                    alt={property.title}
                    className="card-img w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 z-20">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleFavorite(property.id);
                        }}
                        className="p-2 rounded-full glass hover:bg-white/20 transition-colors shadow-md"
                    >
                        <Heart
                            size={20}
                            className={clsx("transition-colors", isFavorite ? "fill-red-500 text-red-500" : "text-white")}
                        />
                    </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-2xl font-bold text-white">{property.price}</p>
                </div>
            </div>

            <div className="p-5">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors text-gray-800">{property.title}</h3>

                <div className="flex items-center text-gray-500 mb-4 text-sm font-medium">
                    <MapPin size={16} className="mr-1" />
                    {property.location}
                </div>

                <div className="flex items-center justify-between text-gray-600 text-sm border-t border-gray-200 pt-4 font-medium">
                    <div className="flex items-center gap-1">
                        <Bed size={16} className="text-primary" />
                        <span>{property.bedrooms} Beds</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Bath size={16} className="text-secondary" />
                        <span>{property.bathrooms} Baths</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Square size={16} className="text-accent" />
                        <span>{property.sqft} sqft</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;
