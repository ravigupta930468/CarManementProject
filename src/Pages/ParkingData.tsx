import { useEffect, useState } from "react"
import BookingModal from "./BookingModal"

interface FetchDataType {
  state: string
  location: string
  city: string
  pinCode: string
  price: number
}

const ParkingData = () => {
  const [Data, setData] = useState<FetchDataType[]>([])
  const [searchTerm, setSearchTerm] = useState("") // Track search input
  const [currentPage, setCurrentPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState<FetchDataType | null>(null)
  const itemsPerPage = 10

  useEffect(() => {
    const fetching = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/all')
        const data = await res.json()
        setData(data)
      } catch (err) {
        console.error("Failed to fetch locations:", err)
      }
    }
    fetching()
  }, [])

  // 1. FILTER LOGIC: Filter data based on search term
  const filteredData = Data.filter((item) => {
    const search = searchTerm.toLowerCase()
    return (
      item.city.toLowerCase().includes(search) || 
      item.location.toLowerCase().includes(search)
    )
  })

  // 2. PAGINATION LOGIC: Use filteredData instead of Data
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)

  // Reset to page 1 when searching
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1) 
  }

  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber)
  const handlePrevious = () => currentPage > 1 && setCurrentPage(currentPage - 1)
  const handleNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1)

  const handleBookSlot = (location: FetchDataType) => {
    setSelectedLocation(location)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedLocation(null)
  }

  return (
    <>
      <div className='bg-white border-slate-100 border  shadow shadow-md w-full mt-2.5 p-2.5 rounded-2xl'>
        {/* Search Input Section */}
        <div className="flex justify-center items-center gap-3  mx-auto">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder='Search by City or Location (e.g. Mumbai, Airport...)'
            className='mt-1 p-3.5 rounded-2xl bg-slate-50 border-slate-200 border-2 w-full max-w-2xl shadow-md shadow-blue-400 text-black focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>
        
        {/* Display filtered data */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  mt-2.5 m-1.5 gap-3">
          {currentItems.length > 0 ? (
            currentItems.map((item, index) => (
              <div key={index} className="flex flex-col bg-white rounded-2xl shadow-md shadow-blue-200 p-2.5">
                <h3 className="text-2xl font-bold">
                  City: <span className="text-blue-400">{item.city}</span>
                </h3>
                <h3 className="text-md">
                  Location: <span>{item.location}</span>
                </h3>
                <p className="text-sm font-bold">
                  Price: <span className="text-red-400">₹{item.price}/hr</span>
                </p>
                <button 
                  onClick={() => handleBookSlot(item)}
                  className="bg-blue-400 px-2 py-2.5 rounded-2xl m-2.5 text-white font-bold hover:bg-blue-500 transition"
                >
                  Book slot
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center p-10 bg-slate-50">
              No parking zones found 
            </div>
          )}
        </div>

        {/* Pagination Controls - Only show if there's more than 1 page */}
        {totalPages > 1 && (
          <div className="flex flex-col items-center mt-4">
            <div className="flex justify-center items-center gap-2">
              <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-600"
              >
                Previous
              </button>

              <div className="hidden sm:flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-2 rounded-lg ${
                      currentPage === page
                        ? 'bg-blue-500 text-white'
                        : 'bg-white text-blue-500 hover:bg-blue-100'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-600"
              >
                Next
              </button>
            </div>
            <div className="text-center mt-2 text-gray-600">
              Page {currentPage} of {totalPages} (Found: {filteredData.length} locations)
            </div>
          </div>
        )}
      </div>

      <BookingModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        locationData={selectedLocation}
      />
    </>
  )
}

export default ParkingData