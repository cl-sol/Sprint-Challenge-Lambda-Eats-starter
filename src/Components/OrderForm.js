import React, {useState, useEffect} from "react";
import axios from "axios";
import * as yup from "yup";

//form schema
const formSchema = yup.object().shape({
    name: yup.string().required("Name is a required field"),
    size: yup.string().required("Must select a size"),
    garlic: yup.boolean().defined(),
    mushrooms: yup.boolean().defined(),
    tomatoes: yup.boolean().defined(),
    jalapenos: yup.boolean().defined(),
    specialInstr: yup.string().notRequired()
})

const OrderForm = () => {
    //states
    const [formState, setFormState] = useState({
        name: "",
        size: "",
        garlic: false,
        mushrooms: false,
        tomatoes: false,
        jalapenos: false,
        specialInstr:""
    });

    //create errors
    const [errors, setErrors] = useState({
        name: "",
        size: "",
        garlic: false,
        mushrooms: false,
        tomatoes: false,
        jalapenos: false,
        specialInstr:""
    })

    const [post, setPost] = useState([]);

    //input changes
    const inputChange = e => {
        e.persist();
        const newFormData = {
            ...formState,
            [e.target.name]:
            e.target.type === "checkbox" ? e.target.checked : e.target.value
        };
        validateChange(e);
        setFormState(newFormData);
    }

    //validate changes
    const validateChange = e => {
        yup
            .reach(formSchema, e.target.name)
            .validate(e.target.value)
            .then(valid => {
                setErrors({
                    ...errors,
                [e.target.name]: ""
                });
            })
            .catch(err => {
                setErrors({
                    ...errors,
                    [e.target.name] : err.errors[0]
                });
            });
    }

    //button
    const [buttonDisabled, setButtonDisabled] = useState(false);
    useEffect(() => {
        formSchema.isValid(formState)
        .then(valid => {
            setButtonDisabled(!valid);
        });
    }, [formState]);

    //submit form
    const formSubmit = e => {
        e.preventDefault();
        axios
            .post("https://reqres.in/api/users", formState)
            .then(res => {
                console.log(res);
                setPost(res.data)
                setFormState({
                    name: "",
                    size: "",
                    garlic: false,
                    mushrooms: false,
                    tomatoes: false,
                    jalapenos: false,
                    specialInstr: ""
                });
            })
            .catch(err => console.log(err.response));
    }

    return (
        <form
            onSubmit = {formSubmit} >
            <h2>Build Your Own</h2>
            <label htmlFor = "name">
                Customer's Name:
                <br />
                <input
                    type = "text"
                    name = "name"
                    id = "name"
                    placeholder = "Your name here"
                    value = {formState.name}
                    onChange = {inputChange}
                    />
                    {errors.name.length > 0 ? <p className = "error">{errors.name}</p> : null}
            </label>
            <br />
            <label htmlFor = "size">
                Please select a size:
                <br />
                <select
                    name = "size"
                    id = "size"
                    onChange = {inputChange}
                >
                    <option name = "default" value = {null}></option>
                    <option name = "personal" value = "personal">Personal</option>
                    <option name = "small" value = "small">Small</option>
                    <option name = "medium" value = "medium">Medium</option>
                    <option name = "large" value = "large">Large</option>
                    <option name = "x-large" value = "x-large">X-Large</option>
                    </select>
            </label>

            <h3>Select Toppings</h3>
            <label htmlFor = "garlic">
                <input
                    type = "checkbox"
                    name = "garlic"
                    id = "garlic"
                    checked = {formState.garlic}
                    onChange = {inputChange}
                />
                Roasted Garlic
            </label>
            <br />
            <label htmlFor = "mushrooms">
                <input
                    type = "checkbox"
                    name = "mushrooms"
                    id = "mushrooms"
                    checked = {formState.mushrooms}
                    onChange = {inputChange}
                />
                Mushrooms
            </label>
            <br />
            <label htmlFor = "tomatoes">
                <input
                    type = "checkbox"
                    name = "tomatoes"
                    id = "tomatoes"
                    checked = {formState.tomatoes}
                    onChange = {inputChange}
                />
                Roasted Cherry Tomates
            </label>
            <br />
            <label htmlFor = "jalapenos">
                <input
                    type = "checkbox"
                    name = "jalapenos"
                    id = "jalapenos"
                    checked = {formState.jalapenos}
                    onChange = {inputChange}
                />
                Jalapeño Peppers
            </label>
            <br /> <br />
            <label htmlFor = "Special Instructions">
                Special Instructions:
                <br />
                <textarea
                    name = "specialInstr"
                    id = "specialInstr"
                    placeholder = "Let us know if you have any special requests"
                    value = {formState.specialInstr}
                    onChange = {inputChange}
                />
            </label>
            <br />
            <button name = "submit" disabled = {buttonDisabled}>Add to Cart</button>
            <pre>{JSON.stringify(post, null, 2)}</pre>
        </form>
    )
}

export default OrderForm;