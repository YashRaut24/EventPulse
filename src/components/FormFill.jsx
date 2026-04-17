import axios from "axios";
import { useState } from "react";

function FormFill(){
    const [formData, setFormData] = useState({
        name : '',
        email : '',
        phone : '',
        about : '',
        skills : '',
        experience : '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    return (
        <div className="employee-data">
            <form className="form-fill" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                />
                <textarea
                    name="about"
                    placeholder="About"
                    value={formData.about}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="skills"
                    placeholder="Skills"
                    value={formData.skills}
                    onChange={handleChange}
                />
                <textarea
                    name="experience"
                    placeholder="Experience"
                    value={formData.experience}
                    onChange={handleChange}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default FormFill;
