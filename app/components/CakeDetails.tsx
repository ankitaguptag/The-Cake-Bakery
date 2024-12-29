"use client";

import { useState, useEffect } from "react";
import ImageMagnifier from "@/components/common/ImageMagnifier";
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
}

// Helper function to convert YouTube URL to embed format
const convertToEmbedUrl = (url: string) => {
  try {
    if (url.includes("/shorts/")) {
      return url.replace("/shorts/", "/embed/") + "?rel=0";
    }
    if (url.includes("https://youtu.be/")) {
      return url.replace("/youtu.be/", "/youtube.com/embed/") + "?rel=0";
    }
    const videoIdMatch = url.match(
      /(?:v=|\/|shorts\/|youtu\.be\/|embed\/)([a-zA-Z0-9_-]+)/,
    );
    if (videoIdMatch) {
      return `https://www.youtube.com/embed/${videoIdMatch[1]}?rel=0`;
    }
  } catch (error) {
    console.error("Error processing YouTube URL:", error);
  }
  return null; // Return null if the URL is not valid
};

export default function CakeDetails({ id }: { id: string }) {
  const [cake, setCake] = useState<Cake | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [select, setSelect] = useState<number>(0);

  useEffect(() => {
    const fetchCake = async () => {
      try {
        const response = await fetch(`/api/cakes/${id}`);
        const data = await response.json();
        // const data: Cake = {
        //   id: "67711bea6acade1aa061455b",
        //   name: "Black Velvet",
        //   description: "A delicious black velvet cake.",
        //   price: 57,
        //   image: [
        //     "https://res.cloudinary.com/dzabikj6s/image/upload/v1735227106/The-cake-shop/9288b9fa-1cf1-40cb-ae92-0b392238483d_ofgb37.jpg",
        //     "https://res.cloudinary.com/dzabikj6s/image/upload/v1735228115/The-cake-shop/d1d2924e-2abf-440e-be3e-bf49099ff68f_itcncr.jpg",
        //     "https://res.cloudinary.com/dzabikj6s/image/upload/v1735228696/The-cake-shop/78f2b9f6-4287-4a77-82fe-62edaa3f6fde_htwnjt.jpg",
        //     "https://youtube.com/shorts/FtnOaJTOuqc?si=YaJWT3A0tWNn113N",
        //     "https://youtu.be/CWdsqvg0wCw?si=AHUrMIAfCiDCDNL2",
        //   ],
        //   category: "Fruit Cakes",
        // };
        setCake(data);
      } catch (error) {
        console.error("Error fetching cake details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCake();
  }, [id]);

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (!cake) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-600">Cake details not found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="w-full py-5">
        <div className="flex flex-wrap justify-between">
          {/* Image or Video Section */}
          <div className="w-full sm:w-1/2 p-5">
            <div className="w-full h-[500px] border border-qgray-border flex justify-center items-center overflow-hidden relative mb-3">
              {cake.image[select].includes("youtube.com") ||
              cake.image[select].includes("youtu.be") ? (
                convertToEmbedUrl(cake.image[select]) ? (
                  <iframe
                    width="600"
                    height="400"
                    src={convertToEmbedUrl(cake.image[select])!}
                    title={cake.name}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <p className="text-red-500">
                    Video cannot be played. Invalid or restricted URL.
                  </p>
                )
              ) : (
                <ImageMagnifier
                  src={cake.image[select]}
                  width={600}
                  height={400}
                  magnifierHeight={150}
                  magnifierWidth={150}
                  zoomLevel={2}
                  alt={cake.name}
                />
              )}
            </div>
            {/* Thumbnail Selector */}
            <div className="flex gap-2 flex-wrap">
              {cake.image.map((i, index) => {
                const isYouTubeVideo =
                  i.includes("youtube.com") || i.includes("youtu.be");
                const videoIdMatch = i.match(
                  /(?:v=|\/|shorts\/|youtu\.be\/|embed\/)([a-zA-Z0-9_-]+)/,
                );
                const videoThumbnailUrl =
                  isYouTubeVideo && videoIdMatch
                    ? `https://img.youtube.com/vi/${videoIdMatch[1]}/0.jpg`
                    : i; // If it's a video, get the thumbnail; otherwise, use the image URL

                return (
                  <div
                    key={index}
                    className={`${
                      select === index ? "border" : ""
                    } w-[110px] h-[110px] p-[15px] border border-qgray-border cursor-pointer`}
                    onClick={() => setSelect(index)}
                  >
                    <img
                      src={videoThumbnailUrl}
                      alt={`Cake ${index}`}
                      className={`w-full h-full object-contain ${
                        select === index ? "" : "opacity-50"
                      }`}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Details Section */}
          <div className="w-full sm:w-1/2 p-5">
            <div className="md:w-1/2 p-6">
              <h1 className="text-4xl font-bold mb-2">{cake.name}</h1>
              <div className="flex items-center text-green-600 mb-4">
                <GrSquare className="mr-1" />
                <span className="text-sm font-medium">EGGLESS</span>
              </div>
              <p className="text-gray-700 mb-4">{cake.description}</p>
              <p className="text-3xl font-bold text-primary mb-4">
                ₹ {cake.price}
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Category: <span className="font-semibold">{cake.category}</span>
              </p>
              <Button className="w-full mt-4">Add to Cart</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
