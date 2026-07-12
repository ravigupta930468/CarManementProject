// BookingModal.tsx - Updated with vehicle name input
import { useState } from "react"
import {toast,Toaster} from "react-hot-toast"

interface FetchDataType {
  state: string
  location: string
  city: string
  pinCode: string
  price: number
  _id?: string
}

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  locationData: FetchDataType | null
}

const BookingModal = ({ isOpen, onClose, locationData }: BookingModalProps) => {
  const [hours, setHours] = useState(1)
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0])
  const [startTime, setStartTime] = useState("")
  const [customerName, setCustomerName] = useState("") // NEW
  const [vehicleName, setVehicleName] = useState("") // NEW
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  if (!isOpen || !locationData) return null

  const totalPrice = locationData.price * hours

  const calculateEndDateTime = () => {
    if (!startDate || !startTime) return { endDate: "", endTime: "" }
    try {
      const start = new Date(`${startDate}T${startTime}`)
      const end = new Date(start.getTime() + hours * 60 * 60 * 1000)
      return { 
        endDate: end.toISOString().split('T')[0], 
        endTime: end.toTimeString().slice(0, 5) 
      }
    } catch (e) {
      return { endDate: "", endTime: "" }
    }
  }

  const { endDate, endTime } = calculateEndDateTime()

  const handleClose = () => {
    setHours(1)
    setStartDate(new Date().toISOString().split('T')[0])
    setStartTime("")
    setCustomerName("")
    setVehicleName("")
    onClose()
  }

  const handleBooking = async () => {
    console.log("Booking process started...");

    // Validation
    if (!startDate || !startTime) {
      toast.error("Please select both date and time");
      return;
    }

    if (!customerName.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (!vehicleName.trim()) {
      toast.error("Please enter your vehicle name");
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error("Please login first");
      return;
    }

    setIsSubmitting(true);

    try {
      const bookingData = {
        locationId: locationData._id,
        locationName: locationData.location,
        city: locationData.city,
        state: locationData.state,
        pinCode: locationData.pinCode,
        customerName: customerName.trim(), // NEW
        vehicleName: vehicleName.trim(),   // NEW
        startDate,
        startTime,
        endDate,
        endTime,
        hours,
        pricePerHour: locationData.price,
        totalPrice,
        bookingDateTime: new Date().toISOString()
      };

      console.log("Sending Payload to MongoDB:", bookingData);

      const response = await fetch('http://localhost:3000/api/booking/create', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(bookingData)
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Booking confirmed and saved!");
        handleClose();
      } else {
        toast.error(result.message || "Booking failed");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      toast.error("Server error. Is your backend running?");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTimeDisplay = (time: string) => {
    if (!time) return "Select Time"
    const [h, m] = time.split(':')
    const hour = parseInt(h)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    return `${hour % 12 || 12}:${m} ${ampm}`
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4 backdrop-blur-sm">
      <Toaster position='top-center'/>
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-black text-gray-800">Book Parking Slot</h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 text-3xl">&times;</button>
        </div>

        <div className="space-y-6">
          {/* NEW: Customer Name Input */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Your Name</label>
            <input 
              type="text" 
              value={customerName} 
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* NEW: Vehicle Name Input */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Vehicle Details</label>
            <input 
              type="text" 
              value={vehicleName} 
              onChange={(e) => setVehicleName(e.target.value)}
              placeholder="e.g., Honda City, Royal Enfield"
              className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Date and Time Inputs */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Select Date</label>
              <input 
                type="date" 
                value={startDate} 
                onChange={(e) => setStartDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full p-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Select Time</label>
              <input 
                type="time" 
                value={startTime} 
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          {/* Duration Selector */}
          <div className="flex flex-col items-center space-y-2">
             <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Duration (Hours)</label>
             <div className="flex items-center gap-6 bg-gray-50 p-2 rounded-2xl border">
                <button 
                  type="button"
                  onClick={() => setHours(Math.max(1, hours - 1))} 
                  className="w-10 h-10 flex items-center justify-center bg-white shadow-sm rounded-xl font-bold text-xl hover:bg-gray-50"
                >
                  -
                </button>
                <span className="text-xl font-black text-gray-800 min-w-[3ch] text-center">{hours}</span>
                <button 
                  type="button"
                  onClick={() => setHours(hours + 1)} 
                  className="w-10 h-10 flex items-center justify-center bg-white shadow-sm rounded-xl font-bold text-xl hover:bg-gray-50"
                >
                  +
                </button>
             </div>
          </div>

          {/* Check-in / Check-out Display */}
          <div className="bg-green-50/50 border border-green-100 rounded-2xl p-4 grid grid-cols-2 gap-4">
            <div className="text-center border-r border-green-100">
              <p className="text-[10px] font-bold text-green-600/50 uppercase">Check-in</p>
              <p className="font-black text-green-700">{formatTimeDisplay(startTime)}</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-bold text-green-600/50 uppercase">Check-out</p>
              <p className="font-black text-green-700">{formatTimeDisplay(endTime)}</p>
            </div>
          </div>

          {/* Total Amount */}
          <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6 flex justify-between items-center">
            <span className="text-xl font-bold text-gray-700">Total Amount:</span>
            <span className="text-3xl font-black text-blue-600">₹{totalPrice}</span>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button 
              type="button"
              onClick={handleClose} 
              className="py-4 bg-gray-100 text-gray-700 font-bold rounded-2xl hover:bg-gray-200 transition"
            >
              Cancel
            </button>
            <button 
              type="button"
              onClick={handleBooking} 
              disabled={isSubmitting}
              className="py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Processing..." : "✓ Confirm Booking"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingModal