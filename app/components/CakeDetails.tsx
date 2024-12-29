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
  image: string[];
  category: string;
  video?: string;
}

export default function CakeDetails({ id }: { id: string }) {
  const [cake, setCake] = useState<Cake | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);

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

  const handleMediaSelect = (index: number) => {
    setSelectedMediaIndex(index);
  };

  // Function to extract YouTube video ID from URL
  const getYouTubeVideoID = (url: string) => {
    const youtubeRegExp = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(youtubeRegExp);
    return match ? match[1] : null;
  };

  // Get YouTube thumbnail URL
  const getYouTubeThumbnail = (videoUrl: string) => {
    const videoId = getYouTubeVideoID(videoUrl);
    return videoId ? `https://img.youtube.com/vi/${videoId}/0.jpg` : "";
  };

  // Function to get a default thumbnail when the cake's image list is empty
  const getDefaultThumbnail = () => {
    return "/youtube.jpg";
  };
  

  if (!cake) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  const zoomSquareSize = 100; // Size of the zoom square
  const imageWidth = 500; // Width of the image
  const imageHeight = 400; // Height of the image

  const mediaList = [...(cake.image.length ? cake.image : [getDefaultThumbnail()])];
  if (cake.video) mediaList.push(cake.video);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg overflow-hidden md:flex md:items-center">
        {/* Side Thumbnails */}
        <div className="md:w-1/6 flex flex-col space-y-4">
          {mediaList.map((media, index) => (
            <div
              key={index}
              className={`cursor-pointer border ${
                selectedMediaIndex === index ? "border-primary" : "border-gray-300"
              } rounded-lg overflow-hidden`}
              onClick={() => handleMediaSelect(index)}
            >
              {media.includes("youtube.com") ? (
                <Image
                  src={getYouTubeThumbnail(media)} // Show the YouTube thumbnail
                  alt={`YouTube Thumbnail ${index + 1}`}
                  width={100}
                  height={100}
                  className="w-full h-16 object-cover"
                />
              ) : (
                <Image
                  src={media}
                  alt={`Thumbnail ${index + 1}`}
                  width={100}
                  height={100}
                  className="w-full h-16 object-cover"
                />
              )}
            </div>
          ))}
        </div>

        {/* Main Media Viewer */}
        <div className="md:w-1/2 relative">
          {mediaList[selectedMediaIndex].includes("youtube.com") ? (
            <iframe
              src={mediaList[selectedMediaIndex].replace(
                "youtube.com/shorts/",
                "youtube.com/embed/"
              )}
              className="w-full h-auto rounded-lg"
              allowFullScreen
            />
          ) : (
            <Image
              src={mediaList[selectedMediaIndex]}
              alt={cake.name}
              width={imageWidth}
              height={imageHeight}
              className="w-full h-auto object-cover transition-transform duration-300"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
            />
          )}
          {isZoomed &&
            !mediaList[selectedMediaIndex].includes("youtube.com") && (
              <>
                <div
                  className="absolute border border-gray-300 rounded-lg"
                  style={{
                    width: `${zoomSquareSize}px`,
                    height: `${zoomSquareSize}px`,
                    left: mousePosition.x - zoomSquareSize / 2,
                    top: mousePosition.y - zoomSquareSize / 2,
                    pointerEvents: "none",
                  }}
                />
                <div
                  className="absolute top-0 left-full ml-4 w-64 h-64 border border-gray-300 rounded-lg overflow-hidden shadow-lg bg-white z-10"
                  style={{
                    width: "250px",
                    height: "200px",
                    background: `url(${mediaList[selectedMediaIndex]})`,
                    backgroundSize: "250%",
                    backgroundPosition: `-${mousePosition.x / 2}px -${
                      mousePosition.y / 2
                    }px`,
                    pointerEvents: "none",
                  }}
                />
              </>
            )}
        </div>

        {/* Cake Details */}
        <div className="md:w-1/3 p-6">
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
