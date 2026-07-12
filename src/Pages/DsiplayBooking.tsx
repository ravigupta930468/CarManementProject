import  { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { LayoutDashboard, Car, Calendar, LogOut,  MapPin, Clock } from 'lucide-react';

// 1. Updated Interface to match your Mongoose Schema
interface Booking {
    _id: string;
    customerName: string;
    vehicleName: string;
    locationName: string;
    city: string;
    startTime: string;
    startDate: string;
    totalPrice: number;
    status: string;
}

const UserDashboard = () => {
    // 2. Properly typed state
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    
    const userName = localStorage.getItem('name') || 'User';

    useEffect(() => {
        const fetchUserBookings = async () => {
            try {
                // Adjust this URL to your specific user-bookings endpoint if needed
                const response = await fetch(`http://localhost:3000/api/all`); 
                const data = await response.json();
                
                // Ensure data is an array before setting state
                setBookings(Array.isArray(data) ? data : []);
            } catch (error) {
                toast.error("Could not fetch your data");
            } finally {
                setLoading(false);
            }
        };
        fetchUserBookings();
    }, []);

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Toaster />

            {/* --- SIDEBAR --- */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
                        <Car size={28} /> CarFlow
                    </h1>
                </div>
                <nav className="flex-1 px-4 space-y-2">
                    <button className="flex items-center w-full gap-3 px-4 py-3 text-blue-600 bg-blue-50 rounded-xl font-medium">
                        <LayoutDashboard size={20} /> Dashboard
                    </button>
                    <button className="flex items-center w-full gap-3 px-4 py-3 text-gray-500 hover:bg-gray-100 rounded-xl transition-all">
                        <Calendar size={20} /> My Bookings
                    </button>
                </nav>
                <div className="p-4 border-t">
                    <button 
                        onClick={() => { localStorage.clear(); window.location.href='/login'; }}
                        className="flex items-center w-full gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    >
                        <LogOut size={20} /> Logout
                    </button>
                </div>
            </aside>

            {/* --- MAIN CONTENT --- */}
            <main className="flex-1 p-4 md:p-8">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Welcome, {userName}! 👋</h2>
                        <p className="text-gray-500">Managing your vehicle bookings.</p>
                    </div>
                </header>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-50">
                        <h3 className="text-lg font-bold text-gray-800">Recent Booking Slots</h3>
                    </div>
                    
                    {loading ? (
                        <div className="p-10 text-center text-gray-400">Loading your slots...</div>
                    ) : bookings.length === 0 ? (
                        <div className="p-10 text-center text-gray-400">No bookings found.</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 text-gray-500 text-sm uppercase">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold">Vehicle & Location</th>
                                        <th className="px-6 py-4 font-semibold">Date & Time</th>
                                        <th className="px-6 py-4 font-semibold">Price</th>
                                        <th className="px-6 py-4 font-semibold">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {bookings.map((slot) => (
                                        <tr key={slot._id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                                        <MapPin size={18} />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-gray-800">{slot.vehicleName}</p>
                                                        <p className="text-xs text-gray-500">{slot.locationName}, {slot.city}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600 text-sm">
                                                <div className="flex flex-col">
                                                    <span className="flex items-center gap-1"><Calendar size={14}/> {slot.startDate}</span>
                                                    <span className="flex items-center gap-1 text-xs text-gray-400"><Clock size={12}/> {slot.startTime}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-800 font-medium">
                                                ${slot.totalPrice}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                                    slot.status === 'confirmed' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                                                }`}>
                                                    {slot.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default UserDashboard;