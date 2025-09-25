import axios from 'axios';
import { useState, useEffect } from 'react';

function Employee() {
    const [employedata, setEmployeeData] = useState([]);

    // useEffect(() => {
        // axios.get('https://localhost:3000/employee')
        // .then((res) => console.log(res.data))
        // .catch((err) => console.error(err));
    // },[])

  return (
    <div className="employee-header">
        <div className="employee-photo">
            <img src="." alt="Employee.name"/>
        </div>
    </div>
  );
}

export default Employee;