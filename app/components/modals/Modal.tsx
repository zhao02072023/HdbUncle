'use client';

import { IoMdClose } from "react-icons/io";
import { useEffect, useState, useCallback, useRef } from "react";
import Button from 'components/Button';

interface ModalProps {
  isOpen?:boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?:string;
  body?:React.ReactElement;
  footer?:React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}


const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);
  // Closing Animation
  const handleClose = useCallback(()=> {
    if (disabled) {
      return;
    }
    setShowModal(false);
    setTimeout(() => {
      onClose();
    },300)
  },[disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }
    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }
    secondaryAction();
  },[disabled, secondaryAction]);

  if (!isOpen) {
    return null;
  }

  // Close Modal onClick outside container.
  // let modalRef = useRef<HTMLDivElement>(null);
  // const handleClickOutside = (event: any) => {
  //   if (!modalRef.current || !modalRef.current.contains(event.target)) {
  //     setShowModal(false);
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [handleClickOutside]);

  return (
    <>
      <div
        className="
        justify-center
        items-center
        flex
        overflow-x-hidden
        overflow-y-auto
        fixed
        inset-0
        z-50
        outline-none
        focus:outline-none
        bg-neutral-800/70">
          <div className="
            relative
            w-full
            md:w-2/3
            lg:w-1/2
            xl:w-2/5
            my-6
            mx-auto
            h-full
            lg:h-auto
            md:h-auto">
              {/* CONTENT */}
              <div className={`
                translate
                duration-300
                h-full
                ${showModal ? `translate-y-0` : 'translate-y-full'}
                ${showModal ? `opacity-100` : 'opacity-100'}
                `}>
                  <div className="
                    translate
                    h-full
                    lg:h-auto
                    md:h-auto
                    border-0
                    rounded-lg
                    shadow-lg
                    relative
                    flex
                    flex-col
                    w-full
                    bg-white
                    outline-none
                    focus:outline-none">
                  {/* HEADER */}
                      <div className="
                        flex
                        items-center
                        p-6
                        rounded-full
                        justify-center
                        relative
                        border-b-[1px]">
                          <button onClick={handleClose}
                          className="
                            p-1
                            border-0
                            hover: opacity-70
                            transition
                            absolute
                            left-9">
                              <IoMdClose className="
                                border-[1px]
                                rounded-full
                                hover:shadow-md
                                transition"
                                size={18}/>
                          </button>
                          <div className="
                            text-lg font-semibold">
                              {title}
                          </div>
                      </div>
                      {/* BODY */}
                      <div className="relative p-6 flex-auto">
                        {body}
                      </div>
                      {/* FOOTER */}
                      <div className="flex flex-col gap-2 p-6">
                        <div className="
                          flex
                          flex-row
                          items-center
                          gap-4
                          w-full">
                            {secondaryAction && secondaryActionLabel && (
                              <Button outline onClick={handleSecondaryAction} disabled={disabled}
                              label={secondaryActionLabel}/>
                            )}
                            
                            <Button onClick={handleSubmit} disabled={disabled}
                              label={actionLabel}/>
                        </div>
                        {footer}
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </>

  );
}

export default Modal;