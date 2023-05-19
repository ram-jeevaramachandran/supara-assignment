import React, { useContext, useState } from 'react';
import { TextField, Typography, Stack, Button, Box, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';

import AttendanceContext from '../../context/attendanceContext';

const ClockOut = (props) => {

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

            if ((currentField === "email" && currentValue !== '') || (currentField === "phone" && currentValue !== '') || (currentField === "address" && currentValue !== '')) {
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

                alert("Form values consoled✨");
                console.log(newFormValues.address);
            }

            else if ((currentField === "email" && currentValue === '') || (currentField === "phone" && currentValue === '') || (currentField === "address" && currentValue === '')) {
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


    const fnPrevStepHandler = () => {
        props.handleClick({ ...currentStep, moveTowards: "Previous" });
    }

    return (
        <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit} sx={{ maxWidth: '50%', margin: '30px auto' }}>
            <Typography sx={{ marginBottom: '16px' }}
                variant="h6">
                Please enter your Clock Out
            </Typography>
            <Stack spacing={2} direction="column">
                <TextField
                    name="email"
                    label="email"
                    variant="outlined"
                    fullWidth
                    required
                    type="email"
                    value={formValues.email.value}
                    onChange={handleChange}
                    error={formValues.email.error}
                    helperText={formValues.email.error && formValues.email.errorMessage}
                />
                <TextField
                    name="phone"
                    label="phone"
                    variant="outlined"
                    fullWidth
                    required
                    type="phone"
                    value={formValues.phone.value}
                    onChange={handleChange}
                    error={formValues.phone.error}
                    helperText={formValues.phone.error && formValues.phone.errorMessage}
                />
                <TextField
                    placeholder="know about the Rating"
                    label="address"
                    name="address"
                    variant="outlined"
                    fullWidth
                    required
                    value={formValues.address.value}
                    multiple
                    onChange={handleChange}
                    error={formValues.address.error}
                    helperText={formValues.address.error && formValues.address.errorMessage}
                />
            </Stack>
            <Stack spacing={2} direction="row" sx={{ marginTop: '16px' }}>
                <Button variant="contained" onClick={fnPrevStepHandler}>Previous</Button>
                <Button type="submit" variant="outlined" color="primary"> Submit </Button>
                {/* <Button variant="contained" onClick={fnPrevStepHandler} disabled={ActiveStep.buttonDisabled}>Next</Button> */}
            </Stack>
        </Box>
    )
}

export default ClockOut