import React, {useState, useEffect, useRef, ReactElement, ReactNode, FC, FunctionComponent} from 'react';

interface PopupProps {
    trigger: ReactElement;
    content: ReactElement<{ close: () => void }>;
    cname?:string
}

/*
Trigger element should be wrapped with div
 */
const Popup: React.FC<PopupProps> = ({
                                         trigger,
                                         content,
                                         cname
                                     }) => {
    const [isOpen, setIsOpen] = useState(false);
    const popupRef = useRef<HTMLDivElement>(null);

    const openPopup = () => setIsOpen(true);
    const closePopup = () => {
        setIsOpen(false);
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (popupRef.current && popupRef.current.isEqualNode(event.target as Node)) {
            closePopup();
        }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            closePopup();
        }
    };

    const renderedContent = React.cloneElement(content, {close: closePopup})


    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleEscapeKey);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscapeKey);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, [isOpen]);



    return (
        <div className={"p-0"}>
            <div onClick={openPopup} className={`p-0 ${cname}`}>
                {trigger}
            </div>
            {isOpen && (
                <div className="popup" ref={popupRef}>
                    <div className="popup-content">
                        {renderedContent}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Popup;
