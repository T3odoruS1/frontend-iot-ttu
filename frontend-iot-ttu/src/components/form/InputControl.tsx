import React, {FC, InputHTMLAttributes} from "react";
import {FormControl, FormFloating, FormLabel} from "react-bootstrap";
import root from "../../routes/Root";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    error?: string;
    register?: any;
    wrapperClass?: string;
    as?: string;
    rows?: number;
    markAsMandatory?: boolean;
}

const InputControl: FC<InputProps> =
    ({
         register,
         name,
         error,
         label,
         wrapperClass,
         as,
         rows,
         markAsMandatory = false,
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
                    as={as}
                    rows={rows}
                    {...register(name)}
                    {...rest}
                />
                <FormLabel htmlFor={name}>{label}
                    {error && <span className="text-danger"> {error}</span>}{markAsMandatory && <span className="text-danger"> *</span>}
                </FormLabel>

            </FormFloating>
        );
    };

export default InputControl;


