export default function Location() {
  return (
    <section id="location" className="py-16 bg-[#FFD1D1]">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Visit Us</h2>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2412634994897!2d-73.98784368459253!3d40.74844797932847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1619614879630!5m2!1sen!2sus"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="rounded-lg shadow-lg"
            ></iframe>
          </div>
          <div className="md:w-1/2 space-y-6">
            <div>
              <h3 className="text-2xl font-semibold mb-2 text-[#FF9494]">Address</h3>
              <p className="text-lg">
                Shop No. A-79, S.K Market
                <br />
                Shramik Kunj, Sector 110, Noida, Uttar Pradesh 201304
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-2 text-[#FF9494]">Operating Hours</h3>
              <p className="text-lg">Monday - Friday: 7:00 AM - 8:00 PM</p>
              <p className="text-lg">Saturday: 8:00 AM - 9:00 PM</p>
              <p className="text-lg">Sunday: 9:00 AM - 7:00 PM</p>
            </div>
            <button className="btn-primary">Get Directions</button>
          </div>
        </div>
      </div>
    </section>
  )
}

