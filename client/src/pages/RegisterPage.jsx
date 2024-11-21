import { useForm } from "react-hook-form";
import { useAuth } from "../context/authContext";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {signup, errors: registerErrors, isAuthenticated} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit (async (values) => {
    signup(values);
  });

  return (
    <div className="h-[calc(100vh-100px)] flex items-center justify-center">
    <div className="bg-zinc-800 max-w-md p-10 rounded-md">
      {registerErrors.map((error, i) => (
          //<Message message={error} key={i} />
          <div className="bg-red-500 p-2 text-white" key={i}>{error}</div>
        ))}
        <h1 className="text-3xl font-bold">Register</h1>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Write your name"
            {...register("username", { required: true})}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          />
          {errors.username && (
            <p className="text-red-500">Usuario es requerido</p>
          )}


          <input
            type="email"
            name="email"
            placeholder="youremail@domain.tld"
            {...register("email", { required: true})}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          />
          {errors.email && (
            <p className="text-red-500">Correo electronico es requerido</p>
          )}


          <input
            type="password"
            name="password"
            placeholder="********"
            {...register("password", { required: true})}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          />
          {errors.password && (
            <p className="text-red-500">Contraseña es requerida</p>
          )}


          <button className="bg-sky-500 text-white px-4 py-2 rounded-md my-2"
          type="submit">Submit</button>
        </form>
        <p className="flex gap-x-2 justify-between">
          Already Have an Account?
          <Link className="text-sky-500" to="/login">
            Login
          </Link>
        </p>
    </div>
    </div>
  );
}

export default RegisterPage;
