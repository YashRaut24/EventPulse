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
    }

    const handleChange = (e) => {
        console.log(e.target);
    }

    return (
        <div className="employee-data">
            <form className="form-fill" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Name" 
                    value={formData.name} 
                    onChange={() => setFormData({...formData, name: e.target.value})} 
                />
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={formData.email} 
                    onChange={handleChange} 
                />
                <input 
                    type="tel" 
                    placeholder="Phone" 
                    value={formData.phone} 
                    onChange={handleChange} 
                />
                <textarea 
                    placeholder="About" 
                    value={formData.about} 
                    onChange={handleChange} 
                />
                <input 
                    type="text" 
                    placeholder="Skills" 
                    value={formData.skills} 
                    onChange={handleChange} 
                />
                <textarea 
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