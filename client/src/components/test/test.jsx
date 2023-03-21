import React from 'react'

function Test() {
    const Departments = [
      {
        Name: "Counselling",
        URL: "https://img.freepik.com/premium-vector/psychotherapy-counseling-psychologist-psychotherapist-patient-sitting-armchairs-therapy-session-treatment-stress-addictions-mental-problems_458444-260.jpg",
        Description:
          "Mental health is one of the greatest thing in our human life and we are helping you to achieve it  ",
      },
      {
        Name: "Child Care",
        URL: "https://img.freepik.com/premium-vector/girl-cat-campaign-using-cloth-bags_99326-405.jpg",
        Description:
          "We are providing the best healthy treatment for below 10 childrens",
      },
      {
        Name: "Dermatologist",
        URL: "https://media.istockphoto.com/id/936016040/vector/male-hair-loss.jpg?s=612x612&w=0&k=20&c=E7omxqfZyVfOAgTBjvC9RXg_xKvcnYWpREgS21-FX8o=",
        Description:
          "Having a good healthy hair will improve our beauty we have the best doctor to take care of your hair",
      },
      {
        Name: "Dermatologist",
        URL: "https://media.istockphoto.com/id/936016040/vector/male-hair-loss.jpg?s=612x612&w=0&k=20&c=E7omxqfZyVfOAgTBjvC9RXg_xKvcnYWpREgS21-FX8o=",
        Description:
          "Having a good healthy hair will improve our beauty we have the best doctor to take care of your hair",
      },
      {
        Name: "Counselling",
        URL: "https://img.freepik.com/premium-vector/psychotherapy-counseling-psychologist-psychotherapist-patient-sitting-armchairs-therapy-session-treatment-stress-addictions-mental-problems_458444-260.jpg",
        Description:
          "Mental health is one of the greatest thing in our human life and we are helping you to achieve it  ",
      },
      {
        Name: "Child Care",
        URL: "https://img.freepik.com/premium-vector/girl-cat-campaign-using-cloth-bags_99326-405.jpg",
        Description:
          "We are providing the best healthy treatment for below 10 childrens",
      }

    ];
  return (
    <div className='w-full flex justify-center bg-white'>
        <div className="container my-12 mx-auto px-4 md:px-12 lg:w-4/5 sm:w-full ">
          <div className="flex flex-wrap -mx-1 lg:-mx-4">
            {Departments.map((Department) => (
              <div className="my-1 px-3 w-full md:w-1/2 lg:my-4 lg:px-3  xl:w-1/4 cursor-pointer hover:scale-105 ease-in-out duration-200">
                <article className="overflow-hidden rounded-lg shadow-lg bg-white hover:bg-blue-50 h-[auto]">
                  <div className="flex items-center justify-center leading-tight p-2 md:p-4">
                  <a href="#">
                    <img
                      alt="Placeholder"
                      className="block h-60 w-64 rounded-2xl object-cover"
                      src={Department.URL}
                    />
                  </a>
                  </div>

                  <div className="flex items-center justify-center leading-tight p-2 md:p-4">
                    <h1 className="text-lg">
                      <p className="no-underline text-black">{Department.Name}</p>
                    </h1>
                  </div>

                  <div className="flex items-center justify-center text-gray-500 text-center leading-tight p-2 md:p-4">
                    <p > 
                      {Department.Description}
                    </p>
                  </div>

                  <div className="flex items-center justify-center leading-tight p-2 md:p-4  mb-3"   >
                    <p className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800">
                      View Doctors
                      <svg
                        aria-hidden="true"
                        className="w-4 h-4 ml-2 -mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20">
                        <path
                          fill-rule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clip-rule="evenodd"></path>
                      </svg>
                    </p>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
  )
}

export default Test
