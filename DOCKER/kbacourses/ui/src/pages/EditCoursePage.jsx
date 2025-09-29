import React,{ useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const EditCoursePage = () => {

  const { courseName } = useParams();
  const navigate = useNavigate();

  const [courseId, setCourseId] = useState("");
  const [courseType, setCourseType] = useState("Self-Paced");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(5000);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      try{
        const res = await fetch(`/api/getCourse?courseName=${encodeURIComponent(courseName)}`);
        if(!res.ok){
          throw new Error("Failed to fetch course details!");
        }
        const data = await res.json();
        if(!data || !data.courseName){
          throw new Error("Course Not found!");
        }
        setCourseId(data.courseId);
        setCourseType(data.courseType || "Self-Paced");
        setDescription(data.description || "");
        setPrice(data.price || 5000);
      
      } catch(err){
        console.error(err);
        setError(err.message);
      } finally{
        setLoading(false);
      }
    }

    fetchCourse();

  },[courseName]);

  const submitForm = async (e) => {
    e.preventDefault();
    try{
      const updatedCourse = {
        CourseName: courseName,
        CourseId: courseId,
        CourseType: courseType,
        Description: description,
        Price: price,
      };
      const res = await fetch("/api/updateCourse",{
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updatedCourse),
      });
      const data = await res.text();

      if(!res.ok){
        throw new Error(data || "failed to update course");
      }
      toast.success("Course Updated Successfully!");
      navigate("/courses");
    } catch(error){
      console.error("Update Error:", error);
      toast.error(error.message);
    }
  } 

  if(loading) {
    return <div className="p-4">Loading course data...</div>
  }
  if(error) {
    return <div className="p-4">{error}</div>
  }

  return (
    <>
      <section className="bg-white mb-20">
        <div className="container m-auto max-w-2xl py-2">
          <div className="bg-purple-100 px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <form onSubmit={submitForm}>
              <h2 className="text-3xl text-purple-800 text-center font-semibold mb-6">
                Update Course
              </h2>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Course ID
                </label>
                <input
                  type="text"
                  className="border rounded w-full py-2 px-3 mb-2"
                  value={courseId}
                  onchange={(e)=> setCourseId(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="type"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Course Type
                </label>
                <select
                  value={courseType}
                  onchange={(e)=> setCourseType(e.target.value)}
                  className="border rounded w-full py-2 px-3"
                  required
                >
                  <option value="Self-Paced">Self-Paced</option>
                  <option value="Instructor-Led">Instructor-Led</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Description
                </label>
                <textarea
                  value={description}
                  onchange={(e)=> setDescription(e.target.value)}
                  className="border rounded w-full py-2 px-3"
                  rows="4"
                
                ></textarea>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="type"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Price
                </label>
                <select
                  value={price}
                  onchange={(e)=> setPrice(e.target.value)}
                  className="border rounded w-full py-2 px-3"
                  required
                >
                  <option value="Rs.5000">Rs.5000</option>
                  <option value="Rs.3500">Rs.3500</option>
                  <option value="Rs.15000">Rs.15000</option>
                </select>
              </div>

              <div>
                <button
                  className="bg-purple-500 hover:bg-purple-600 my-10 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Update Course
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditCoursePage;
