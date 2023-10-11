'use client';

import React, {useCallback, useState} from 'react';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form';
import useLoginModal from 'hooks/useLoginModal';
import useRegisterModal from 'hooks/useRegisterModal';
import Modal from './Modal';
import ModalHeader from 'components/ModalHeader';
import Input from 'components/inputs/Input';
import Button from 'components/Button';
import {toast} from 'react-hot-toast';
import { AiFillGithub } from 'react-icons/ai';
import {FcGoogle} from "react-icons/fc";
import {useRouter} from 'next/navigation';

const LoginModal = () => {
    const router = useRouter();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoaded, setIsLoaded] = useState(false);

    const {register, handleSubmit, formState: {errors}
    } = useForm<FieldValues>({defaultValues: {
                                 email: '',
                                 password: ''}});

    const onSubmit : SubmitHandler<FieldValues> = (data) => {
        setIsLoaded(true);

        signIn('credentials', {
            ...data,
            redirect: false,
        }).then((callback) => {
            setIsLoaded(false);

            if (callback?.ok) {
                toast.success('Logged In');
                router.refresh();
                loginModal.onClose();
            }

            if (callback?.error) {
                toast.error(callback.error);
            }
        })
    };

    const toggle = useCallback(() => {
        loginModal.onClose();
        registerModal.onOpen();
    }, [loginModal, registerModal])

    const bodyContent = (
        <div 
            className="
            flex
            flex-col
            gap-4
            ">
                <ModalHeader title="Welcome back" subtitle="Login to your account!"/>
                <Input 
                    id="email"
                    label="Email"
                    disabled={isLoaded}
                    register={register}
                    errors={errors}
                    required
                />
                
                <Input 
                    id="password"
                    type="password"
                    label="Password"
                    disabled={isLoaded}
                    register={register}
                    errors={errors}
                    required
                />
        </div>
    );

    const footerContent = (
        <div className="
            flex
            flex-col
            gap-4
            mt-3">
            <div className="relative flex py-5 items-center">
                <div className="flex-grow border-t border-gray-400"></div>
                    <span className="flex-shrink mx-4 text-gray-400">or</span>
                <div className="flex-grow border-t border-gray-400"></div>
            </div>
            <Button
                outline
                label="Continue with Google"
                icon={FcGoogle}
                onClick={()=>signIn('google')}
            />
            <Button
                outline
                label="Continue with Github"
                icon={AiFillGithub}
                onClick={()=>signIn('github')}
            />
            <div className="
                    text-neutral-500
                    text-center
                    mt-4
                    font-light">
                <div className="justify-center flex flex-row items-center gap-2">
                    <div>
                        Don't have an account yet?
                    </div> 
                    <div onClick={toggle} 
                        className="
                        text-neutral-800
                        cursor-pointer
                        hover:underline">
                        Register
                    </div>
                </div>
            </div>
        </div>
    );

  return (
    <Modal 
        disabled={isLoaded}
        isOpen = {loginModal.isOpen}
        title="Login"
        actionLabel="Continue"
        onClose={loginModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body = {bodyContent}
        footer = {footerContent}
    />
  )
}


export default LoginModal;