import React from 'react';
import './Services.css'; // import the CSS file

const ServicesSection = () => {
    const services = [
        {
        title:'Service 1',
        description:'asdfghjksdfghjksdfghjk sgvfdjagdfkjhsa saghdfskad sagdisagdig',
        image:'/images/service.jpg'
        },{
            title:'Service 2',
            description:'asdfghjksdfghjksdfghjk sgvfdjagdfkjhsa saghdfskad sagdisagdig',
            image:'/images/service.jpg'
        },{
            title:'Service 3',
            description:'asdfghjksdfghjksdfghjk sgvfdjagdfkjhsa saghdfskad sagdisagdig',
            image:'/images/service.jpg'
        }
    ]

    return (
        <section className="services-section">
          <h2 className='mb-4'>Our Services</h2>
          <div className="service-cards">
            {services.map((service) => (
              <div key={service.id} className="service-card">
                <img src={service.image} alt={service.title} />
                <div className="card-content">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      );
};

export default ServicesSection;
