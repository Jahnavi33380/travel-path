import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { Input } from '../components/ui/input'
import { PROMPT, SelectModeOfTransport, SelectTravelerList } from '@/constants/options';
import { Button } from '@/components/ui/button';
import './createTrip.css';
import { doc, setDoc } from "firebase/firestore";
import { db } from '@/service/firebaseConfig';
import { sendMessage } from "@/service/modal";
import { chatSession } from '@/service/modal';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';





function CreateTrip() {
    const [place, setPlace] = useState();

    const [formData, setFormData] = useState({});
    const [openDailog, setOpenDailog] = useState(false);

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const handleInputChange = (name, value) => {

        setFormData({
            ...formData,
            [name]: value
        })
    }

    useEffect(() => {
        console.log(formData);
    }, [formData])

    const login = useGoogleLogin({
        onSuccess: (codeResp) => {
            console.log(codeResp),
            GetUserProfile(codeResp);
        },    
        onError: (error) => console.log(error)
    })

    const OnGenerateClick = async () => {

        const user = localStorage.getItem('user');
        if (!user) {
            setOpenDailog(true);
            return;
        }

        if ((formData?.noOfDays > 5 && !formData?.location) || !formData?.noOfDays || !formData?.noOfPeople || !formData?.transport) {
            return;
        }
        setLoading(true);
        const FINAL_PROMPT = PROMPT
            .replace('{location}', formData?.location.label)
            .replace('{noOfDays}', formData?.noOfDays)
            .replace('{noOfPeople}', formData?.noOfPeople)
            .replace('{transport}', formData?.transport)
            .replace('{noOfDays}', formData?.noOfDays)

        // console.log(FINAL_PROMPT);

        const result = await chatSession.sendMessage(FINAL_PROMPT);
        console.log("--", result?.response.text());
        setLoading(false);
        SaveTrip(result?.response.text()) 
    }

    const SaveTrip = async (TripData) => {
        setLoading(true);
        const user = JSON.parse(localStorage.getItem('user'));
        const docId = Date.now().toString()
        await setDoc(doc(db, "Trips", docId), {
            userSelection: formData,
            tripData: JSON.parse(TripData),
            userEmail: user?.email,
            id: docId
        });
        setLoading(false);
        navigate('/view-trip/'+docId)
    }

    const GetUserProfile = (tokenInfo) => {
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`, {
            headers: {
                Authorization: `Bearer ${tokenInfo?.access_token}`,
                Accept: 'Application/json' 
            }
        }).then((resp) => {
            console.log(resp);
            localStorage.setItem('user', JSON.stringify(resp.data));
            setOpenDailog(false);
            OnGenerateClick();
        })
    }
    return (
        <div className='create-trip-container'>
            <div className='create-trip-form'>
                <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
                    <h2 className='font-bold text-3xl'>Tell us your travel preferences 🧳</h2>
                    <p className='mt-3 text-gray-500 text-xl'>Just Provide us some basic information and our Travel Planner will generate itinerary for you!</p>

                    <div className=' mt-20 flex flex-col gap-10'>
                        <div>
                            <h2 className='text-xl my-3 font-medium'>Current Location ?</h2>
                            <GooglePlacesAutocomplete
                                apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                                selectProps={{
                                    place,
                                    onChange: (v) => { setPlace(v); handleInputChange('location', v) }
                                }}
                            />
                        </div>

                        <div>
                            <h2 className='text-xl my-3 font-medium'>How many days are you planning to travel?</h2>
                            <Input placeholder={'Ex.2'} type="number"
                                onChange={(e) => handleInputChange('noOfDays', e.target.value)}
                            />
                        </div>

                    </div>

                    <div>
                        <h2 className='text-xl my-3 font-medium'>Number of People?</h2>
                        <div className='grid grid-cols-3 gap-5 mt-5'>
                            {SelectTravelerList.map((item, index) => (
                                <div key={index}
                                    onClick={() => handleInputChange('noOfPeople', item.people)}
                                    className={`p-4 border cursor-pointer 
                        rounded-lg hover:shadow-lg
                        ${formData?.noOfPeople == item.people && 'shadow-lg border-black'}
                        `}>
                                    <h2 className='text-4xl'>{item.icon}</h2>
                                    <h2 className='font-bold text-lg'>{item.title}</h2>
                                    <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className='text-xl my-3 font-medium'>Mode of Transport?</h2>
                        <div className='grid grid-cols-3 gap-5 mt-5'>
                            {SelectModeOfTransport.map((item, index) => (
                                <div key={index}
                                    onClick={() => handleInputChange('transport', item.title)}
                                    className={`p-4 border cursor-pointer 
                            rounded-lg hover:shadow-lg
                            ${formData?.transport == item.title && 'shadow-lg border-black'}
                            `}>
                                    <h2 className='text-4xl'>{item.icon}</h2>
                                    <h2 className='font-bold text-lg'>{item.title}</h2>
                                    <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='my-10 justify-end flex'>
                        <Button
                            disabled={loading}
                            onClick={OnGenerateClick}>
                            {loading ?
                                <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' /> : 'Generate Itinerary'
                            }
                        </Button>

                    </div>

                    <Dialog open={openDailog}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogDescription>
                                    <img src="./logo.svg" alt="" />
                                    <h2 className='font-bold text-lg mt-7'>Sign In with Google</h2>
                                    <p>Sign In to Travel Path using Google Authentication</p>

                                    <Button
                                        onClick={login} className='w-full mt-5 flex gap-4 items-center'>
                                        <FcGoogle className='h-7 w-7' />
                                        Sign In with Google
                                    </Button>

                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
 
                </div>
            </div>
        </div>


    )
}

export default CreateTrip