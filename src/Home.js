import React from "react";
import brand from "./10857342_1573850726235493_2915409967682554674_o.webp";
const Home = () => {
  return (
    <div>
      <img
        src={brand}
        alt="College Image"
        style={{ display: "block", margin: "auto" }}
      />
      <header>
        <h1>Sri Ramakrishna Engineering College Coimbatore</h1>
        <h2>Hostel Management</h2>
      </header>

      <section>
        <h3>Welcome to our College</h3>
        <p>
          Sri Ramakrishna Engineering College provides a comfortable and secure
          living environment for its students through our modern hostel
          facilities. We strive to create a home away from home, fostering a
          conducive atmosphere for academic excellence and personal growth.
        </p>
      </section>

      <section>
        <h3>COllegeFacilities</h3>
        <ul>
          <li>Spacious and well-furnished rooms</li>
          <li>24/7 security for the safety of residents</li>
          <li>Hygienic and nutritious food provided in the hostel mess</li>
          <li>Wi-Fi connectivity for academic and recreational purposes</li>
          <li>Recreational areas for socializing and relaxation</li>
          <li>Laundry services</li>
        </ul>
      </section>

      <section>
        <h3>Hostel Administration</h3>
        <p>
          Our dedicated hostel administration team ensures the smooth
          functioning of hostel facilities. Feel free to contact them for any
          queries, concerns, or assistance related to hostel life.
        </p>
        {/* Add contact details for hostel administration */}
      </section>

      <section>
        <h3>Application and Administration</h3>
        <p>
          Prospective students can find information on the hostel admission
          process, rules, and regulations on our website. We encourage early
          applications to secure a spot in our hostel.
        </p>
        {/* Add a link or details for hostel admission */}
      </section>

      <section>
        <h3>Gallery</h3>
        {/* Add a gallery showcasing hostel facilities, rooms, and common areas */}
      </section>

      <section>
        <h3>News and Updates</h3>
        {/* Include any news, updates, or announcements related to hostel life */}
      </section>

      <p>
        &copy; 2024 Sri Ramakrishna Engineering College Coimbatore - Hostel
        Management
      </p>
    </div>
  );
};

export default Home;
