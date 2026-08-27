import { useState } from "react";

const TestimonialManager = () => {

  const [testimonials, setTestimonials] =
    useState([]);

  const [formData, setFormData] =
    useState({
      name: "",
      company: "",
      image: "",
      rating: 5,
      review: "",
    });

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

  };

  const addTestimonial = () => {

    if (
      !formData.name ||
      !formData.review
    ) {
      alert(
        "Name and Review are required."
      );
      return;
    }

    setTestimonials([
      ...testimonials,
      {
        id: Date.now(),
        ...formData,
      },
    ]);

    setFormData({
      name: "",
      company: "",
      image: "",
      rating: 5,
      review: "",
    });

  };

  const deleteTestimonial = (id) => {

    setTestimonials(
      testimonials.filter(
        (item) => item.id !== id
      )
    );

  };

  return (

    <div>

      <h2>
        Testimonials Manager
      </h2>

      <div
        className="story-card"
        style={{
          padding: "30px",
          marginBottom: "30px",
        }}
      >

        <input
          type="text"
          name="name"
          placeholder="Client Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleChange}
        />

        <input
          type="text"
          name="image"
          placeholder="Client Image URL"
          value={formData.image}
          onChange={handleChange}
        />

        <select
          name="rating"
          value={formData.rating}
          onChange={handleChange}
        >
          <option value="5">
            ⭐⭐⭐⭐⭐
          </option>

          <option value="4">
            ⭐⭐⭐⭐
          </option>

          <option value="3">
            ⭐⭐⭐
          </option>

          <option value="2">
            ⭐⭐
          </option>

          <option value="1">
            ⭐
          </option>
        </select>

        <textarea
          rows="5"
          name="review"
          placeholder="Client Review"
          value={formData.review}
          onChange={handleChange}
        />

        <button
          onClick={addTestimonial}
          style={{
            marginTop: "20px",
          }}
        >
          Add Testimonial
        </button>

      </div>

      <div>

        {testimonials.map(
          (testimonial) => (

          <div
            key={testimonial.id}
            className="admin-item"
            style={{
              marginBottom: "20px",
            }}
          >

            <div>

              <h3>
                {testimonial.name}
              </h3>

              <p>
                {testimonial.company}
              </p>

              <p>
                {"⭐".repeat(
                  Number(
                    testimonial.rating
                  )
                )}
              </p>

              <p>
                {testimonial.review}
              </p>

            </div>

            <button
              onClick={() =>
                deleteTestimonial(
                  testimonial.id
                )
              }
            >
              Delete
            </button>

          </div>

        ))}

      </div>

    </div>

  );

};

export default TestimonialManager;