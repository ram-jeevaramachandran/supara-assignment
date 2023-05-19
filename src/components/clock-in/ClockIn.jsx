import { useState, useContext } from 'react';
import { TextField, Typography, Stack, Button, Box } from '@mui/material';

import AttendanceContext from '../../context/attendanceContext';

const ClockIn = (props) => {

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

            if ((currentField === "branchCode" && currentValue !== '') || (currentField === "clockIn" && currentValue !== '') || (currentField === "productType" && currentValue !== '') || (currentField !== "salesType" && currentValue !== '')) {
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

            else if ((currentField === "branchCode" && currentValue === '') || (currentField === "clockIn" && currentValue === '') || (currentField === "productType" && currentValue === '') || (currentField === "salesType" && currentValue === '')) {
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
                Please enter your Clock In
            </Typography>
            <Stack spacing={2} direction="column">
                <TextField
                    placeholder="Enter your Branch Code"
                    label="Branch Code"
                    name="branchCode"
                    variant="outlined"
                    fullWidth
                    required
                    type="number"
                    value={formValues.branchCode.value}
                    onChange={handleChange}
                    error={formValues.branchCode.error}
                    helperText={formValues.branchCode.error && formValues.branchCode.errorMessage}
                />
                <TextField
                    placeholder="Clock in time"
                    name="clockIn"
                    variant="outlined"
                    type='time'
                    fullWidth
                    required
                    value={formValues.clockIn.value}
                    onChange={handleChange}
                    error={formValues.clockIn.error}
                    helperText={formValues.clockIn.error && formValues.clockIn.errorMessage}
                />
                <TextField
                    placeholder="Describe about the product type"
                    label="Product Type"
                    name="productType"
                    variant="outlined"
                    fullWidth
                    required
                    value={formValues.productType.value}
                    multiline
                    rows={4}
                    onChange={handleChange}
                    error={formValues.productType.error}
                    helperText={formValues.productType.error && formValues.likes.errorMessage}
                />
                <TextField
                    placeholder="Enter your Sales"
                    label="Sales Type"
                    name="salesType"
                    variant="outlined"
                    fullWidth
                    required
                    value={formValues.salesType.value}
                    onChange={handleChange}
                    error={formValues.salesType.error}
                    helperText={formValues.salesType.error && formValues.salesType.errorMessage}
                />
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

export default ClockIn