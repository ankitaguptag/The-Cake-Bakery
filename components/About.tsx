import Image from 'next/image'

export default function About() {
  return (
    <section id="about" className="py-16 bg-[#FFD1D1]">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Our Story</h2>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <Image
              src="/cakes/bakery-image.jpeg"
              alt="Our bakery"
              width={500}
              height={300}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2 space-y-4">
            <p className="text-lg">
              Founded in 2010, Sweet Delights has been serving delicious cakes and pastries to our community for over a decade. Our passion for baking and commitment to quality ingredients sets us apart.
            </p>
            <p className="text-lg">
              Our founder, Jane Doe, learned the art of baking from her grandmother and has been perfecting her craft ever since. We believe in creating not just desserts, but memorable experiences for our customers.
            </p>
            <button className="btn-primary mt-4">Learn More</button>
          </div>
        </div>
      </div>
    </section>
  )
}

