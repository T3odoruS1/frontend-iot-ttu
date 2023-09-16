import React, {FC, InputHTMLAttributes} from "react";
import {FormControl, FormFloating, FormLabel} from "react-bootstrap";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    error?: string;
    register?: any;
    wrapperClass?: string;
}

const InputControl: FC<InputProps> =
    ({
         register,
         name,
         error,
         label,
         wrapperClass,
         ...rest
     }) => {
        return (
            <FormFloating>
                <FormControl
                    style={{
                        borderRadius: "0px"
                    }}
                    id={name}
                    name={name}
                    placeholder={name}
                    {...register(name)}
                    {...rest}
                />
                <FormLabel htmlFor={name}>{label} {error && <span className="text-danger"> {error}</span>}</FormLabel>

            </FormFloating>
        );
    };

export default InputControl;


