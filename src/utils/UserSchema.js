import * as yup from 'yup';
export const usersSchema = yup.object({
    name:yup.string().required("Name required").min(2,"Minimum 2 chars long").max(8,"Max 8 chars long"),
    username:yup.string().required("User Name required").min(2,"User name Minimum 2 chars long").max(8," Username Max 8 chars long"),
    email:yup.string().email("Enter valid email").required("Email required"),
    password:yup.string().required("Password reuired"),
    checkme:yup.boolean().required('Please check this box').oneOf([true], 'You must accept the terms and conditions.')
})