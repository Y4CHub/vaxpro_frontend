"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Input, Select, Option } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import axios from "../axios";
import Autocomplete from "@mui/material/Autocomplete";
import { Controller } from "react-hook-form";
import clsx from "clsx";

const InfoUpdateModal = ({
  openUpdateInfo,
  handleClickCloseUpdateInfo,
  childDetails,
  notifyAddVaccine,
  birthDate,
  cardNo,
}) => {
  const {
    register,
    handleSubmit,
    clearErrors,
    validate,
    setValue,
    watch,
    trigger,
    setError,
    formState: { errors, touchedFields, isValid, isSubmitted },
    control,
  } = useForm();

  const [childData, setChildData] = useState([]);
  const [parentData, setParentData] = useState([]);
  const [addressData, setAddressData] = useState([]);

  const [isFocused, setIsFocused] = useState(false);

  const [wards, setWards] = useState([]);

  const handleWardChange = (event) => {
    const searchQuery = event.target.value;
    if (searchQuery) {
      axios.get(`wards?searchQuery=${searchQuery}`).then((res) => {
        if (res.status === 200) {
          setWards(res.data);
        }
      });
    }
  };

  const validateDate = (value) => {
    const selectedDate = new Date(value);
    const today = new Date();
    selectedDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0); // Set to midnight to compare only the date part
    return selectedDate <= today || "Date should not exceed today's date";
  };

  const extractedChildData = childDetails.map((child) => ({
    card_no: child.card_no,
    firstname: child.firstname,
    middlename: child.middlename,
    surname: child.surname,
    facility_id: child.facility_id,
    ward_id: child.ward_id,
    house_no: child.house_no,
    date_of_birth: child.date_of_birth,
    modified_by: child.modified_by,
    created_at: child.created_at,
    updated_at: child.updated_at,
  }));

  const extractedParentData = childDetails.flatMap((child) =>
    child.parents_guardians.map((parent) => ({
      nida_id: parent.nida_id,
      firstname: parent.firstname,
      middlename: parent.middlename,
      lastname: parent.lastname,
      user_id: parent.user_id,
      created_at: parent.created_at,
      updated_at: parent.updated_at,
      relationship_with_child: parent.pivot.relationship_with_child,
      contacts: parent.user.contacts,
    }))
  );

  const extractedAddressData = childDetails.map((child) => ({
    ward_name: child.ward.ward_name,
    district_name: child.ward.district.district_name,
    region_name: child.ward.district.region.region_name,
  }));

  const handleNidaChange = async (e) => {
    const nidaNo = e.target.value;
    try {
      if (nidaNo.length === 20) {
        const result = await trigger("nida_id");
        if (result) {
          const parentRes = await axios.get(`parents?nidaNo=${e.target.value}`);
          console.log(parentRes);

          if (parentRes.status === 200 && parentRes.data.length > 0) {
            const parentData = parentRes.data[0];

            setAvailableParent({ status: true, parent: parentData });
          }
        }
      }
      // setAvailableParent({})
    } catch (err) {
      console.log(err);
    }
  };

  console.log(extractedChildData);

  return (
    <Dialog
      open={openUpdateInfo}
      className="-m-4"
      onClose={handleClickCloseUpdateInfo}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" className="">
        {"Update Child Information:"}
      </DialogTitle>
      <DialogContent className="scrollbar-hidden">
        <DialogContentText id="alert-dialog-description">
          <div className="flex gap-6">
            <div className="flex flex-col gap-3">
              <Input
                label="Card No"
                {...register("card_no", {
                  required: "This field is required",
                  maxLength: {
                    value: 10,
                    message: "Card no has to be ten numbers only",
                  },
                  minLength: {
                    value: 10,
                    message: "Card no has to be ten numbers only",
                  },
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Please enter valid number",
                  },
                })}
                className=" sm:w-56  lg:w-full "
              />
              {errors.card_no && (
                <span className="text-red-900 text-sm font-mono ">
                  {errors.card_no.message}
                </span>
              )}

              <Input
                label="First Name"
                {...register("first_name", {
                  required: "This field is required",
                })}
                className="  sm:w-56  lg:w-full "
              />
              {errors.first_name && (
                <span className="text-red-900 text-sm font-mono ">
                  {errors.first_name.message}
                </span>
              )}

              <Input
                label="Middle Name"
                {...register("middle_name", {
                  required: "This field is required",
                })}
                className="   sm:w-56 lg:w-full "
              />
              {errors.middle_name && (
                <span className="text-red-900 text-sm font-mono ">
                  {errors.middle_name.message}
                </span>
              )}

              <Input
                label="Last Name"
                {...register("last_name", {
                  required: "This field is required",
                })}
                className="  sm:w-56 lg:w-full "
              />
              {errors.last_name && (
                <span className="text-red-900 text-sm font-mono ">
                  {errors.last_name.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <Input
                label="Birth Date"
                type="date"
                {...register("birth_date", {
                  required: "This field is required",
                  validate: validateDate,
                })}
                className="  sm:w-56 lg:w-full "
              />
              {errors.birth_date && (
                <span className="text-red-900 text-sm font-mono ">
                  {errors.birth_date.message}
                </span>
              )}

              <Input
                label="House No:"
                type="number"
                {...register("house_no", {
                  required: "This field is required",
                })}
                className="  sm:w-56 lg:w-full "
              />
              {errors.house_no && (
                <span className="text-red-900 text-sm font-mono ">
                  {errors.house_no.message}
                </span>
              )}

              <Autocomplete
                className="  sm:w-56  lg:w-full "
                options={wards}
                getOptionLabel={(option) =>
                  `${option.ward_name}-${option.district.district_name}-${option.id}`
                }
                onInputChange={handleWardChange}
                renderInput={(params) => (
                  <TextField
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        height: "40px",
                        borderRadius: "6px",
                        "& .MuiOutlinedInput-input": {
                          padding: "10px 14px",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "black",
                        },
                      },
                      "& .MuiInputLabel-root": {
                        "&.Mui-focused": {
                          color: "black",
                        },
                      },
                    }}
                    size="small"
                    {...params}
                    label="Ward"
                    {...register("ward_id", {
                      required: "This field is required",
                    })}
                  />
                )}
                getOptionKey={(option) => option.id}
              />
              {errors.ward_id && (
                <span className="text-red-900 text-sm font-mono ">
                  {errors.ward_id.message}
                </span>
              )}
            </div>
          </div>
        </DialogContentText>
      </DialogContent>
      <DialogTitle id="alert-dialog-title" className="">
        {"Update Parent Information:"}
      </DialogTitle>
      <DialogContent className="scrollbar-hidden">
        <DialogContentText id="alert-dialog-description">
          <div className="flex gap-6 ">
            <div className="flex flex-col gap-3">
              <Input
                label="First Name"
                {...register("par_first_name", {
                  required: "This field is required",
                })}
                className="  md:w-56 lg:w-full  sm:w-64 "
              />
              {errors.par_first_name && (
                <p className="text-red-900 text-xs font-monte">
                  {errors.par_first_name.message}
                </p>
              )}

              <Input
                label="Middle Name"
                {...register("par_middle_name", {
                  required: "This field is required",
                })}
                className="  md:w-56 lg:w-full  sm:w-64 "
              />
              {errors.par_middle_name && (
                <p className="text-red-900 text-xs font-monte">
                  {errors.par_middle_name.message}
                </p>
              )}

              <Input
                label="Last Name"
                {...register("par_last_name", {
                  required: "This field is required",
                })}
                className="  md:w-56 lg:w-full  sm:w-64  "
              />
              {errors.par_last_name && (
                <p className="text-red-900 text-xs font-monte">
                  {errors.par_last_name.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <Input
                label="Nida ID:"
                {...register("nida_id", {
                  required: "This field is required",
                  maxLength: {
                    value: 20,
                    message: "Nida number can not have more than 20 numbers",
                  },
                  minLength: {
                    value: 0,
                    message: "Nida number can not have less than 20 numbers",
                  },
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Please enter valid Nida number",
                  },
                  onChange: handleNidaChange,
                })}
                className="  md:w-56 lg:w-full sm:w-64 "
              />
              {errors.nida_id && (
                <p className="text-red-900 text-xs font-monte">
                  {errors.nida_id.message}
                </p>
              )}

              <div>
                <div className="flex font-monte-1 relative">
                  <span
                    className={clsx(
                      " absolute inset-y-0 left-0 px-2 text-black flex items-center rounded bg-gray-300",
                      {
                        "border-r-2 border-black": isFocused,
                        "border-r border-gray-500": !isFocused,
                      }
                    )}
                  >
                    +255
                  </span>

                  <Input
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    onFocus={() => setIsFocused(true)}
                    autoComplete="off"
                    className="text-black font-monte-1 pl-16 border  focus:border-2  !border-t-blue-gray-200 focus:!border-t-gray-900"
                    size="lg"
                    placeholder="Contacts"
                    {...register("contact", {
                      onBlur: () => setIsFocused(false),
                      required: "This field is required",
                      maxLength: {
                        value: 9,
                        message: "Phone number should be exactly 9 digits",
                      },
                      minLength: {
                        value: 9,
                        message: "Phone number should be exactly 9 digits",
                      },
                      pattern: {
                        value: /^[67][123456789][0-9]+$/,
                        message: "Please enter valid number",
                      },
                    })}
                  />
                </div>
                {errors.contact && (
                  <p className="text-red-900 text-xs font-monte">
                    {errors.contact.message}
                  </p>
                )}
              </div>

              <Controller
                control={control}
                rules={{ required: "This field is required" }}
                name="relation"
                render={({
                  field: { onBlur, value, onChange },
                  fieldState: { error },
                }) => (
                  <div>
                    <Select
                      onChange={onChange}
                      onBlur={onBlur}
                      selected={value}
                      value={value}
                      label="Relation with Child"
                      className=" sm:w-64 pl-3 lg:w-full rounded-md  md:w-56"
                      animate={{
                        mount: { y: 0 },
                        unmount: { y: 25 },
                      }}
                    >
                      <Option value="Mother">Mother</Option>
                      <Option value="Father">Father</Option>
                      <Option value="Relative">Relative</Option>
                    </Select>
                    {error && (
                      <p className="text-red-900 text-xs font-monte">
                        {error.message}
                      </p>
                    )}{" "}
                  </div>
                )}
              />
              {isSubmitted && !isValid && (
                <p className="text-red-900 text-xs font-monte">
                  Please make sure there are no errors in child form and parent
                  form
                </p>
              )}
            </div>
          </div>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default InfoUpdateModal;
