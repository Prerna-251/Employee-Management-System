import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeService from '../service/EmployeeService';
import { Search } from 'lucide-react'; // lightweight icon

const EmployeeList = () => {
    const [loading, setLoading] = useState(true);
    const [employees, setEmployees] = useState([]);
    const [searchType, setSearchType] = useState('id');
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [error, setError] = useState('');
    const [isSearchOpen, setIsSearchOpen] = useState(false); // animation state

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await EmployeeService.getEmployees();
                setEmployees(response.data);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (!searchValue.trim()) {
            setSearchResult([]);
            setError('');
        }
    }, [searchValue]);

    const deleteEmployee = (e, id) => {
        e.preventDefault();
        EmployeeService.deleteEmployeeById(id).then(() => {
            setEmployees((prev) => prev.filter((emp) => emp.id !== id));
        });
    };

    const editEmployee = (e, id) => {
        e.preventDefault();
        navigate(`/editEmployee/${id}`);
    };

    const handleSearch = async () => {
        if (!searchValue.trim()) {
            setError('Please enter a value to search.');
            setSearchResult([]);
            return;
        }

        try {
            setError('');

            if (searchType === 'id') {
                const response = await EmployeeService.getEmployeeById(searchValue);
                setSearchResult([response.data]);
            } else {
                const filtered = employees.filter((emp) =>
                    emp.name.toLowerCase().includes(searchValue.toLowerCase())
                );
                if (filtered.length > 0) setSearchResult(filtered);
                else {
                    setError('No employee found with that name.');
                    setSearchResult([]);
                }
            }
        } catch {
            setError('Employee not found!');
            setSearchResult([]);
        }
    };

    return (
        <div className="container mx-auto my-8 px-4">
            {/* Add Employee Button */}
            <div className="flex justify-center">
                <button
                    onClick={() => navigate('/addEmployee')}
                    className="bg-gradient-to-r from-purple-400 to-blue-400 hover:from-purple-500 hover:to-blue-500 text-white mx-30 my-12 font-semibold px-20 py-2 rounded transition-all duration-300 shadow-md"
                >
                    Add Employee 👨‍💻
                </button>
            </div>

            {/* Animated Search Section */}
            <div className="flex justify-center">
                <div
                    className={`relative bg-white/50 backdrop-blur-md shadow-lg rounded-2xl border border-white/40 transition-all duration-500 ease-in-out ${isSearchOpen ? 'w-full max-w-4xl p-6' : 'w-16 h-16 flex items-center justify-center'
                        }`}
                >
                    {!isSearchOpen ? (
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="p-3 rounded-full hover:bg-white/40 transition"
                        >
                            <Search className="text-gray-700 w-6 h-6" />
                        </button>
                    ) : (
                        <>
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-semibold text-gray-700 tracking-wide">
                                    🔍 Search Employee
                                </h2>
                                <button
                                    onClick={() => {
                                        setIsSearchOpen(false);
                                        setSearchValue('');
                                        setSearchResult([]);
                                        setError('');
                                    }}
                                    className="text-gray-500 hover:text-red-400 transition"
                                >
                                    ✖
                                </button>
                            </div>

                            <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                                <select
                                    value={searchType}
                                    onChange={(e) => setSearchType(e.target.value)}
                                    className="border border-gray-300 rounded-lg px-3 py-2 w-40 text-gray-700 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                                >
                                    <option value="id">Search by ID</option>
                                    <option value="name">Search by Name</option>
                                </select>

                                <input
                                    type="text"
                                    placeholder={
                                        searchType === 'id' ? 'Enter Employee ID' : 'Enter Employee Name'
                                    }
                                    value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                    className="border border-gray-300 rounded-lg px-4 py-2 w-full text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                                />

                                <button
                                    onClick={handleSearch}
                                    className="bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition"
                                >
                                    Search
                                </button>
                            </div>

                            {error && <p className="text-center text-red-500 mt-4">{error}</p>}
                        </>
                    )}
                </div>
            </div>

            {/* Show search result */}
            {searchResult.length > 0 && (
                <div className="flex justify-center mt-8">
                    <table className="shadow bg-white/50 rounded-lg w-full max-w-4xl">
                        <thead>
                            <tr>
                                <th className="text-left px-6 py-3 uppercase tracking-wide">Name</th>
                                <th className="text-left px-6 py-3 uppercase tracking-wide">Phone</th>
                                <th className="text-left px-6 py-3 uppercase tracking-wide">Email</th>
                                <th className="text-left px-6 py-3 uppercase tracking-wide">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchResult.map((employee) => (
                                <tr
                                    key={employee.id}
                                    className="hover:bg-slate-100 hover:text-purple-800 transition"
                                >
                                    <td className="px-6 py-4">{employee.name}</td>
                                    <td className="px-6 py-4">{employee.phone}</td>
                                    <td className="px-6 py-4">{employee.email}</td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={(e) => editEmployee(e, employee.id)}
                                            className="hover:text-blue-500 cursor-pointer"
                                        >
                                            Edit 📝
                                        </button>

                                        <button
                                            onClick={(e) => deleteEmployee(e, employee.id)}
                                            className="hover:text-red-500 cursor-pointer ml-5"
                                        >
                                            Delete 🗑️
                                        </button>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Employee List Table */}
            <div className="flex justify-center mt-10">
                <table className="shadow w-full max-w-4xl">
                    <thead className="bg-white/50">
                        <tr>
                            <th className="text-left px-6 py-3 uppercase tracking-wide">Name</th>
                            <th className="text-left px-6 py-3 uppercase tracking-wide">Phone</th>
                            <th className="text-left px-6 py-3 uppercase tracking-wide">Email</th>
                            <th className="text-left px-6 py-3 uppercase tracking-wide">Action</th>
                        </tr>
                    </thead>
                    {!loading && (
                        <tbody>
                            {employees.map((employee) => (
                                <tr
                                    key={employee.id}
                                    className="hover:bg-slate-100 hover:text-purple-800 transition"
                                >
                                    <td className="text-left px-6 py-4">{employee.name}</td>
                                    <td className="text-left px-6 py-4">{employee.phone}</td>
                                    <td className="text-left px-6 py-4">{employee.email}</td>
                                    <td className="text-left px-6 py-4">

                                        <button
                                            onClick={(e) => editEmployee(e, employee.id)}
                                            className="hover:text-blue-500 cursor-pointer"
                                        >
                                            Edit 📝
                                        </button>

                                        <button
                                            onClick={(e) => deleteEmployee(e, employee.id)}
                                            className="hover:text-red-500 cursor-pointer ml-5"
                                        >
                                            Delete 🗑️
                                        </button>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
};

export default EmployeeList;
