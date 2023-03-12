import React from "react";
import { useForm } from "react-hook-form";
import { data } from "../../data/dataDropDown";
import CheckBoxHook from "../checkbox/CheckBoxHook";
import DropDownHook from "../dropdown/DropDownHook";
import InputHook from "../inputs/InputHook";
import RadioHook from "../radio/RadioHook";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  username: yup.string().required("Please enter your username"),
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Please enter your email address"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
      message: "Password must contain 1 uppercase, 1 lowercase and 1 number",
    })
    .required(),
  gender: yup
    .string()
    .required("Please select your gender")
    .oneOf(["male", "female"], "You must select male or female"),
  job: yup
    .string()
    .required("Please select your job")
    .oneOf(data.map((item) => item.value)),
  terms: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions"),
});

const RegisterHook = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    watch,
    formState: { errors, isValid, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      gender: "",
    },
  });
  const onSubmitHandler = (data) => {
    if (!isValid) return;

    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(data);
        resolve();
        reset({
          username: "",
          email: "",
          password: "",
          gender: "",
          job: "",
          terms: false,
        });
      }, 500);
    });
  };
  // console.log(errors);

  const watchGender = watch("gender");

  return (
    <form action="" autoComplete="off" onSubmit={handleSubmit(onSubmitHandler)}>
      <div className="max-w-[300px] mx-auto my-10">
        <div className="flex flex-col gap-2 mb-5">
          <label htmlFor="username" className="cursor-pointer">
            Username
          </label>
          <InputHook
            control={control}
            name="username"
            placeholder="Enter You Username"
            id="username"
            type="text"
          ></InputHook>

          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2 mb-5">
          <label htmlFor="email" className="cursor-pointer">
            Email
          </label>
          <InputHook
            control={control}
            name="email"
            placeholder="Enter You Email"
            id="email"
            type="email"
          ></InputHook>
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2 mb-5">
          <label htmlFor="password" className="cursor-pointer">
            Password
          </label>
          <InputHook
            control={control}
            name="password"
            placeholder="Enter You Password"
            id="password"
            type="password"
          ></InputHook>

          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2 mb-5">
          <label htmlFor="" className="cursor-pointer">
            Gender
          </label>
          <div className="flex items-center gap-5 ml-1">
            <div className="flex items-center gap-x-3">
              <RadioHook
                control={control}
                name="gender"
                value="male"
                id="male"
                checked={watchGender === "male"}
              ></RadioHook>
              <label htmlFor="male">Male</label>
            </div>
            <div className="flex items-center gap-x-3">
              <RadioHook
                control={control}
                name="gender"
                value="female"
                id="female"
                checked={watchGender === "female"}
              ></RadioHook>
              <label htmlFor="female">Female</label>
            </div>
          </div>
          {errors.gender && (
            <p className="text-red-500 text-sm">{errors.gender.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2 mb-5">
          <label htmlFor="" className="cursor-pointer">
            Are you
          </label>
          <DropDownHook
            control={control}
            setValue={setValue}
            name="job"
            data={data}
            dropDownLabel="Select your job"
          ></DropDownHook>
          {errors.job && (
            <p className="text-red-500 text-sm">{errors.job.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-3 mb-5">
          <CheckBoxHook
            control={control}
            text="I accept the terms and conditions"
            name="terms"
            id="terms"
            value="false"
          ></CheckBoxHook>
          {errors.terms && (
            <p className="text-red-500 text-sm">{errors.terms.message}</p>
          )}
        </div>

        <div>
          <button
            className={`bg-blue-500 w-full text-white p-5 rounded-lg mt-5 font-semibold op ${
              isSubmitting ? "opacity-50" : ""
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="mx-auto w-5 h-5 rounded-full border-2 border-t-2 border-white border-t-transparent animate-spin"></div>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default RegisterHook;
