import { useForm } from "react-hook-form";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";


function LoginPage() {

    const { 
        register, 
        handleSubmit,
        formState: {errors},
    } = useForm();

    const {signin, errors: loginErrors, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const onSubmit = handleSubmit((data) =>{
        signin(data);
    });

    useEffect(() => {
        if (isAuthenticated) navigate("/tasks");
      }, [isAuthenticated]);

    return(
        <div className="h-[calc(100vh-100px)] flex items-center justify-center">
            <div className="bg bg-zinc-800 max-w-md w-full p-10 rounded-md">
            {loginErrors.map((error, i) => (
          //<Message message={error} key={i} />
          <div className="bg-red-500 p-2 text-white my-2" key={i}>{error}</div>
        ))}
            <h1 className="text-2xl font-bold">Login</h1>
            
            <form onSubmit={handleSubmit(onSubmit)}>


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
            type="submit">Login</button>
            </form>
            <p className="flex gap-x-2 justify-between">
                Don't have an account? <Link to="/register" className="text-sky-500">Sign up</Link>
            </p>

            </div>
        </div>

    )
}

export default LoginPage;
