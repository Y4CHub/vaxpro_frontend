import { Card, Input, Typography } from "@material-tailwind/react";
import { TextField } from "@mui/material";
import axios from "../axios";
import { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";

const ChildRegistrationForm = ({ register, errors,errTouched }) => {
  const [wards, setWards] = useState([]);
  const [children, setChildren] = useState([]);
  const [cardNoInput, setCardNoInput] = useState("");
  const router = useRouter();
  const [selectedCard, setSelectedCard] = useState();
  const {watch,touchedFields,setError,trigger} = errTouched;

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

  


  const handleCardNoChange = async (e) => {
    const currentCardNo = e.target.value.trim();

    if (currentCardNo.length == 10) {
      const result = await trigger('card_no');
      if (result) {
        try {
          const res = await axios.get(`children?cardNo=${currentCardNo}`);
          if (res.status === 200) {
            if (res.data.length === 1 && res.data[0].card_no === currentCardNo) {
              setError('card_no', {
                type: 'manual',
                message: 'This child already exists'
              });
            } else {
              clearErrors('card_no');
            }
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    }
  };
  

  return (
    <Card
      color="transparent "
      className="items-center sm:w-full "
      shadow={false}
    >
      <Typography className="4xs:text-sm  " variant="h4" color="blue-gray">
        Register Child
      </Typography>

      <div className="mt-8 mb-2 items-center sm:w-1/3  justify-center  max-w-screen-lg  ">
        <div className="mb-1 flex  2xs:w-72 xs:w-full rounded-md 2xs:p-4 3xs:w-56 4xs:w-32 2xs:ml-0 xs:ml-0 flex-col gap-6">
          {/* {selectedCard && (
           <Link
           href={{
             pathname: '/childdetails',
             query: { cardNo: selectedCard.card_no, birth_date: selectedCard.birth_date },
           }}
         >
           Go to Child
         </Link>
          )} */}

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
              onChange:handleCardNoChange
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
            {...register("middle_name")}
            className="   sm:w-56 lg:w-full "
          />
          {errors.middle_name && (
            <span className="text-red-900 text-sm font-mono ">
              {errors.middle_name.message}
            </span>
          )}

          <Input
            label="Last Name"
            {...register("last_name")}
            className="  sm:w-56 lg:w-full "
          />
          {errors.last_name && (
            <span className="text-red-900 text-sm font-mono ">
              {errors.last_name.message}
            </span>
          )}

          <Input
            label="Birth Date"
            type="date"
            {...register("birth_date")}
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
            {...register("house_no")}
            className="  sm:w-56 lg:w-full "
          />
          {errors.house_no && (
            <span className="text-red-900 text-sm font-mono ">
              {errors.house_no.message}
            </span>
          )}

          <Autocomplete
            className="  sm:w-56 lg:w-full "
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
                {...register("ward_id")}
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
    </Card>
  );
};

export default ChildRegistrationForm;
