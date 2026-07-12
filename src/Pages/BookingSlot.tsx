import React, { useEffect, useState } from 'react';
import { IndianRupee, Clock, Calendar, MapPin, LogIn, PackageOpen, Trash2, AlertTriangle, X } from 'lucide-react';

interface Booking {
    _id: string;
    customerName: string;
    locationName: string;
    city: string;
    state: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    hours: number;
    pricePerHour: number;
    totalPrice: number;
    status: string;
    createdAt: string;
}

const BookingSlot: React.FC = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [userName, setUserName] = useState<string>('');

    // ─── MODAL STATE ──────────────────────────────────────────────────
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bookingToDelete, setBookingToDelete] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const name = localStorage.getItem('name');

        if (token && name) {
            setIsLoggedIn(true);
            setUserName(name);
        } else {
            setIsLoggedIn(false);
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (isLoggedIn) fetchMyBookings();
    }, [isLoggedIn]);

    const fetchMyBookings = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/api/my-bookings', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) throw new Error(`Error: ${response.status}`);
            const data = await response.json();
            setBookings(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // ─── TRIGGER MODAL ────────────────────────────────────────────────
    const openDeleteModal = (id: string) => {
        setBookingToDelete(id);
        setIsModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsModalOpen(false);
        setBookingToDelete(null);
    };

    // ─── ACTUAL DELETE LOGIC ──────────────────────────────────────────
    const handleDelete = async () => {
        if (!bookingToDelete) return;
        
        setIsDeleting(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/api/booking/delete/${bookingToDelete}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to delete");
            }

            setBookings(prev => prev.filter(b => b._id !== bookingToDelete));
            closeDeleteModal();
        } catch (err: any) {
            alert(`Error: ${err.message}`);
        } finally {
            setIsDeleting(false);
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
                <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-12 max-w-md w-full text-center">
                    <div className="h-20 w-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <LogIn size={36} className="text-indigo-400" />
                    </div>
                    <h2 className="text-2xl font-black text-slate-800 mb-2">You're not logged in</h2>
                    <p className="text-slate-500 text-sm mb-8">Please log in to view your history.</p>
                    <a href="/login" className="inline-block w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-2xl transition-all shadow-lg shadow-indigo-100">Go to Login</a>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 p-6 font-sans relative">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-black text-slate-800">My Bookings</h1>
                    <p className="text-slate-50 text-sm bg-slate-800 px-3 py-1 inline-block rounded-lg mt-2">
                        Welcome back, <span className="font-semibold text-indigo-300">{userName}</span>
                    </p>
                </div>

                {/* Bookings List */}
                <div className="space-y-4">
                    {bookings.map((booking) => (
                        <div key={booking._id} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <MapPin size={15} className="text-indigo-500" />
                                        <span className="font-bold text-slate-800">{booking.locationName}</span>
                                        <span className="text-xs text-slate-400">{booking.city}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                        <Clock size={13} className="text-slate-400" />
                                        <span>{booking.startDate} · {booking.startTime}</span>
                                    </div>
                                </div>

                                <div className="flex flex-col items-end gap-3">
                                    <div className="flex items-center text-xl font-black text-slate-900">
                                        <IndianRupee size={16} strokeWidth={3} />
                                        <span>{booking.totalPrice}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button 
                                            onClick={() => openDeleteModal(booking._id)}
                                            className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all group"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                        <span className="px-3 py-1 rounded-full text-[10px] font-black border border-emerald-200 text-emerald-600 bg-emerald-50">
                                            {booking.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ─── CUSTOM DELETE MODAL ─────────────────────────────────── */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div 
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
                        onClick={closeDeleteModal}
                    ></div>

                    {/* Modal Content */}
                    <div className="relative bg-white rounded-3xl shadow-2xl max-w-sm w-full p-8 overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="text-center">
                            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-50 mb-6">
                                <AlertTriangle className="h-8 w-8 text-red-500" />
                            </div>
                            <h3 className="text-xl font-black text-slate-900 mb-2">Cancel Booking?</h3>
                            <p className="text-slate-500 text-sm mb-8">
                                Are you sure you want to cancel this reservation? This action cannot be undone and the slot will be released.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3">
                            <button
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="w-full py-4 bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white font-bold rounded-2xl transition-all shadow-lg shadow-red-100 flex items-center justify-center"
                            >
                                {isDeleting ? "Processing..." : "Yes, Cancel Booking"}
                            </button>
                            <button
                                onClick={closeDeleteModal}
                                className="w-full py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-2xl transition-all"
                            >
                                Keep Reservation
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookingSlot;