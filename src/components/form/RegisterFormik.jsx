import React from "react";
import { Formik, Form, Field, useField } from "formik";
import * as yup from "yup";
import InputFormik from "../inputs/InputFormik";
import RadioFormik from "../radio/RadioFormik";
import CheckBoxFormik from "../checkbox/CheckBoxFormik";
import DropDownFormik from "../dropdown/DropDownFormik";
import { data } from "../../data/dataDropDown";

const initialValuesRegisterForm = {
  username: "",
  email: "",
  password: "",
  gender: "",
  job: "",
  terms: false,
};
const validate = yup.object({
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
    .required("Please enter your password"),
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

const RegisterFormik = () => {
  const onSubmitHandler = (values, { setSubmitting, resetForm }) => {
    setTimeout(() => {
      console.log(JSON.stringify(values, null, 2));
      setSubmitting(false);
      resetForm();
    }, 400);
  };

  return (
    <Formik
      initialValues={initialValuesRegisterForm}
      validationSchema={validate}
      onSubmit={onSubmitHandler}
    >
      {(formik) => {
        const watchGender = formik.values.gender;
        {
          {
            /* console.log(formik); */
          }
        }
        return (
          <form
            className="max-w-[300px] mx-auto my-10"
            action=""
            autoComplete="off"
            onSubmit={formik.handleSubmit}
          >
            <InputFormik
              name="username"
              placeholder="Enter You Username..."
              id="username"
              type="text"
              label="Username"
            ></InputFormik>

            <InputFormik
              name="email"
              placeholder="Enter You Email Address..."
              id="email"
              type="email"
              label="Email Address"
            ></InputFormik>

            <InputFormik
              name="password"
              placeholder="Enter You Password..."
              id="password"
              type="password"
              label="Password"
            ></InputFormik>

            <div className="flex flex-col gap-2 mb-5">
              <label htmlFor="" className="cursor-pointer">
                Gender
              </label>
              <div className="flex items-center gap-5 ml-1">
                <RadioFormik
                  name="gender"
                  value="male"
                  id="male"
                  checked={watchGender === "male"}
                  label="Male"
                ></RadioFormik>

                <RadioFormik
                  name="gender"
                  value="female"
                  id="female"
                  checked={watchGender === "female"}
                  label="Female"
                ></RadioFormik>
              </div>
              {formik.touched.gender && formik.errors.gender && (
                <p className="text-red-500 text-sm">{formik.errors.gender}</p>
              )}
            </div>

            <DropDownFormik
              name="job"
              data={data}
              dropDownLabel="Select your job"
              id="job"
              setValue={formik.setFieldValue}
            ></DropDownFormik>

            <CheckBoxFormik
              text="I accept the terms and conditions"
              name="terms"
              id="terms"
              value="false"
            ></CheckBoxFormik>
            <div>
              <button
                className={`bg-blue-500 w-full text-white p-5 rounded-lg mt-5 font-semibold`}
                type="submit"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? (
                  <div className="mx-auto w-5 h-5 rounded-full border-2 border-t-2 border-white border-t-transparent animate-spin"></div>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default RegisterFormik;
