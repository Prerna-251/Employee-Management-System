import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EmployeeService from '../service/EmployeeService'

const AddEmployee = () => {
    const [employee, setEmployee] = useState({
        id: "",
        name: "",
        phone: "",
        email: "",
    });

    const handleChange = (e) => {
        const value = e.target.value;
        setEmployee({ ...employee, [e.target.name]: value })
    }

    const saveEmployee = (e) => {
        e.preventDefault();
        EmployeeService.saveEmployee(employee)
            .then((response) => {
                console.log("saved ", response);
                navigate("/")
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const reset = (e) => {
        e.preventDefault();
        setEmployee({
            id: "",
            name: "",
            phone: "",
            email: "",
        });
    }

    const navigate = useNavigate();
    return (
        <div className="flex justify-center items-center">
            <div className='max-w-xl mx-40 bg-white/50 my-20 rounded shadow py-4 px-6'>
                <div className='text-4xl tracking-wider font-bold text-center py-4 px-8'>
                    <p>Add 👨‍💻 New Employee</p>
                </div>

                <div className='mx-10 my-6 space-y-6 bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-md'>
    
                    <input
                        type='text'
                        name='name'
                        value={employee.name}
                        onChange={(e) => handleChange(e)}
                        placeholder='Enter full name'
                        className='w-full py-3 pl-4 text-gray-800 placeholder:text-gray-400 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition duration-200'
                    />

                    <input
                        type='number'
                        name='phone'
                        value={employee.phone}
                        onChange={(e) => handleChange(e)}
                        placeholder='Enter phone number'
                        className='w-full py-3 pl-4 text-gray-800 placeholder:text-gray-400 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition duration-200'
                    />

                    <input
                        type='email'
                        name='email'
                        value={employee.email}
                        onChange={(e) => handleChange(e)}
                        placeholder='Enter email address'
                        className='w-full py-3 pl-4 text-gray-800 placeholder:text-gray-400 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition duration-200'
                    />
                </div>


                <div className='flex my-4 space-x-4 px-20'>
                    <button
                        onClick={saveEmployee}
                        className='bg-green-400 hover:bg-green-600 py-2 px-6 rounded'> Save </button>
                    <button
                        onClick={reset}
                        className='bg-blue-400 hover:bg-blue-600 py-2 px-6 rounded'> Clear </button>
                    <button
                        onClick={() => navigate("/")}
                        className='bg-red-400 hover:bg-red-600 py-2 px-6 rounded'> Cancel </button>
                </div>
            </div>
        </div>
    )
}

export default AddEmployee
