"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { GrSquare } from "react-icons/gr";
import Loader from "./Loader";

interface Cake {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export default function CakeDetails({ id }: { id: string }) {
  const [cake, setCake] = useState<Cake | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    fetchCake();
  }, [id]);

  const fetchCake = async () => {
    try {
      const response = await fetch(`/api/cakes/${id}`);
      const data = await response.json();
      setCake(data);
    } catch (error) {
      console.error("Error fetching cake details:", error);
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLImageElement>) => {
    const { clientX, clientY } = event;
    setMousePosition({ x: clientX, y: clientY });
  };

  if (!cake) {
    return <div className="flex justify-center items-center h-screen"><Loader /></div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white  rounded-lg overflow-hidden md:flex md:items-center">
        <div className="md:w-1/2 relative">
          <Image
            src={cake.image}
            alt={cake.name}
            width={500}
            height={400}
            className="w-full h-auto object-cover transition-transform duration-300"
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleMouseMove}
          />
          {isZoomed && (
            <div
              className="absolute top-0 left-full ml-4 w-64 h-64 border border-gray-300 rounded-lg overflow-hidden shadow-lg bg-white z-10"
              style={{
                width: '250px', // Adjust width as needed
                height: '200px', // Adjust height as needed
                background: `url(${cake.image})`,
                backgroundSize: '250%', // Adjust zoom level
                backgroundPosition: `-${(mousePosition.x / 2)}px -${(mousePosition.y / 2)}px`, // Adjust based on mouse position
                pointerEvents: 'none', // Prevent mouse events on the zoomed div
              }}
            />
          )}
        </div>
        <div className="md:w-1/2 p-6">
          <h1 className="text-4xl font-bold mb-2">{cake.name}</h1>
          <div className="flex items-center text-green-600 mb-4">
            <GrSquare className="mr-1" />
            <span className="text-sm">EGGLESS</span>
          </div>
          <p className="text-gray-700 mb-4">{cake.description}</p>
          <p className="text-3xl font-bold text-primary mb-4">₹ {cake.price}</p>
          <p className="text-sm text-gray-500 mb-4">
            Category: <span className="font-semibold">{cake.category}</span>
          </p>
          <Button className="w-full mt-4">Add to Cart</Button>
        </div>
      </div>
    </div>
  );
}