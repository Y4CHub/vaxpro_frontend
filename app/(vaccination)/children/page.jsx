"use client";
import ChildRegistrationForm from "@/components/ChildForm";
import ParentGuardianForm from "@/components/ParentGuardianForm";
import axios from "../../../axios";
import { useForm } from "react-hook-form";
import globalUser from "@/store/user";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Children = () => {

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
        control
    } = useForm();
    const loggedInUser = globalUser((state) => state.loggedInUser);
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const submitFunction = (data) => {
        function getDaysDifference(startDate, endDate) {
            const oneDay = 24 * 60 * 60 * 1000; // Milliseconds in one day
            const start = new Date(startDate);
            const end = new Date(endDate);
            const diffDays = Math.round((end - start) / oneDay);
            return diffDays;

        }

        const today = new Date().toISOString().split('T')[0];
        const { contacts } = data;

        setLoading(true);

        axios.post(`/parentChildData`, {
            ...data,
            contacts: '+255' + contacts,
            facility_id: loggedInUser?.facility_id,
            modified_by: loggedInUser?.id
        }).then((res) => {
            console.log(res.status);
            if (res.status === 200) {
                const child_date = new Date(res.data.birthDate);
                const daysDifference = getDaysDifference(child_date, today);

                if (daysDifference > 0) {
                    console.log(daysDifference);
                    return router.push(`/children/` + res.data.cardNo);
                }
                setLoading(false);
                return router.push(`/childdetails?cardNo=${res.data.cardNo}`);
            } else {
                console.log(res.data.message);
                setLoading(false);
            }
        }).catch((er) => {
            console.log(er);
            setLoading(false);
        });
    };

    return (
        <form onSubmit={handleSubmit(submitFunction)} method="POST">
            <ChildRegistrationForm
                setValue={setValue}
                register={register}
                errors={errors}
                errTouched={{ setError, control, validate, touchedFields, clearErrors, trigger }}
            />
            <ParentGuardianForm
                loading={loading}
                setValue={setValue}
                register={register}
                errors={errors}
                control={control}
                errTouched={{ isValid, touchedFields, watch, trigger, isSubmitted }}
            />
        </form>
    );
};

export default Children;
