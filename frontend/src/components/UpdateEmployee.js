import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import EmployeeService from '../service/EmployeeService'

const UpdateEmployee = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({
        id: id,
        name: "",
        phone: "",
        email: "",
    });

    const handleChange = (e) => {
        const value = e.target.value;
        setEmployee({ ...employee, [e.target.name]: value })
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await EmployeeService.getEmployeeById(id);
                setEmployee(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [id]);

    const updateEmployee = (e) => {
        e.preventDefault();
        EmployeeService.updateEmployee(employee, id)
            .then((response) => {
                console.log("saved ", response);
                navigate("/")
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <div className="flex justify-center items-center">
            <div className='max-w-xl mx-40 bg-white/50 my-20 rounded shadow py-4 px-6'>
                <div className='text-4xl tracking-wider font-bold text-center py-4 px-8'>
                    <p>Upadte 👨‍💻 Employee</p>
                </div>

                <div className='mx-10 my-4 space-y-5'>
                    
                    <div className='flex items-center bg-white/60 backdrop-blur-sm rounded-lg shadow-sm px-4 py-3 hover:shadow-md transition-shadow duration-200'>
                        <label className='text-gray-700 font-medium w-28 tracking-wide'>Name :</label>
                        <input
                            type='text'
                            name='name'
                            value={employee.name}
                            onChange={(e) => handleChange(e)}
                            placeholder='Enter full name'
                            className='flex-1 py-2 px-3 text-gray-800 placeholder:text-gray-400 bg-transparent border-b-2 border-gray-300 focus:border-purple-400 outline-none transition duration-200'
                        />
                    </div>

                    <div className='flex items-center bg-white/60 backdrop-blur-sm rounded-lg shadow-sm px-4 py-3 hover:shadow-md transition-shadow duration-200'>
                        <label className='text-gray-700 font-medium w-28 tracking-wide'>Phone :</label>
                        <input
                            type='number'
                            name='phone'
                            value={employee.phone}
                            onChange={(e) => handleChange(e)}
                            placeholder='Phone'
                            className='flex-1 py-2 px-3 text-gray-800 placeholder:text-gray-400 bg-transparent border-b-2 border-gray-300 focus:border-purple-400 outline-none transition duration-200'
                        />
                    </div>

                    <div className='flex items-center bg-white/60 backdrop-blur-sm rounded-lg shadow-sm px-4 py-3 hover:shadow-md transition-shadow duration-200'>
                        <label className='text-gray-700 font-medium w-28 tracking-wide'>Email :</label>
                        <input
                            type='email'
                            name='email'
                            value={employee.email}
                            onChange={(e) => handleChange(e)}
                            placeholder='Email'
                            className='flex-1 py-2 px-3 text-gray-800 placeholder:text-gray-400 bg-transparent border-b-2 border-gray-300 focus:border-purple-400 outline-none transition duration-200'
                        />
                    </div>
                </div>


                <div className='flex my-4 space-x-4 px-40'>
                    <button
                        onClick={updateEmployee}
                        className='bg-green-400 hover:bg-green-600 py-2 px-6 rounded'> Update </button>
                    <button
                        onClick={() => navigate("/")}
                        className='bg-red-400 hover:bg-red-600 py-2 px-6 rounded'> Cancel </button>
                </div>
            </div>
        </div>
    )
}

export default UpdateEmployee
