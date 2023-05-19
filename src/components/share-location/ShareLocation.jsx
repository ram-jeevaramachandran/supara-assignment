import { useState, useContext } from 'react';
import { TextField, Typography, Stack, Button, Box } from '@mui/material';

import AttendanceContext from '../../context/attendanceContext';


const ShareLocation = (props) => {

    const currentStep = {
        step: 1,
        moveTowards: 'Next',
        buttonDisabled: true
    };

    let { Attendance, setAttendance } = useContext(AttendanceContext);

    const [ActiveStep, setActiveStep] = useState(currentStep);
    const [formValues, setFormValues] = useState(Attendance);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: {
                ...formValues[name],
                value
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const formFields = Object.keys(formValues);
        let newFormValues = { ...formValues }

        for (let index = 0; index < formFields.length; index++) {
            const currentField = formFields[index];
            const currentValue = formValues[currentField].value;

            if ((currentField === "name" && currentValue !== '') || (currentField === "age" && currentValue !== '') || (currentField === "likes" && currentValue !== '')) {
                newFormValues = {
                    ...newFormValues,
                    [currentField]: {
                        ...newFormValues[currentField],
                        value: currentValue,
                        errorMessage: ''
                    }
                }

                setActiveStep({
                    ...currentStep,
                    buttonDisabled: false
                })

            }

            else if ((currentField === "name" && currentValue === '') || (currentField === "age" && currentValue === '') || (currentField === "likes" && currentValue === '')) {
                newFormValues = {
                    ...newFormValues,
                    [currentField]: {
                        ...newFormValues[currentField],
                        error: true
                    }
                }

                setActiveStep({
                    ...currentStep,
                    buttonDisabled: true
                })
            }

        }

        setFormValues(newFormValues);

        setAttendance(newFormValues);
    }

    const fnNextStepHandler = () => {
        props.handleClick(ActiveStep);
    }

    return (
        <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit} sx={{ maxWidth: '50%', margin: '30px auto' }}>
             <Typography sx={{ marginBottom: '16px' }}
                variant="h6">
                Please enter your data
            </Typography>
            <Stack spacing={2} direction="column">
                <TextField
                    placeholder="Enter your name"
                    label="Name"
                    name="name"
                    variant="outlined"
                    fullWidth
                    required
                    value={formValues.name.value}
                    onChange={handleChange}
                    error={formValues.name.error}
                    helperText={formValues.name.error && formValues.name.errorMessage}
                />
                <TextField
                    placeholder="Enter your age"
                    label="Age"
                    name="age"
                    variant="outlined"
                    fullWidth
                    required
                    type="number"
                    value={formValues.age.value}
                    onChange={handleChange}
                    error={formValues.age.error}
                    helperText={formValues.age.error && formValues.age.errorMessage}
                />
                <TextField
                    placeholder="Describe the best tech stack you worked with and you like most?"
                    label="Likes"
                    name="likes"
                    variant="outlined"
                    fullWidth
                    required
                    value={formValues.likes.value}
                    multiline
                    rows={4}
                    onChange={handleChange}
                    error={formValues.likes.error}
                    helperText={formValues.likes.error && formValues.likes.errorMessage}
                />
            </Stack>
            <Stack spacing={2} direction="row" sx={{ marginTop: '16px' }}>
                <Button type="submit" variant="outlined" color="primary"> Submit </Button>
                <Button variant="contained" onClick={fnNextStepHandler} disabled={ActiveStep.buttonDisabled}>Next</Button>
                <Button variant="contained" onClick={fnNextStepHandler} >Next</Button>
            </Stack>
        </Box>
    )
}

export default ShareLocation