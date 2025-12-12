import { useLoaderData } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext } from "react";
import AuthContext from "../../../contexts/AuthContext";
import axios from "axios";

const ReportIssue = () => {
  const locations = useLoaderData(); // fetched from loader
//   console.log(locations);
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();
  const { user } = useContext(AuthContext);

  const onSubmit = async (data) => {
    try {
      let photoUrl = "";
      if (data.image && data.image[0]) {
        const imageFile = data.image[0];
        const formData = new FormData();
        formData.append("image", imageFile);
        const imgbbResponse = await axios.post(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_IMAGE_HOST_KEY
          }`,
          formData
        );
        photoUrl = imgbbResponse.data.data.url;
      }

      const issueData = {
        title: data.title,
        description: data.description,
        category: data.category,
        city: locations.city,
        area: data.area,
        displayName: user.displayName,
        email: user.email,
        photoUrl,
      };

      const res = await axiosSecure.post("/issues", issueData);

      const result = res.data;
      if (result.insertedId) {
        alert("Issue submitted successfully!");
        reset();
      } else {
        alert("Failed to submit issue");
      }
    } catch (error) {
      console.error("Error submitting issue:", error);
      alert(
        "Failed to submit issue: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto p-5">
      <input
        {...register("title", { required: true })}
        placeholder="Title"
        className="input input-bordered w-full mb-3"
      />
      <textarea
        {...register("description", { required: true })}
        placeholder="Description"
        className="textarea textarea-bordered w-full mb-3"
      />
      <select
        {...register("category")}
        className="select select-bordered w-full mb-3"
      >
        <option value="">Select Category</option>
        <option value="road">Road Problem</option>
        <option value="electricity">Electricity</option>
        <option value="water">Water Supply</option>
        <option value="garbage">Garbage</option>
        <option value="streetlight">Street Light</option>
      </select>
      <input
        type="text"
        value={locations.city}
        readOnly
        className="input input-bordered w-full mb-3 bg-gray-100"
      />
      <select
        {...register("area", { required: true })}
        className="select select-bordered w-full mb-3"
      >
        <option value="">Select Area</option>
        {locations.areas.map((area) => (
          <option key={area} value={area}>
            {area}
          </option>
        ))}
      </select>

      <input
        type="file"
        {...register("image", { required: true })}
        className="file-input file-input-bordered w-full mb-4"
        accept="image/*"
      />
      <button className="btn btn-primary w-full">Submit</button>
    </form>
  );
};

export default ReportIssue;
