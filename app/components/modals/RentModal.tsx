'use client';
import useRentModal from "@/hooks/useRentModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form';
import ModalHeader from "../ModalHeader";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import CountrySelect from "../inputs/CountrySelect";
import Map from '../Map';
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


// Create enum
enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5
}

const RentModal = () => {
    const router = useRouter();
    const rentModal = useRentModal();
    const [step, setStep] = useState(STEPS.CATEGORY);
    const [isLoaded, setIsLoaded] = useState(false);
    // Inputs
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {errors},
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: ''
        }
    });

    const category = watch('category');
    const location = watch('location');
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathroomCount = watch('bathroomCount');
    const imageSrc = watch('imageSrc');

    const Map = useMemo(()=> dynamic(()=> import('../Map'), {
        ssr: false
    }), [location])

    // Modify setValue to reset the page
    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        })
    }

    const onBack = () => {
        setStep((value) => value - 1)
    };

    const onNext = () => {
        setStep((value) => value + 1)
    };

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.PRICE) {
            return onNext();
        }
        setIsLoaded(true);
        axios.post('api/listings', data)
        .then (()=> {
            toast.success('Listing Created')
            router.refresh();
            reset();
            setStep(STEPS.CATEGORY);
            rentModal.onClose();
        })
        .catch(()=> {
            toast.error('Something went wrong!');
        })
        .finally(()=> {
            setIsLoaded(false);
        })
    }

    const actionLabel = useMemo(()=> {
        if (step === STEPS.PRICE) {
            return 'Create';
        }
        return 'Next';
    },[step])
    
    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined;
        }
        return 'Back'
    }, [step])
    // CATEGORY
    let bodyContent = (
        <div className="flex flex-col gap-8">
            <ModalHeader title="Which of these best describes your place" subtitle="Pick a category"/>
            <div className="
                grid
                grid-cols-2
                md:grid-cols-2
                gap-3
                max-h-[50vh]
                overflow-y-auto">
                    {categories.map((item)=>(
                        <div key={item.label} className="col-span-1">
                            <CategoryInput 
                                onClick={(category)=> setCustomValue('category', category)}
                                selected={category === item.label}
                                label={item.label}
                                icon={item.icon}/>
                        </div>
                    ))}
            </div>
        </div>
    )
    //Location
    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className="
                flex
                flex-col
                gap-8">
                <ModalHeader title="Where is your place located" subtitle="Help guests to find you!"/>
                <CountrySelect 
                    value={location}
                    onChange={(value)=> setCustomValue('location', value)}/>
                <Map center={location?.latlng}/>
            </div>
        )
    }
    // INFO
    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="
                flex
                flex-col
                gap-8">
                <ModalHeader title="Share some basics about your place" subtitle="What amenities do you have?"/>
                <Counter
                    title="Guests"
                    subtitle="How many guests allowed"
                    value={guestCount}
                    onChange={(value) => setCustomValue('guestCount', value)}/>
                <hr/>
                <Counter
                    title="Rooms"
                    subtitle="How many rooms"
                    value={roomCount}
                    onChange={(value) => setCustomValue('roomCount', value)}/>
                <hr/>
                <Counter
                    title="Bathrooms"
                    subtitle="How many bathrooms"
                    value={bathroomCount}
                    onChange={(value) => setCustomValue('bathroomCount', value)}/>
            </div>
        )
    }
    // Images
    if (step === STEPS.IMAGES) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <ModalHeader title="Add a photo of your place" subtitle="Show guests what your place looks like!"/>
                <ImageUpload
                    value={imageSrc}
                    onChange={(value) => setCustomValue('imageSrc', value)}/>
            </div>
        )
    }
    // DESCRIPTION
    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <ModalHeader title="How would you describe your place" subtitle="Short and sweet works best!"/>
                <Input 
                    id="title"
                    label="Title"
                    disabled={isLoaded}
                    register={register}
                    errors={errors}
                    required/>
                    <hr/>
                <Input 
                    id="description"
                    label="Description"
                    disabled={isLoaded}
                    register={register}
                    errors={errors}
                    required/>
            </div>
        )
    }
    // PRICE
    if (step === STEPS.PRICE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <ModalHeader title="Now, set your price" subtitle="How much do you change per night?"/>
                <Input 
                    id="price"
                    label="Price"
                    type='number'
                    formatPrice
                    disabled={isLoaded}
                    register={register}
                    errors={errors}
                    required/>
            </div>
        )
    }

    return (
        <Modal 
        isOpen={rentModal.isOpen}
        title="Rent your home"
        actionLabel={actionLabel}
        onClose={rentModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
        body={bodyContent}
        />
    )
}

export default RentModal