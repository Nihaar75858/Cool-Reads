import React from 'react'

// Dashboard Component
const Dashboard = () => {
  return (
    <div className="min-h-screen">

      {/* Main Content */}
      <div className="p-12 bg-custombg">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Text Section */}
          <div className="md:w-1/2">
            <h1 className="text-5xl font-bold mb-4">Welcome to COOL Reads</h1>
            <p className="text-gray-700 text-lg">
              Where you can read, connect, and share your world of literature.
            </p>
          </div>

          {/* Image Section */}
          <div className="md:w-1/2">
            <img
              src="/dash.png"
              alt="Books"
              className="w-full h-128 object-cover"
            />
          </div>
        </div>
      </div>


      <div className="p-12 bg-white">
        {/* Example: Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-2 text-center">Books</h2>
            <p className='text-xl text-justify'>
              Your books describe worlds that can entice readers
              to explore new worlds and ideas.
              Share your books with the world for everyone to see.
              We ensure thorough checks to avoid any copyright
              infridgment from occuring.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-2 text-center">Blogs</h2>
            <p className='text-xl text-justify'>
              Interaction is the best form of flattery.
              Describe and share your ideas and opinions.
              Learn about the latest trends in the literary world.
              Our blogs will keep you updated on all there is.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Card 3</h2>
            <p>Details about Card 3.</p>
          </div>
        </div>
      </div>

      <div className="w-64 h-64 rounded-full bg-[radial-gradient(circle,_#000_10%,_transparent_11%,_transparent_20%,_#000_21%,_#000_30%,_transparent_31%)]"></div>

    </div>
  );
};

export default Dashboard;