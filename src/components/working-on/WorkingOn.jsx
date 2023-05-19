import { useState, useContext } from 'react';
import { TextField, Typography, Stack, Button, Box, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';

import AttendanceContext from '../../context/attendanceContext';

const WorkingOn = (props) => {

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

            if ((currentField === "workingOn" && currentValue !== '') || (currentField === "workingOnDate" && currentValue !== '') || (currentField === "workingOnRating" && currentValue !== '')) {
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

            else if ((currentField === "workingOn" && currentValue === '') || (currentField === "workingOnDate" && currentValue === '') || (currentField === "workingOnRating" && currentValue === '')) {
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

    const fnPrevStepHandler = () => {
        props.handleClick({ ...currentStep, moveTowards: "Previous" });
    }

    return (
        <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit} sx={{ maxWidth: '50%', margin: '30px auto' }}>
            <Typography sx={{ marginBottom: '16px' }}
                variant="h6">
                Please enter your Working On
            </Typography>
            <Stack spacing={2} direction="column">
                <TextField
                    name="workingOn"
                    variant="outlined"
                    fullWidth
                    required
                    type="date"
                    value={formValues.workingOn.value}
                    onChange={handleChange}
                    error={formValues.workingOn.error}
                    helperText={formValues.workingOn.error && formValues.workingOn.errorMessage}
                />
                <TextField
                    name="workingOnDate"
                    variant="outlined"
                    fullWidth
                    required
                    type="date"
                    value={formValues.workingOnDate.value}
                    onChange={handleChange}
                    error={formValues.workingOnDate.error}
                    helperText={formValues.workingOnDate.error && formValues.workingOnDate.errorMessage}
                />
                <TextField
                    placeholder="know about the Rating"
                    label="Rating"
                    name="workingOnRating"
                    variant="outlined"
                    fullWidth
                    required
                    value={formValues.workingOnRating.value}
                    rows={4}
                    onChange={handleChange}
                    error={formValues.workingOnRating.error}
                    helperText={formValues.workingOnRating.error && formValues.workingOnRating.errorMessage}
                />
                <FormControl>
                    <FormLabel>Rating Experience</FormLabel>
                    <RadioGroup name="ratingExperience" value={formValues.ratingExperience.value} onChange={handleChange} >
                        <FormControlLabel value="good" control={<Radio />} label="Good" />
                        <FormControlLabel value="bad" control={<Radio />} label="Bad" />
                        <FormControlLabel value="none" control={<Radio />} label="none" />
                    </RadioGroup>
                </FormControl>
            </Stack>
            <Stack spacing={2} direction="row" sx={{ marginTop: '16px' }}>
                <Button variant="contained" onClick={fnPrevStepHandler}>Previous</Button>
                <Button type="submit" variant="outlined" color="primary"> Submit </Button>
                <Button variant="contained" onClick={fnNextStepHandler} disabled={ActiveStep.buttonDisabled}>Next</Button>
                <Button variant="contained" onClick={fnNextStepHandler} >Next</Button>
            </Stack>
        </Box>
    )
}

export default WorkingOn