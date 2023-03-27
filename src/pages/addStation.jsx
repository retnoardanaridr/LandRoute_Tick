import React, { useContext, useState } from "react";
import { Alert, Button } from 'flowbite-react';
import { useMutation } from "react-query";
import { UserContext } from "../contexts/userContext";
import { API } from '../config/api';

export default function AddStation() {
    const [message, setMessage] = useState;
    const [state, _] = useContext(UserContext)
    const [form, setForm] = useState({
        kota: "",
        name: ""
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();

            const response = await API.POST('/station', form, {
                headers: {
                    Authorization: `Bearer ${state.user.token}`
                }
            })
            const alert = (
                <Alert color="success" className="font-medium">
                    Success
                </Alert>
            )
            setMessage(alert)
            console.log(response)
        } catch (error) {
            const alert = (
                <Alert color="failure" className="font-medium">
                    Failed
                </Alert>
            )
            setMessage(alert)
            console.log(error)
        }
    })

    return (
        <>
            <div className="container mx-auto flex justify-center">
                <div className="w-3/4">
                    <h3 className="font-bold mb-5 mt-4 text-3xl">Add Station</h3>
                    {message && message}
                    <form className="flex flex-col gap-4 mt-5">
                        <div>
                            <input placeholder="City" onChange={handleChange} type="text" name="kota" className="block w-full text-sm focus:ring-red-300 focus:border-red-500 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" />
                        </div>
                        <div>
                            <input placeholder="Name Station" onChange={handleChange} type="text" name="name" className="block w-full text-sm focus:ring-red-300 focus:border-red-500 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" />
                        </div>
                        <div className="flex justify-center items-center">
                            <Button color="success" className="w-full" type="submit" onClick={(e) => handleSubmit.mutate(e)}>Save</Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}