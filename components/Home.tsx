import Image from 'next/image'

export default function Home() {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center">
      <Image
        src="/cakes/hero-image.jpeg"
        alt="Delicious cakes"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="absolute inset-0"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative z-10 text-center text-white space-y-6 animate-fadeIn">
        <h1 className="text-5xl md:text-7xl font-bold mb-4">Welcome to The Cake Shop</h1>
        <p className="text-xl md:text-2xl mb-8">Indulge in our heavenly cakes and pastries</p>
        <button className="btn-primary text-lg">
          Order Now
        </button>
      </div>
    </section>
  )
}

