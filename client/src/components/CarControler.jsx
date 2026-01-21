import React from "react";

const CarControl = ({ onEdit, onDelete }) => {
    // აქ მომავალში წამოიღებ მანქანების სიას შენი კონტექსტიდან ან API-დან
    const cars = []; // დროებითი ცარიელი მასივი

    return (
        <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50/50">
                <tr>
                    <th className="p-5 text-[10px] uppercase font-black text-gray-400 tracking-widest">Model / Brand</th>
                    <th className="p-5 text-[10px] uppercase font-black text-gray-400 tracking-widest">Price/Day</th>
                    <th className="p-5 text-[10px] uppercase font-black text-gray-400 tracking-widest">Category</th>
                    <th className="p-5 text-[10px] uppercase font-black text-gray-400 tracking-widest text-right">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
                {cars.length > 0 ? (
                    cars.map((car) => (
                        <tr key={car._id} className="hover:bg-gray-50/50 transition-colors group">
                            <td className="p-5">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                                        <img src={car.image} alt={car.model} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold group-hover:text-[#ff3131] transition-colors">{car.model}</p>
                                        <p className="text-[9px] text-gray-400 font-medium uppercase">{car.brand}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="p-5 text-sm font-bold">${car.price}</td>
                            <td className="p-5">
                                <span className="py-1 px-3 rounded-full bg-gray-100 text-[9px] font-black uppercase tracking-widest">
                                    {car.category}
                                </span>
                            </td>
                            <td className="p-5 text-right">
                                <div className="flex justify-end gap-2">
                                    <button onClick={() => onEdit(car)} className="p-2 hover:bg-black hover:text-white rounded-lg transition-all text-gray-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" /></svg>
                                    </button>
                                    <button onClick={() => onDelete(car._id)} className="p-2 hover:bg-[#ff3131] hover:text-white rounded-lg transition-all text-gray-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="4" className="p-20 text-center">
                            <p className="text-gray-300 font-black uppercase tracking-[0.3em] italic text-sm">No Cars Found In Fleet</p>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default CarControl;